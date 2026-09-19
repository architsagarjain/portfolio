import React from "react";
import {
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { C, EASE_OUT, fontSans, fontSerif, SAMPLE_BIO } from "../theme";
import { StatusBar } from "./Chrome";

/* Stylized avatar placeholder — no real person's photo used */
export const Avatar: React.FC<{ size: number }> = ({ size }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      background: `linear-gradient(160deg, ${C.blush}, ${C.rose} 55%, #9d7f86)`,
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end",
      overflow: "hidden",
      border: `4px solid ${C.gold}`,
      position: "relative",
    }}
  >
    {/* simple abstract silhouette */}
    <div
      style={{
        width: "46%",
        height: "46%",
        borderRadius: "50% 50% 40% 40%",
        background: "rgba(74,11,19,0.55)",
        marginBottom: "28%",
      }}
    />
    <div
      style={{
        position: "absolute",
        bottom: -size * 0.06,
        width: "78%",
        height: "34%",
        borderRadius: "50% 50% 0 0",
        background: "rgba(74,11,19,0.55)",
      }}
    />
  </div>
);

const Row: React.FC<{ label: string; value: string; width?: number }> = ({
  label,
  value,
  width,
}) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      gap: 18,
      padding: "13px 0",
      borderBottom: "1px solid rgba(54,40,35,0.12)",
    }}
  >
    <span
      style={{
        fontFamily: fontSans,
        fontSize: 21,
        fontWeight: 600,
        color: "rgba(54,40,35,0.55)",
        minWidth: width ?? 190,
      }}
    >
      {label}
    </span>
    <span
      style={{
        fontFamily: fontSans,
        fontSize: 22,
        fontWeight: 600,
        color: C.ink,
        textAlign: "right",
      }}
    >
      {value}
    </span>
  </div>
);

/**
 * Stylized bio-data sheet mirroring the product's A4 templates
 * (Cormorant Garamond headings, gold dividers, maroon accents).
 * scaleOrigin: when provided, fields mount progressively (used in the fill scene).
 */
export const BioSheet: React.FC<{
  width: number;
  visibleRows?: number; // undefined = all
}> = ({ width, visibleRows }) => {
  const frame = useCurrentFrame();
  const height = (width * 297) / 210; // A4 ratio
  const all = [
    { label: "Name", value: SAMPLE_BIO.name },
    { label: "Age", value: SAMPLE_BIO.age },
    { label: "Height", value: SAMPLE_BIO.height },
    { label: "Qualification", value: SAMPLE_BIO.qualification },
    { label: "Occupation", value: SAMPLE_BIO.occupation },
    { label: "Native Place", value: SAMPLE_BIO.native },
  ];
  const rows = visibleRows == null ? all : all.slice(0, visibleRows);

  return (
    <div
      style={{
        width,
        height,
        background: C.paper,
        borderRadius: 8,
        boxShadow: "0 30px 70px rgba(54,40,35,0.4)",
        padding: Math.round(width * 0.06),
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* top gold rule */}
      <div
        style={{
          height: 6,
          background: `linear-gradient(90deg, ${C.maroon}, ${C.gold}, ${C.maroon})`,
          borderRadius: 3,
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: Math.round(width * 0.05),
          marginTop: Math.round(width * 0.05),
        }}
      >
        <Avatar size={Math.round(width * 0.2)} />
        <div>
          <div
            style={{
              fontFamily: fontSerif,
              fontWeight: 700,
              fontSize: Math.round(width * 0.082),
              color: C.maroon,
              lineHeight: 1.05,
            }}
          >
            {SAMPLE_BIO.name}
          </div>
          <div
            style={{
              fontFamily: fontSans,
              fontSize: Math.round(width * 0.032),
              fontWeight: 600,
              color: C.goldDeep,
              marginTop: 6,
              letterSpacing: 1,
            }}
          >
            {SAMPLE_BIO.qualification} · {SAMPLE_BIO.occupation}
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: Math.round(width * 0.045),
          marginBottom: 4,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Img
          src={staticFile("divider-flourish.png")}
          style={{ width: width * 0.5, height: "auto", opacity: 0.85 }}
        />
      </div>
      <div style={{ flex: 1, overflow: "hidden" }}>
        {rows.map((r) => (
          <Row key={r.label} label={r.label} value={r.value} />
        ))}
      </div>
      {/* footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: Math.round(width * 0.03),
        }}
      >
        <Img
          src={staticFile("sm-wordmark-maroon.png")}
          style={{ height: Math.round(width * 0.045), width: "auto", opacity: 0.9 }}
        />
      </div>
    </div>
  );
};

/** Progressive field-mount used by the AI-fill scene */
export const FilledRow: React.FC<{
  label: string;
  value: string;
  delay: number;
}> = ({ label, value, delay }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + 7], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const slide = interpolate(frame, [delay, delay + 9], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(...EASE_OUT),
  });
  return (
    <div
      style={{
        opacity,
        translate: `0 ${slide}px`,
      }}
    >
      <Row label={label} value={value} />
    </div>
  );
};

export { StatusBar };
