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
import { BioSheet } from "../components/BioSheet";

/**
 * Scene 1 — Hook (0.0–2.0s · 60 frames)
 * A finished bio-data sheet crash-lands onto the screen with a gold
 * swoosh, skew-corrects, gets "pinned". Caption: "Still making your
 * bio-data in hours?"
 */
export const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // crash landing
  const drop = spring({
    frame,
    fps,
    config: { damping: 9, mass: 0.9 },
  });
  const rotate = interpolate(drop, [0, 1], [-9, -3]);
  const sheetY = interpolate(drop, [0, 1], [-900, 0]);
  const sheetOpacity = interpolate(frame, [0, 5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // gold swoosh streak behind the sheet
  const swooshW = interpolate(frame, [2, 16], [0, 1400], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const swooshO = interpolate(frame, [14, 26], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // impact flash
  const flash = interpolate(frame, [8, 10, 22], [0, 0.5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // pin dot
  const pinPop = spring({ frame: frame - 14, fps, config: { damping: 10 } });

  const captionIn = interpolate(frame, [24, 34], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(...EASE_OUT),
  });
  const captionRise = interpolate(frame, [24, 36], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(...EASE_OUT),
  });

  return (
    <AbsoluteFill style={{ background: C.maroonDeep }}>
      {/* subtle radial glow */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(201,161,74,0.22), transparent 62%)",
        }}
      />

      {/* swoosh */}
      <div
        style={{
          position: "absolute",
          top: 560,
          left: -200,
          width: swooshW,
          height: 16,
          borderRadius: 8,
          background: `linear-gradient(90deg, transparent, ${C.goldSoft})`,
          opacity: swooshO,
          rotate: "-3deg",
        }}
      />

      {/* sheet */}
      <div
        style={{
          position: "absolute",
          top: 320,
          left: 80,
          opacity: sheetOpacity,
          translate: `0 ${sheetY}px`,
          rotate: `${rotate}deg`,
        }}
      >
        <BioSheet width={640} />
      </div>

      {/* pin */}
      <div
        style={{
          position: "absolute",
          top: 336,
          left: 408,
          opacity: pinPop,
          scale: String(pinPop),
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            background: C.gold,
            border: `6px solid ${C.goldSoft}`,
            boxShadow: "0 10px 24px rgba(0,0,0,0.4)",
          }}
        />
      </div>

      {/* flash */}
      <AbsoluteFill style={{ background: C.goldSoft, opacity: flash }} />

      {/* caption */}
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: 1590,
          textAlign: "center",
          opacity: captionIn,
          translate: `0 ${captionRise}px`,
        }}
      >
        <span
          style={{
            display: "inline-block",
            fontFamily: fontSans,
            fontWeight: 800,
            fontSize: 62,
            lineHeight: 1.2,
            color: C.cream,
            background: "rgba(54,40,35,0.85)",
            padding: "20px 36px",
            borderRadius: 26,
          }}
        >
          Still making your bio-data{" "}
          <span style={{ color: C.goldSoft }}>in hours?</span>
        </span>
      </div>
    </AbsoluteFill>
  );
};
