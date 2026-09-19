import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import { theme, fonts } from "../theme";

/**
 * Scene 1: Hook — "Your bio-data shouldn't take all day"
 * Frames 0–120 (0–4s)
 * Visual: Dark bg, old-school bio-data form fading in then cracking/shattering
 */
export const HookScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Old form fade in
  const formOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Form shakes and cracks after 1.5s
  const shakeX =
    frame > 1.5 * fps
      ? interpolate(frame, [1.5 * fps, 2.2 * fps], [0, 12], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }) *
        Math.sin(frame * 2.5)
      : 0;

  // Crack lines appear
  const crackOpacity = interpolate(frame, [1.8 * fps, 2.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Everything shatters and fades out
  const shatterScale = interpolate(frame, [2.8 * fps, 3.8 * fps], [1, 1.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const shatterOpacity = interpolate(
    frame,
    [2.8 * fps, 3.8 * fps],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Pain text
  const textOpacity = interpolate(frame, [0.6 * fps, 1.2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textY = interpolate(frame, [0.6 * fps, 1.2 * fps], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Timer counting up
  const timerMinutes = Math.min(
    Math.floor(
      interpolate(frame, [1 * fps, 3.5 * fps], [0, 480], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    ),
    480
  );
  const hours = Math.floor(timerMinutes / 60);
  const mins = timerMinutes % 60;
  const timerText = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

  const timerOpacity = interpolate(frame, [0.8 * fps, 1.3 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 40%, ${theme.burgundyDark} 0%, ${theme.bg} 70%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Pain headline */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          padding: "0 60px",
        }}
      >
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 72,
            color: theme.cream,
            lineHeight: 1.1,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
          }}
        >
          Your bio-data
          <br />
          <span style={{ color: theme.gold }}>shouldn't take</span>
          <br />
          all day.
        </div>
      </div>

      {/* Old form mockup */}
      <div
        style={{
          position: "absolute",
          top: 720,
          left: 120,
          right: 120,
          opacity: formOpacity * shatterOpacity,
          transform: `translateX(${shakeX}px) scale(${shatterScale})`,
        }}
      >
        <div
          style={{
            background: theme.offWhite,
            borderRadius: 12,
            padding: "40px 36px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          {/* Fake old form header */}
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 14,
              color: theme.burgundy,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 24,
              borderBottom: `2px solid ${theme.burgundy}`,
              paddingBottom: 12,
            }}
          >
            BIO-DATA FORM (MANUAL)
          </div>
          {/* Form fields */}
          {[
            "Full Name: ___________________",
            "Father's Name: ______________",
            "Mother's Name: ______________",
            "Date of Birth: ______________",
            "Height: _____  Weight: _____",
            "Education: __________________",
            "Occupation: _________________",
            "Family Income: ______________",
            "Gotra: ______________________",
            "Manglik Status: _____________",
          ].map((field, i) => (
            <div
              key={i}
              style={{
                fontFamily: fonts.mono,
                fontSize: 16,
                color: "#444",
                marginBottom: 10,
                opacity: interpolate(
                  frame,
                  [
                    (0.3 + i * 0.15) * fps,
                    (0.6 + i * 0.15) * fps,
                  ],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
              }}
            >
              {field}
            </div>
          ))}
        </div>
      </div>

      {/* Crack overlay */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: crackOpacity,
          pointerEvents: "none",
        }}
      >
        <line
          x1="380"
          y1="700"
          x2="700"
          y2="900"
          stroke={theme.gold}
          strokeWidth="3"
          opacity={crackOpacity}
        />
        <line
          x1="700"
          y1="900"
          x2="550"
          y2="1100"
          stroke={theme.gold}
          strokeWidth="2"
          opacity={crackOpacity * 0.7}
        />
        <line
          x1="350"
          y1="850"
          x2="450"
          y2="1050"
          stroke={theme.goldLight}
          strokeWidth="2"
          opacity={crackOpacity * 0.5}
        />
      </svg>

      {/* Timer badge */}
      <div
        style={{
          position: "absolute",
          bottom: 340,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: timerOpacity * shatterOpacity,
        }}
      >
        <div
          style={{
            background: theme.burgundyDeep,
            border: `1px solid ${theme.gold}40`,
            borderRadius: 16,
            padding: "16px 40px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 14,
              color: theme.gold,
              letterSpacing: "0.12em",
            }}
          >
            TIME SPENT:
          </span>
          <span
            style={{
              fontFamily: fonts.display,
              fontSize: 42,
              fontWeight: 700,
              color: theme.cream,
            }}
          >
            {timerText}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
