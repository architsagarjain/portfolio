import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, EASE_OUT, fontSans, fontSerif, SAMPLE_BIO } from "../theme";
import { Caption, Phone, ProgressBar, StatusBar } from "../components/Chrome";
import { BioSheet } from "../components/BioSheet";

/* ------------------------------- tap ripple ------------------------------- */

const TapRipple: React.FC<{ at: number; x: number; y: number }> = ({
  at,
  x,
  y,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [at, at + 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.8, 0.3, 1),
  });
  if (p >= 1 || p <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 90,
        height: 90,
        borderRadius: 45,
        border: `4px solid ${C.maroon}`,
        opacity: 0.5 * (1 - p),
        scale: String(0.4 + p),
        translate: "-50% -50%",
      }}
    />
  );
};

/* --------------------------------- scene ---------------------------------- */

/**
 * Scene 6 — Speed run (13.0–23.0s · 300 frames) — the money shot.
 * Full-screen phone runs the real 4-step flow at speed with a timer
 * counting elapsed seconds and checkmarks landing per completed step.
 */
export const SceneSpeedRun: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const T = {
    design: 0,
    fill: 55,
    preview: 165,
    download: 245,
  };

  const phoneIn = spring({ frame, fps, config: { damping: 15 } });

  /* --- step 1: design picker --- */
  const designSelected = frame > 34;
  const designs = [
    { name: "Traditional", bg: "#FBF4E4", accent: "#8B1727" },
    { name: "Royal", bg: "#4A0B13", accent: "#C9A14A" },
    { name: "Modern", bg: "#FFFFFF", accent: "#362823" },
  ];

  /* --- step 2: fields --- */
  const FIELDS: [string, string][] = [
    ["Name", SAMPLE_BIO.name],
    ["Qualification", SAMPLE_BIO.qualification],
    ["Occupation", SAMPLE_BIO.occupation],
    ["Native Place", SAMPLE_BIO.native],
    ["Father's Name", SAMPLE_BIO.father],
  ];

  /* --- step 3 preview --- */
  const previewIn = interpolate(
    frame,
    [T.preview, T.preview + 12],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(...EASE_OUT),
    },
  );

  /* --- step 4 download --- */
  const dlPop = spring({
    frame: frame - T.download,
    fps,
    config: { damping: 11 },
  });

  // elapsed timer: 0:00 -> 0:57 across the scene
  const elapsed = Math.min(57, Math.floor(frame / 5));
  const timerPop = spring({ frame: frame - 6, fps, config: { damping: 12 } });

  const stepIndex =
    frame < T.fill
      ? 1
      : frame < T.preview
        ? 2
        : frame < T.download
          ? 3
          : 4;

  const progress = interpolate(frame, [0, 300], [0.25, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.3, 0.8, 0.4, 1),
  });

  const capIn = (start: number) =>
    interpolate(frame, [start, start + 8], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(...EASE_OUT),
    });
  const capOut = (end: number) =>
    interpolate(frame, [end - 8, end], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  const captions: { text: string; in: number; out: number }[] = [
    { text: "1 · Choose a design", in: 8, out: 52 },
    { text: "2 · Fill your details", in: 60, out: 162 },
    { text: "3 · Live preview", in: 170, out: 242 },
    { text: "4 · Download PDF", in: 250, out: 314 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${C.maroonDeep} 0%, ${C.maroon} 55%, ${C.maroonDark} 100%)`,
      }}
    >
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 25%, rgba(201,161,74,0.14), transparent 60%)",
        }}
      />

      {/* timer */}
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "baseline",
          gap: 16,
          fontFamily: fontSerif,
          fontWeight: 700,
          fontSize: 88,
          color: C.goldSoft,
          opacity: timerPop,
        }}
      >
        <span style={{ fontSize: 48 }}>⏱</span>
        <span>0:{String(elapsed).padStart(2, "0")}</span>
      </div>

      {/* step checkmarks */}
      <div
        style={{
          position: "absolute",
          top: 290,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 26,
        }}
      >
        {["Design", "Details", "Preview", "PDF"].map((s, i) => {
          const done = stepIndex > i + 1;
          const active = stepIndex === i + 1;
          const pop = spring({
            frame: frame - (T.design + i * 55),
            fps,
            config: { damping: 12 },
          });
          return (
            <div
              key={s}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontFamily: fontSans,
                fontWeight: 800,
                fontSize: 30,
                color: done
                  ? "#7CE38B"
                  : active
                    ? C.goldSoft
                    : "rgba(243,237,230,0.45)",
              }}
            >
              <span
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: done
                    ? "#2E7D32"
                    : active
                      ? C.gold
                      : "rgba(255,255,255,0.12)",
                  color: done || active ? "#fff" : "rgba(243,237,230,0.6)",
                  fontSize: 26,
                  scale: String(done ? Math.max(0, pop) : 1),
                }}
              >
                {done ? "✓" : i + 1}
              </span>
              {s}
            </div>
          );
        })}
      </div>

      {/* phone */}
      <Phone scale={1.02 * phoneIn} y={40 * phoneIn} opacity={phoneIn}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "#FFFDF8",
              fontFamily: fontSans,
            }}
          >
            <StatusBar />
            <ProgressBar progress={progress} step={stepIndex} />

            {/* ---- STEP 1: design picker ---- */}
            {frame < T.fill && (
              <div style={{ position: "relative", padding: "10px 26px" }}>
                <div
                  style={{
                    fontFamily: fontSerif,
                    fontWeight: 700,
                    fontSize: 36,
                    color: C.maroon,
                    marginBottom: 18,
                  }}
                >
                  Choose a design
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                  {designs.map((d) => {
                    const isSel = designSelected && d.name === "Royal";
                    return (
                      <div
                        key={d.name}
                        style={{
                          width: 160,
                          height: 226,
                          borderRadius: 14,
                          background: d.bg,
                          border: isSel
                            ? `5px solid ${C.gold}`
                            : `2px solid ${d.accent}55`,
                          boxShadow: isSel
                            ? "0 14px 34px rgba(139,23,39,0.35)"
                            : "0 8px 20px rgba(54,40,35,0.15)",
                          padding: 12,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          scale: String(isSel ? 1.06 : 1),
                        }}
                      >
                        <div
                          style={{
                            width: "60%",
                            height: 4,
                            borderRadius: 2,
                            background: d.accent,
                          }}
                        />
                        <div
                          style={{
                            fontFamily: fontSerif,
                            fontWeight: 700,
                            fontSize: 21,
                            color: d.accent,
                            marginTop: 10,
                          }}
                        >
                          Priya Sharma
                        </div>
                        {[0, 1, 2].map((r) => (
                          <div
                            key={r}
                            style={{
                              width: "86%",
                              height: 7,
                              borderRadius: 4,
                              marginTop: 8,
                              background:
                                r % 2 === 0
                                  ? `${d.accent}26`
                                  : "rgba(54,40,35,0.1)",
                            }}
                          />
                        ))}
                        <div style={{ flex: 1 }} />
                        <div
                          style={{
                            fontFamily: fontSans,
                            fontSize: 13,
                            fontWeight: 800,
                            color: d.accent,
                            letterSpacing: 1,
                          }}
                        >
                          {d.name.toUpperCase()}
                        </div>
                      </div>
                    );
                  })}
                  {/* 4th tile: +9 more */}
                  <div
                    style={{
                      width: 160,
                      height: 226,
                      borderRadius: 14,
                      background: "rgba(139,23,39,0.08)",
                      border: "2px dashed rgba(139,23,39,0.35)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      fontFamily: fontSans,
                      color: C.maroon,
                      gap: 4,
                    }}
                  >
                    <div style={{ fontSize: 40, fontWeight: 800 }}>+9</div>
                    <div style={{ fontSize: 15, fontWeight: 700, opacity: 0.7 }}>
                      more designs
                    </div>
                  </div>
                </div>
                <TapRipple at={30} x={520} y={560} />
              </div>
            )}

            {/* ---- STEP 2: details form ---- */}
            {frame >= T.fill && frame < T.preview && (
              <div style={{ position: "relative", padding: "10px 26px" }}>
                <div
                  style={{
                    fontFamily: fontSerif,
                    fontWeight: 700,
                    fontSize: 36,
                    color: C.maroon,
                    marginBottom: 14,
                  }}
                >
                  Your details
                </div>
                {FIELDS.map(([label, value], i) => {
                  const t = T.fill + 8 + i * 18;
                  const op = interpolate(frame, [t, t + 6], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  });
                  return (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "16px 20px",
                        marginBottom: 10,
                        borderRadius: 14,
                        background: "#fff",
                        border: "1.5px solid rgba(54,40,35,0.1)",
                        opacity: op,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 21,
                          fontWeight: 600,
                          color: "rgba(54,40,35,0.5)",
                        }}
                      >
                        {label}
                      </span>
                      <span
                        style={{
                          fontSize: 22,
                          fontWeight: 700,
                          color: C.ink,
                        }}
                      >
                        {op > 0.9 ? value : ""}
                      </span>
                    </div>
                  );
                })}
                <TapRipple at={70} x={420} y={480} />
              </div>
            )}

            {/* ---- STEP 3: preview ---- */}
            {frame >= T.preview && frame < T.download && (
              <div
                style={{
                  padding: "6px 26px",
                  opacity: previewIn,
                  scale: String(0.96 + previewIn * 0.04),
                }}
              >
                <div
                  style={{
                    fontFamily: fontSerif,
                    fontWeight: 700,
                    fontSize: 34,
                    color: C.maroon,
                    marginBottom: 10,
                  }}
                >
                  Live preview
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div style={{ scale: "0.92" }}>
                    <BioSheet width={470} />
                  </div>
                </div>
              </div>
            )}

            {/* ---- STEP 4: download ---- */}
            {frame >= T.download && (
              <div
                style={{
                  padding: "30px 26px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: fontSerif,
                    fontWeight: 700,
                    fontSize: 38,
                    color: C.maroon,
                  }}
                >
                  Print-ready PDF
                </div>
                <div
                  style={{
                    marginTop: 24,
                    width: 340,
                    height: 340,
                    borderRadius: 24,
                    background: C.creamWarm,
                    border: `2.5px solid ${C.gold}`,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 12,
                    scale: String(0.7 + Math.max(0, dlPop) * 0.3),
                    boxShadow: "0 24px 60px rgba(139,23,39,0.25)",
                  }}
                >
                  <span style={{ fontSize: 90 }}>📄</span>
                  <span
                    style={{
                      fontFamily: fontSans,
                      fontWeight: 800,
                      fontSize: 26,
                      color: C.maroon,
                    }}
                  >
                    Priya-Sharma-BioData.pdf
                  </span>
                  <span
                    style={{
                      fontFamily: fontSans,
                      fontSize: 20,
                      fontWeight: 600,
                      color: "#2E7D32",
                    }}
                  >
                    ✓ HD print-ready
                  </span>
                </div>
              </div>
            )}
          </div>
      </Phone>

      {/* captions */}
      {captions.map((c) =>
        frame >= c.in && frame < c.out ? (
          <Caption
            key={c.in}
            text={c.text}
            y={1750}
            size={54}
            opacityOverride={Math.min(capIn(c.in), capOut(c.out))}
          />
        ) : null,
      )}
    </AbsoluteFill>
  );
};
