import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import { theme, fonts } from "../theme";

/**
 * Scene 3: AI Extract — "AI reads your photo. Fills everything."
 * Frames 240–420 (8–14s)
 * Visual: Photo with scan line → fields auto-populating → "Under 30 seconds"
 */

const formFields = [
  { label: "Name", value: "Priya Sharma", delay: 0 },
  { label: "Father's Name", value: "Rajesh Sharma", delay: 0.3 },
  { label: "Mother's Name", value: "Sunita Sharma", delay: 0.6 },
  { label: "Date of Birth", value: "15 Mar 1996", delay: 0.9 },
  { label: "Height", value: "5'4\"", delay: 1.2 },
  { label: "Education", value: "MBA, Delhi University", delay: 1.5 },
  { label: "Occupation", value: "Product Manager", delay: 1.8 },
  { label: "Gotra", value: "Sharma", delay: 2.1 },
];

export const AiExtractScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Section label
  const labelOpacity = interpolate(frame, [0, 0.4 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Photo frame
  const photoScale = interpolate(frame, [0.2 * fps, 0.8 * fps], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.spring({ damping: 15 }),
    output: "perceptual-scale",
  });
  const photoOpacity = interpolate(frame, [0.2 * fps, 0.6 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scan line (moves down over photo)
  const scanY = interpolate(frame, [1 * fps, 3 * fps], [0, 280], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const scanOpacity = interpolate(
    frame,
    [1 * fps, 1.3 * fps, 3 * fps, 3.3 * fps],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Form card slides in from right
  const cardX = interpolate(frame, [1.5 * fps, 2.5 * fps], [200, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const cardOpacity = interpolate(frame, [1.5 * fps, 2.2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Speed badge
  const speedOpacity = interpolate(
    frame,
    [4.2 * fps, 4.8 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const speedScale = interpolate(
    frame,
    [4.2 * fps, 4.8 * fps],
    [0.8, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.spring({ damping: 12 }),
      output: "perceptual-scale",
    }
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${theme.burgundyDeep} 0%, ${theme.bg} 50%)`,
        padding: "0 60px",
      }}
    >
      {/* Top label */}
      <div
        style={{
          position: "absolute",
          top: 160,
          left: 60,
          right: 60,
          opacity: labelOpacity,
        }}
      >
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 16,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: theme.gold,
            marginBottom: 12,
          }}
        >
          STEP 1 — UPLOAD PHOTO
        </div>
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 56,
            color: theme.cream,
            lineHeight: 1.1,
            textTransform: "uppercase",
          }}
        >
          AI reads your
          <br />
          photo.
        </div>
      </div>

      {/* Photo with scan line */}
      <div
        style={{
          position: "absolute",
          top: 460,
          left: "50%",
          transform: `translateX(-50%) scale(${photoScale})`,
          opacity: photoOpacity,
          width: 340,
          height: 380,
          borderRadius: 16,
          overflow: "hidden",
          border: `2px solid ${theme.gold}50`,
          boxShadow: `0 16px 48px rgba(0,0,0,0.4)`,
        }}
      >
        {/* Simulated photo (gradient portrait placeholder) */}
        <div
          style={{
            width: "100%",
            height: "100%",
            background: `linear-gradient(180deg, #D4956B 0%, #C47A50 30%, ${theme.burgundy} 100%)`,
            position: "relative",
          }}
        >
          {/* Portrait silhouette */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 200,
              height: 300,
              borderRadius: "100px 100px 0 0",
              background: `linear-gradient(180deg, #E8B89A 0%, #D4956B 100%)`,
            }}
          />
          {/* Head */}
          <div
            style={{
              position: "absolute",
              top: 50,
              left: "50%",
              transform: "translateX(-50%)",
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: `linear-gradient(180deg, #2A1515 0%, #1A0A0A 100%)`,
            }}
          />
          {/* Hair */}
          <div
            style={{
              position: "absolute",
              top: 30,
              left: "50%",
              transform: "translateX(-50%)",
              width: 130,
              height: 80,
              borderRadius: "65px 65px 0 0",
              background: "#1A0A0A",
            }}
          />
        </div>

        {/* Scan line */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: scanY,
            height: 3,
            background: `linear-gradient(90deg, transparent 0%, ${theme.gold} 20%, ${theme.goldLight} 50%, ${theme.gold} 80%, transparent 100%)`,
            boxShadow: `0 0 20px ${theme.gold}80, 0 0 40px ${theme.gold}40`,
            opacity: scanOpacity,
          }}
        />

        {/* AI sparkle badge */}
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: `linear-gradient(135deg, ${theme.gold}, ${theme.goldLight})`,
            borderRadius: 20,
            padding: "6px 14px",
            fontFamily: fonts.mono,
            fontSize: 13,
            fontWeight: 700,
            color: theme.burgundyDeep,
            letterSpacing: "0.05em",
            opacity: interpolate(frame, [0.5 * fps, 1 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          ✨ AI SCAN
        </div>
      </div>

      {/* Auto-fill form card */}
      <div
        style={{
          position: "absolute",
          top: 920,
          left: 60,
          right: 60,
          opacity: cardOpacity,
          transform: `translateX(${cardX}px)`,
        }}
      >
        <div
          style={{
            background: `${theme.bgCard}E0`,
            border: `1px solid ${theme.gold}30`,
            borderRadius: 16,
            padding: "28px 32px",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 13,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: theme.gold,
              marginBottom: 20,
            }}
          >
            ✨ AI EXTRACTED
          </div>
          {formFields.map((field, i) => {
            const fieldOpacity = interpolate(
              frame,
              [(2 + field.delay) * fps, (2.3 + field.delay) * fps],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const fieldX = interpolate(
              frame,
              [(2 + field.delay) * fps, (2.3 + field.delay) * fps],
              [30, 0],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }
            );
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  padding: "8px 0",
                  borderBottom: `1px solid ${theme.gold}15`,
                  opacity: fieldOpacity,
                  transform: `translateX(${fieldX}px)`,
                }}
              >
                <span
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 14,
                    color: theme.textMuted,
                    letterSpacing: "0.05em",
                  }}
                >
                  {field.label}
                </span>
                <span
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 18,
                    color: theme.cream,
                    fontWeight: 500,
                  }}
                >
                  {field.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Speed badge */}
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: speedOpacity,
          transform: `scale(${speedScale})`,
        }}
      >
        <div
          style={{
            background: `linear-gradient(135deg, ${theme.gold}, ${theme.goldLight})`,
            borderRadius: 60,
            padding: "18px 48px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            boxShadow: `0 8px 32px ${theme.gold}40`,
          }}
        >
          <span style={{ fontSize: 28 }}>⚡</span>
          <span
            style={{
              fontFamily: fonts.display,
              fontSize: 36,
              fontWeight: 700,
              color: theme.burgundyDeep,
              letterSpacing: "-0.01em",
            }}
          >
            Under 30 seconds
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
