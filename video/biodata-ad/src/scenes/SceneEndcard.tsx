import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, EASE_OUT, CTA_URL, fontSans, fontSerif } from "../theme";
import { CornerOrnament } from "../components/Chrome";

/**
 * Scene 8 — Endcard (26.5–30.0s · 105 frames)
 * Deep maroon, gold ornaments, wordmark, "100% Free" chip, and both
 * CTAs: visit link + share pill.
 */
export const SceneEndcard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const markIn = spring({ frame, fps, config: { damping: 13 } });
  const chipIn = spring({ frame: frame - 12, fps, config: { damping: 12 } });
  const ctaIn = spring({ frame: frame - 22, fps, config: { damping: 11 } });
  const shareIn = spring({ frame: frame - 34, fps, config: { damping: 11 } });
  const subIn = interpolate(frame, [30, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(...EASE_OUT),
  });

  const pulse = Math.sin(frame / 7) * 0.5 + 0.5;

  return (
    <AbsoluteFill style={{ background: C.maroonDeep }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 32%, rgba(139,23,39,0.6), transparent 62%)",
        }}
      />

      {/* corner ornaments */}
      <CornerOrnament corner="tl" size={320} opacity={0.55} />
      <CornerOrnament corner="br" size={320} opacity={0.55} />

      <div
        style={{
          position: "absolute",
          top: 430,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ scale: String(markIn), opacity: markIn }}>
          <Img
            src={staticFile("sm-wordmark-cream.png")}
            style={{ height: 130, width: "auto" }}
          />
        </div>

        {/* free chip */}
        <div
          style={{
            marginTop: 44,
            scale: String(chipIn),
            opacity: Math.max(0, chipIn),
          }}
        >
          <span
            style={{
              fontFamily: fontSans,
              fontWeight: 800,
              fontSize: 34,
              color: C.maroonDeep,
              background: `linear-gradient(120deg, ${C.goldSoft}, ${C.gold})`,
              padding: "14px 34px",
              borderRadius: 999,
              boxShadow: "0 12px 34px rgba(201,161,74,0.4)",
              display: "inline-block",
            }}
          >
            100% Free · No sign-up needed
          </span>
        </div>

        {/* primary CTA */}
        <div
          style={{
            marginTop: 56,
            scale: String(ctaIn),
            opacity: Math.max(0, ctaIn),
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              background: C.paper,
              borderRadius: 999,
              padding: "26px 46px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
              border: `3px solid ${C.gold}`,
            }}
          >
            <span
              style={{
                fontFamily: fontSans,
                fontWeight: 800,
                fontSize: 44,
                color: C.maroon,
              }}
            >
              Create yours free
            </span>
            <span style={{ fontSize: 44, color: C.gold, translate: `0 ${pulse * 4}px` }}>
              ↓
            </span>
          </div>
        </div>

        {/* URL */}
        <div
          style={{
            marginTop: 30,
            fontFamily: fontSans,
            fontWeight: 700,
            fontSize: 42,
            color: C.goldSoft,
            letterSpacing: 1,
            opacity: subIn,
          }}
        >
          {CTA_URL}
        </div>

        {/* share CTA */}
        <div
          style={{
            marginTop: 26,
            scale: String(shareIn),
            opacity: Math.max(0, shareIn),
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              border: "2px solid rgba(230,201,143,0.6)",
              borderRadius: 999,
              padding: "16px 34px",
              fontFamily: fontSans,
              fontWeight: 700,
              fontSize: 30,
              color: C.cream,
            }}
          >
            <span>💌</span>
            Share with family — bio-data attached
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
