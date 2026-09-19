import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import { theme, fonts } from "../theme";

/**
 * Scene 2: Product Reveal — "Introducing Bio-Data Generator"
 * Frames 120–240 (4–8s)
 * Visual: Logo mark + product name burst in with gold shimmer
 */
export const IntroScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background glow pulse
  const glowScale = interpolate(frame, [0, 2 * fps], [0.6, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Logo/icon scale in with spring
  const iconScale = interpolate(frame, [0.2 * fps, 1 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.spring({ damping: 12, mass: 0.8 }),
    output: "perceptual-scale",
  });

  // Title text
  const titleOpacity = interpolate(frame, [0.8 * fps, 1.4 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0.8 * fps, 1.4 * fps], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Subtitle
  const subOpacity = interpolate(frame, [1.2 * fps, 1.8 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subY = interpolate(frame, [1.2 * fps, 1.8 * fps], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Brand name at bottom
  const brandOpacity = interpolate(frame, [1.6 * fps, 2.2 * fps], [0, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Gold particle shimmer
  const particles = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    const radius = interpolate(frame, [0.3 * fps, 1.5 * fps], [0, 260], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    });
    const particleOpacity = interpolate(
      frame,
      [0.3 * fps, 0.8 * fps, 2 * fps],
      [0, 0.8, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
    return {
      x: 540 + Math.cos(angle) * radius,
      y: 700 + Math.sin(angle) * radius,
      opacity: particleOpacity,
      size: 4 + (i % 3) * 2,
    };
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 35%, ${theme.burgundy} 0%, ${theme.burgundyDeep} 40%, ${theme.bg} 80%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Glow backdrop */}
      <div
        style={{
          position: "absolute",
          top: 500,
          left: "50%",
          width: 500,
          height: 500,
          marginLeft: -250,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.gold}25 0%, transparent 70%)`,
          transform: `scale(${glowScale})`,
        }}
      />

      {/* Gold particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x - p.size / 2,
            top: p.y - p.size / 2,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: theme.gold,
            opacity: p.opacity,
            boxShadow: `0 0 8px ${theme.gold}80`,
          }}
        />
      ))}

      {/* Icon: stylized document with AI sparkle */}
      <div
        style={{
          position: "absolute",
          top: 520,
          left: "50%",
          transform: `translateX(-50%) scale(${iconScale})`,
          width: 200,
          height: 260,
          borderRadius: 16,
          background: `linear-gradient(145deg, ${theme.cream} 0%, ${theme.creamSoft} 100%)`,
          boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${theme.gold}30`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        {/* Fake bio-data lines */}
        {[1, 2, 3, 4, 5, 6].map((line) => (
          <div
            key={line}
            style={{
              width: line === 1 ? 100 : 60 + (line % 3) * 15,
              height: 8,
              borderRadius: 4,
              background:
                line === 1
                  ? theme.burgundy
                  : `${theme.burgundy}${30 + line * 8}`,
              marginBottom: line === 1 ? 14 : 8,
            }}
          />
        ))}
        {/* AI sparkle */}
        <div
          style={{
            position: "absolute",
            top: -16,
            right: -16,
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${theme.gold}, ${theme.goldLight})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            boxShadow: `0 4px 20px ${theme.gold}60`,
          }}
        >
          ✨
        </div>
      </div>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 850,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          padding: "0 60px",
        }}
      >
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 76,
            color: theme.cream,
            lineHeight: 1.05,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
          }}
        >
          Bio-Data
          <br />
          Generator
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          top: 1080,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
          padding: "0 80px",
        }}
      >
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 34,
            color: theme.gold,
            lineHeight: 1.4,
            fontWeight: 500,
          }}
        >
          Create beautiful, print-ready
          <br />
          marriage bio-data in minutes.
        </div>
      </div>

      {/* Brand watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 180,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: brandOpacity,
        }}
      >
        <div
          style={{
            fontFamily: fonts.display,
            fontSize: 28,
            fontWeight: 600,
            color: theme.cream,
            letterSpacing: "0.08em",
          }}
        >
          by{" "}
          <span style={{ color: theme.gold }}>Shaadi Mangalam</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
