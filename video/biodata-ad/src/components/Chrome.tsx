import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, EASE_OUT, fontSans } from "../theme";

/* ---------------------------------- Phone ---------------------------------- */

export const PHONE_W = 620;
export const PHONE_H = 1268;

export const Phone: React.FC<{
  children: React.ReactNode;
  scale?: number;
  rotate?: number;
  y?: number;
  x?: number;
  opacity?: number;
}> = ({ children, scale = 1, rotate = 0, y = 0, x = 0, opacity = 1 }) => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <div
        style={{
          width: PHONE_W,
          height: PHONE_H,
          scale: String(scale),
          rotate: `${rotate}deg`,
          translate: `${x}px ${y}px`,
          borderRadius: 72,
          background: C.ink,
          padding: 14,
          boxShadow:
            "0 60px 120px rgba(54,40,35,0.45), 0 20px 50px rgba(74,11,19,0.35), inset 0 0 0 3px rgba(201,161,74,0.35)",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 58,
            overflow: "hidden",
            background: "#FFF",
            position: "relative",
          }}
        >
          {children}
        </div>
        {/* punch-hole camera */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: "50%",
            translate: "-50% 0",
            width: 26,
            height: 26,
            borderRadius: 13,
            background: C.ink,
            zIndex: 5,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

/* -------------------------------- Status bar -------------------------------- */

export const StatusBar: React.FC<{ dark?: boolean }> = ({ dark = false }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "18px 34px 6px",
      fontFamily: fontSans,
      fontSize: 22,
      fontWeight: 600,
      color: dark ? C.cream : C.ink,
    }}
  >
    <span>9:41</span>
    <span style={{ display: "flex", gap: 10, alignItems: "center" }}>
      {/* signal bars */}
      <span style={{ display: "flex", gap: 3, alignItems: "flex-end" }}>
        {[10, 14, 18, 22].map((h) => (
          <span
            key={h}
            style={{
              width: 6,
              height: h,
              borderRadius: 2,
              background: dark ? C.cream : C.ink,
              opacity: 0.9,
            }}
          />
        ))}
      </span>
      {/* battery */}
      <span
        style={{
          width: 40,
          height: 20,
          borderRadius: 6,
          border: `2px solid ${dark ? C.cream : C.ink}`,
          padding: 2,
          display: "flex",
        }}
      >
        <span
          style={{
            width: "70%",
            borderRadius: 3,
            background: dark ? C.cream : C.ink,
          }}
        />
      </span>
    </span>
  </div>
);

/* ------------------------------- Progress bar ------------------------------- */

export const ProgressBar: React.FC<{
  progress: number; // 0..1
  step: number; // 1..4
}> = ({ progress, step }) => {
  const steps = ["Design", "Details", "Preview", "Download"];
  return (
    <div style={{ padding: "18px 30px 10px" }}>
      <div
        style={{
          height: 10,
          borderRadius: 5,
          background: "rgba(54,40,35,0.12)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${Math.round(progress * 100)}%`,
            borderRadius: 5,
            background: `linear-gradient(90deg, ${C.maroon}, ${C.maroonDark})`,
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 10,
          fontFamily: fontSans,
        }}
      >
        {steps.map((s, i) => (
          <span
            key={s}
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: i <= step - 1 ? C.maroon : "rgba(54,40,35,0.4)",
            }}
          >
            {s}
          </span>
        ))}
      </div>
      <div style={{ height: 14 }} />
    </div>
  );
};

/* --------------------------------- Captions --------------------------------- */

export const Caption: React.FC<{
  text: React.ReactNode;
  y?: number; // 0 = default position (~86% height)
  size?: number;
  gold?: boolean;
  opacityOverride?: number;
}> = ({ text, y, size, gold, opacityOverride }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = opacityOverride ?? interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(...EASE_OUT),
  });
  const rise = interpolate(frame, [0, 10], [26, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(...EASE_OUT),
  });
  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        right: 80,
        top: y ?? 1590,
        textAlign: "center",
        opacity: appear,
        translate: `0 ${rise}px`,
      }}
    >
      <span
        style={{
          display: "inline-block",
          fontFamily: fontSans,
          fontWeight: 800,
          fontSize: size ?? 58,
          lineHeight: 1.22,
          color: C.cream,
          background: "rgba(54,40,35,0.82)",
          padding: "18px 34px",
          borderRadius: 26,
          boxShadow: "0 14px 40px rgba(54,40,35,0.35)",
        }}
      >
        {gold ? (
          <span style={{ color: C.goldSoft }}>{text}</span>
        ) : (
          text
        )}
      </span>
    </div>
  );
};

/* ------------------------------ Brand wordmark ------------------------------ */

export const Wordmark: React.FC<{
  variant?: "maroon" | "cream";
  height?: number;
  opacity?: number;
}> = ({ variant = "maroon", height = 64, opacity = 1 }) => (
  <Img
    src={staticFile(
      variant === "maroon"
        ? "sm-wordmark-maroon.png"
        : "sm-wordmark-cream.png",
    )}
    style={{ height, width: "auto", opacity }}
  />
);

/* ------------------------------ Ornament bits ------------------------------- */

export const Flourish: React.FC<{
  width?: number;
  opacity?: number;
  rotate?: number;
}> = ({ width = 420, opacity = 0.9, rotate = 0 }) => (
  <Img
    src={staticFile("divider-flourish.png")}
    style={{
      width,
      height: "auto",
      opacity,
      rotate: `${rotate}deg`,
    }}
  />
);

export const CornerOrnament: React.FC<{
  size?: number;
  corner: "tl" | "tr" | "bl" | "br";
  opacity?: number;
}> = ({ size = 300, corner, opacity = 0.9 }) => {
  const base: React.CSSProperties = {
    position: "absolute",
    width: size,
    height: "auto",
    opacity,
  };
  const pos: Record<string, React.CSSProperties> = {
    tl: {},
    tr: { scale: "-1 1" },
    bl: { scale: "1 -1" },
    br: { scale: "-1 -1" },
  };
  return (
    <Img
      src={staticFile("corner-ornament-floral.png")}
      style={{ ...base, ...pos[corner] }}
    />
  );
};
