# Shaadi Mangalam — Bio-data Generator Launch Ad

A 30-second vertical (9:16) Meta/Reels ad for the Bio-data Generator,
built with [Remotion](https://remotion.dev). All UI copy, template names,
persona data, colors and fonts are pulled from the live product
(shaadimangalam.com/bio-data) — nothing is invented.

## Deliverable

| Spec | Value |
|------|-------|
| File | `out/biodata-ad-9x16.mp4` |
| Resolution | 1080×1920 (9:16 Reels/Stories) |
| Duration | exactly 30.000s @ 30fps (900 frames) |
| Codec | H.264, yuv420p, CRF 18, faststart |
| Audio | none — add a track from **Meta Sound Collection** when publishing (keeps the ad license-safe) |

## Timeline

| Beat | Time | Scene |
|------|------|-------|
| Hook | 0–2.5s | Bio-data sheet crash-lands, "Still making your bio-data in hours?" |
| Before | 2.5–4.5s | `3h 47m` counter + pain chips |
| Reveal | 4.5–6.5s | Gold sweep → "5 minutes" |
| AI fill | 6.5–11s | Photo upload → AI extracts → fields fill themselves |
| Templates | 11–14.5s | 12 designer templates cascade in |
| Speed run | 14.5–24.5s | Full 4-step flow at speed with elapsed timer (money shot) |
| Output | 24.5–27.5s | Print-ready A4 + HD PDF + private share link |
| Endcard | 27.5–30s | Wordmark, "100% Free", Create yours free → shaadimangalam.com/bio-data |

All captions are burned in (85%+ of feed views are muted).

## Commands

```bash
bun install                # deps
bun run dev                # Remotion Studio preview (http://localhost:3000)
bun run render             # full render (single-threaded: safe on 1-CPU sandboxes)
bun run render:sequence && bun run stitch   # two-step pipeline for memory-constrained machines
```

On the 1-CPU sandbox, `remotion render` can be OOM-killed during the
x264 stitch (bundled FFmpeg spawns one thread per host thread). The
`render:sequence` + `stitch` pair avoids that: frames render one tab at
a time, then FFmpeg stitches with `-threads 2`.

## Files

- `src/BiodataAd.tsx` — timeline orchestration (TransitionSeries)
- `src/scenes/` — one file per beat + three scenes from an earlier draft (`HookScene`, `IntroScene`, `AiExtractScene`)
- `src/components/` — phone frame, progress bar, captions, bio-data sheet mockup
- `src/theme.ts` — brand tokens sampled from the live site + legacy aliases
- `public/` — real brand assets downloaded from staging.shaadimangalam.com
- `scripts/probe.ts` — pixel-probe QA used to verify rendered frames
