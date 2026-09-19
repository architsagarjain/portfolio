/* Pixel probe: verifies rendered frames contain expected colors, and
   no band is left entirely background (i.e., content actually rendered
   where it should). Usage: bun probe.ts <frame.png> <json-checks>
   checks: [{x,y,expect:'maroon'|'gold'|'cream'|'white'|'dark'|'ink'|'green'}] */
const fs = require("fs");
const { PNG } = require("pngjs");

const [file, checksJson] = process.argv.slice(2);
const checks = JSON.parse(fs.readFileSync(checksJson, "utf8"));
const png = PNG.sync.read(fs.readFileSync(file));

const named = {
  maroon: [139, 23, 39],
  maroonDeep: [74, 11, 19],
  gold: [201, 161, 74],
  goldSoft: [230, 201, 143],
  cream: [243, 237, 230],
  white: [255, 255, 255],
  ink: [54, 40, 35],
  green: [46, 125, 50],
  paper: [255, 253, 248],
};

const px = (x, y) => {
  const idx = (png.width * y + x) << 2;
  return [png.data[idx], png.data[idx + 1], png.data[idx + 2]];
};

const dist = (a, b) =>
  Math.sqrt(a.reduce((s, v, i) => s + (v - b[i]) ** 2, 0));

let failures = 0;
for (const c of checks.points ?? []) {
  const [r, g, b] = px(c.x, c.y);
  if (c.expect === "any") continue;
  if (c.not) {
    const [nr, ng, nb] = named[c.not];
    if (dist([r, g, b], [nr, ng, nb]) < 60) {
      failures++;
      console.log(
        `FAIL ${file} (${c.x},${c.y}) expected NOT ${c.not}, got rgb(${r},${g},${b})`,
      );
    }
    continue;
  }
  const target = named[c.expect];
  const d = dist([r, g, b], target);
  if (d > 90) {
    failures++;
    console.log(
      `FAIL ${file} (${c.x},${c.y}) expected ${c.expect}, got rgb(${r},${g},${b}) (d=${Math.round(d)})`,
    );
  }
}

/* band check: region must not be uniform (content present) */
if (checks.band) {
  const { x0, y0, x1, y1 } = checks.band;
  const samples = [];
  for (let y = y0; y < y1; y += 8) {
    for (let x = x0; x < x1; x += 8) {
      if (x < png.width && y < png.height) samples.push(px(x, y));
    }
  }
  if (samples.length < 10) {
    failures++;
    console.log(`FAIL ${file} band ${JSON.stringify(checks.band)} has too few in-bounds samples`);
    process.exit(1);
  }
  const avg = samples[0];
  const spread = Math.max(...samples.map((s) => dist(s, avg)));
  if (spread < 30) {
    failures++;
    console.log(`FAIL ${file} band ${JSON.stringify(checks.band)} is uniform (spread=${Math.round(spread)}) — no content?`);
  } else {
    console.log(`band ok (spread ${Math.round(spread)})`);
  }
}

/* count check: a named color must appear at least `min` times in a region */
if (checks.count) {
  for (const c of checks.count) {
    const t = named[c.expect];
    let n = 0;
    for (let y = c.y0; y < c.y1; y += 2) {
      for (let x = c.x0; x < c.x1; x += 2) {
        if (x >= png.width || y >= png.height) continue;
        const [r, g, b] = px(x, y);
        if (dist([r, g, b], t) < (c.tol ?? 90)) n++;
      }
    }
    if (n < (c.min ?? 10)) {
      failures++;
      console.log(
        `FAIL ${file} count ${c.expect} in [${c.x0},${c.y0},${c.x1},${c.y1}] = ${n} < ${c.min}`,
      );
    } else {
      console.log(`count ok: ${c.expect} ×${n}`);
    }
  }
}

console.log(failures === 0 ? "PROBE PASS" : `PROBE FAIL (${failures})`);
process.exit(failures === 0 ? 0 : 1);
