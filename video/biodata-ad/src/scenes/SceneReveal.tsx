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
 * Scene 3 — Reveal (3.5–5.0s · 45 frames)
 * A gold-edged maroon panel sweeps away to ivory; "5 minutes" lands
 * with a spring and a shimmer.
 */
export const SceneReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // sweeping panel
  const sweep = interpolate(frame, [0, 18], ["0%", "100%"], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.7, 0, 0.2, 1),
  });

  const numSpring = spring({
    frame: frame - 14,
    fps,
    config: { damping: 11, mass: 0.8 },
  });

  const shimmerX = interpolate(frame, [14, 40], ["-30%", "130%"], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.5, 0, 0.5, 1),
  });

  const subIn = interpolate(frame, [26, 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(...EASE_OUT),
  });

  return (
    <AbsoluteFill style={{ background: C.cream }}>
      {/* ivory texture wash */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 35%, rgba(255,255,255,0.9), rgba(243,237,230,0.4) 70%)",
        }}
      />

      {/* sweeping maroon panel with gold edge */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          translate: `${sweep} 0`,
          background: `linear-gradient(180deg, ${C.maroonDeep}, ${C.maroon})`,
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -2,
            top: 0,
            bottom: 0,
            width: 10,
            background: `linear-gradient(180deg, ${C.goldSoft}, ${C.gold})`,
          }}
        />
      </div>

      {/* headline */}
      <div
        style={{
          position: "absolute",
          top: 640,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: fontSans,
            fontWeight: 700,
            fontSize: 54,
            color: C.ink,
            opacity: interpolate(frame, [4, 14], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          What if it took
        </div>
        <div
          style={{
            position: "relative",
            display: "inline-block",
            marginTop: 8,
            scale: String(numSpring),
            opacity: numSpring,
          }}
        >
          <span
            style={{
              fontFamily: fontSerif,
              fontWeight: 700,
              fontSize: 300,
              lineHeight: 1.05,
              background: `linear-gradient(120deg, ${C.maroon}, ${C.goldDeep} 60%, ${C.gold})`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            5 minutes
          </span>
          {/* shimmer sweep */}
          <div
            style={{
              position: "absolute",
              top: -20,
              bottom: -20,
              left: 0,
              width: 160,
              background:
                "linear-gradient(100deg, transparent, rgba(255,255,255,0.85), transparent)",
              translate: `${shimmerX} 0`,
              rotate: "8deg",
              opacity: 0.9,
              mixBlendMode: "screen",
            }}
          />
        </div>
        <div
          style={{
            fontFamily: fontSans,
            fontWeight: 700,
            fontSize: 48,
            color: C.maroon,
            opacity: subIn,
            letterSpacing: 1,
          }}
        >
          from open to print-ready PDF
        </div>
      </div>
    </AbsoluteFill>
  );
};
