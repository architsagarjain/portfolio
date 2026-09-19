import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, EASE_OUT, fontSans, fontSerif } from "../theme";

/**
 * Scene 2 — Before (2.0–3.5s · 45 frames)
 * A counter racks up minutes into hours while pain chips stack up.
 */
export const SceneBefore: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // total minutes 0 -> 227 (3h47m) across the scene
  const minutes = Math.round(
    interpolate(frame, [2, 30], [12, 227], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.3, 0.9, 0.4, 1),
    }),
  );
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  const pains = [
    "typing into Word",
    "fixing alignment",
    "chasing relatives for details",
  ];

  const shake =
    frame > 28
      ? Math.sin(frame * 1.9) * interpolate(frame, [28, 34, 45], [0, 5, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  return (
    <AbsoluteFill style={{ background: C.maroonDeep }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(139,23,39,0.55), transparent 65%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 520,
          left: 0,
          right: 0,
          textAlign: "center",
          translate: `${shake}px 0`,
        }}
      >
        <div
          style={{
            fontFamily: fontSerif,
            fontWeight: 700,
            fontSize: 96,
            color: C.goldSoft,
            letterSpacing: 2,
            opacity: interpolate(frame, [0, 8], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          THIS YEAR'S AVERAGE
        </div>
        <div
          style={{
            fontFamily: fontSerif,
            fontWeight: 700,
            fontSize: 260,
            lineHeight: 1,
            color: C.cream,
            marginTop: 16,
            textShadow: "0 18px 60px rgba(0,0,0,0.45)",
          }}
        >
          {h}h {String(m).padStart(2, "0")}m
        </div>
        <div
          style={{
            fontFamily: fontSans,
            fontWeight: 700,
            fontSize: 44,
            color: "rgba(243,237,230,0.75)",
            marginTop: 14,
            letterSpacing: 6,
          }}
        >
          PER BIO-DATA
        </div>
      </div>

      {/* pain chips */}
      <div
        style={{
          position: "absolute",
          top: 1080,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 22,
        }}
      >
        {pains.map((p, i) => {
          const pop = spring({
            frame: frame - (10 + i * 8),
            fps,
            config: { damping: 12 },
          });
          return (
            <div
              key={p}
              style={{
                opacity: Math.max(0, pop),
                scale: String(0.8 + pop * 0.2),
                fontFamily: fontSans,
                fontWeight: 700,
                fontSize: 40,
                color: C.cream,
                background: "rgba(139,23,39,0.6)",
                border: "1.5px solid rgba(230,201,143,0.4)",
                padding: "16px 34px",
                borderRadius: 999,
              }}
            >
              ✕&nbsp; {p}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
