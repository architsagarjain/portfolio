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
import { C, EASE_OUT, fontSans, fontSerif } from "../theme";
import { Caption } from "../components/Chrome";
import { BioSheet } from "../components/BioSheet";

/**
 * Scene 7 — Output (23.0–26.5s · 105 frames)
 * The finished A4 bio-data rises; PDF badge + private share link chip.
 */
export const SceneOutput: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sheetRise = spring({ frame, fps, config: { damping: 14, mass: 0.9 } });
  const pdfPop = spring({ frame: frame - 24, fps, config: { damping: 11 } });
  const sharePop = spring({ frame: frame - 38, fps, config: { damping: 11 } });

  const glow = interpolate(frame, [0, 30], [0.2, 0.55], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(...EASE_OUT),
  });

  return (
    <AbsoluteFill
      style={{ background: `linear-gradient(180deg, ${C.maroonDeep}, ${C.maroon})` }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 40%, rgba(201,161,74,${glow}), transparent 62%)`,
        }}
      />

      {/* corner ornaments */}
      <Img
        src={staticFile("corner-ornament-floral.png")}
        style={{
          position: "absolute",
          top: 90,
          left: 70,
          width: 300,
          height: "auto",
          opacity: 0.5,
        }}
      />
      <Img
        src={staticFile("corner-ornament-floral.png")}
        style={{
          position: "absolute",
          bottom: 90,
          right: 70,
          width: 300,
          height: "auto",
          opacity: 0.5,
          scale: "-1 -1",
        }}
      />

      {/* A4 sheet */}
      <div
        style={{
          position: "absolute",
          top: 250,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          translate: `0 ${(1 - sheetRise) * 500}px`,
          opacity: Math.max(0, sheetRise),
          rotate: `${(1 - sheetRise) * -4}deg`,
        }}
      >
        <BioSheet width={620} />
      </div>

      {/* PDF badge */}
      {pdfPop > 0 && (
        <div
          style={{
            position: "absolute",
            top: 1150,
            right: 130,
            scale: String(pdfPop),
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: C.paper,
              borderRadius: 20,
              padding: "16px 26px",
              boxShadow: "0 18px 44px rgba(0,0,0,0.35)",
              border: `2px solid ${C.gold}`,
            }}
          >
            <span style={{ fontSize: 40 }}>📄</span>
            <span
              style={{
                fontFamily: fontSans,
                fontWeight: 800,
                fontSize: 28,
                color: C.maroon,
              }}
            >
              HD PDF · Print-ready
            </span>
          </div>
        </div>
      )}

      {/* Share link chip */}
      {sharePop > 0 && (
        <div
          style={{
            position: "absolute",
            top: 1250,
            right: 210,
            scale: String(sharePop),
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: "rgba(74,11,19,0.85)",
              borderRadius: 20,
              padding: "16px 26px",
              boxShadow: "0 18px 44px rgba(0,0,0,0.35)",
              border: "1.5px solid rgba(230,201,143,0.5)",
            }}
          >
            <span style={{ fontSize: 36 }}>🔗</span>
            <span
              style={{
                fontFamily: fontSans,
                fontWeight: 700,
                fontSize: 26,
                color: C.cream,
              }}
            >
              Private share link
            </span>
          </div>
        </div>
      )}

      <Caption
        text={
          <>
            <span style={{ color: C.goldSoft }}>Download.</span> Share. Print.
          </>
        }
        y={1560}
        size={56}
      />
    </AbsoluteFill>
  );
};
