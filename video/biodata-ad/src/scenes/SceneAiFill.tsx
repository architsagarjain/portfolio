import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, EASE_OUT, fontSans, fontSerif, SAMPLE_BIO } from "../theme";
import { Caption, Phone, StatusBar } from "../components/Chrome";
import { Avatar } from "../components/BioSheet";

const FIELDS: [string, string][] = [
  ["Name", SAMPLE_BIO.name],
  ["Age · Height", `${SAMPLE_BIO.age} · ${SAMPLE_BIO.height}`],
  ["Qualification", SAMPLE_BIO.qualification],
  ["Occupation", SAMPLE_BIO.occupation],
  ["Native Place", SAMPLE_BIO.native],
  ["Diet", SAMPLE_BIO.diet],
];

const TapRipple: React.FC<{ at: number; x: number; y: number }> = ({
  at,
  x,
  y,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [at, at + 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.8, 0.3, 1),
  });
  if (p >= 1 || p <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 90,
        height: 90,
        borderRadius: 45,
        border: `4px solid ${C.maroon}`,
        opacity: 0.55 * (1 - p),
        scale: String(0.4 + p),
        translate: "-50% -50%",
      }}
    />
  );
};

/**
 * Scene 4 — AI auto-fill (5.0–9.0s · 120 frames)
 * Upload photo → AI extracts → form fills itself row by row.
 */
export const SceneAiFill: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phonePop = spring({ frame, fps, config: { damping: 14, mass: 0.9 } });

  const photoIn = spring({ frame: frame - 20, fps, config: { damping: 12 } });
  const checkPop = spring({ frame: frame - 26, fps, config: { damping: 10 } });
  const scanning = frame >= 28 && frame < 56;
  const scanY = interpolate(frame, [28, 56], [-60, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.linear,
  });

  const fieldsStart = 56;
  const allFilled = frame > fieldsStart + FIELDS.length * 8 + 4;
  const verifiedPop = spring({
    frame: frame - (fieldsStart + FIELDS.length * 8 + 2),
    fps,
    config: { damping: 11 },
  });

  // caption swap
  const cap1Out = interpolate(frame, [50, 58], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cap2In = interpolate(frame, [58, 66], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(...EASE_OUT),
  });

  const dots = ".".repeat(1 + (Math.floor(frame / 8) % 3));

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${C.cream}, ${C.creamWarm})`,
      }}
    >
      {/* soft maroon vignette top */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% -10%, rgba(139,23,39,0.16), transparent 55%)",
        }}
      />

      <Phone scale={0.94 * phonePop} opacity={phonePop}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "#FFFDF8",
              fontFamily: fontSans,
            }}
          >
            <StatusBar />
            {/* app header */}
            <div
              style={{
                padding: "10px 30px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: fontSerif,
                    fontWeight: 700,
                    fontSize: 38,
                    color: C.maroon,
                  }}
                >
                  Bio-data Generator
                </div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: "rgba(54,40,35,0.55)",
                    marginTop: 2,
                  }}
                >
                  A4 · live preview
                </div>
              </div>
              <div
                style={{
                  fontSize: 19,
                  fontWeight: 800,
                  color: C.maroon,
                  border: `2px solid ${C.gold}`,
                  borderRadius: 999,
                  padding: "8px 18px",
                  background: C.creamWarm,
                }}
              >
                Step 2 of 4
              </div>
            </div>

            {/* upload card */}
            <div style={{ position: "relative", padding: "0 30px" }}>
              <div
                style={{
                  borderRadius: 24,
                  border: `2.5px dashed ${C.gold}`,
                  background: C.creamWarm,
                  padding: "22px 26px",
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {photoIn > 0 ? (
                  <div style={{ position: "relative", scale: String(photoIn) }}>
                    <Avatar size={96} />
                    {scanning && (
                      <div
                        style={{
                          position: "absolute",
                          left: -6,
                          right: -6,
                          top: scanY,
                          height: 5,
                          borderRadius: 3,
                          background: C.gold,
                          boxShadow: `0 0 18px 4px ${C.goldSoft}`,
                        }}
                      />
                    )}
                  </div>
                ) : (
                  <div
                    style={{
                      width: 96,
                      height: 96,
                      borderRadius: 48,
                      border: `2.5px dashed ${C.rose}`,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: 40,
                      color: C.rose,
                      background: "#fff",
                    }}
                  >
                    ⬆
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 26,
                      color: C.ink,
                    }}
                  >
                    {photoIn > 0 ? "Priya_photo.jpg" : "Upload Photo"}
                  </div>
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 600,
                      color: "rgba(54,40,35,0.5)",
                      marginTop: 4,
                    }}
                  >
                    {scanning
                      ? `Extracting with AI${dots}`
                      : photoIn > 0
                        ? "Photo added"
                        : "JPG or PNG · up to 5 MB"}
                  </div>
                </div>
                {checkPop > 0 && (
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 26,
                      background: "#2E7D32",
                      color: "#fff",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: 30,
                      fontWeight: 800,
                      scale: String(checkPop),
                    }}
                  >
                    ✓
                  </div>
                )}
                <TapRipple at={14} x={470} y={72} />
              </div>
            </div>

            {/* filled fields */}
            <div style={{ padding: "18px 30px 0" }}>
              {FIELDS.map(([label, value], i) => {
                const t = fieldsStart + i * 8;
                const op = interpolate(frame, [t, t + 6], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                });
                const slide = interpolate(frame, [t, t + 8], [16, 0], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(...EASE_OUT),
                });
                const flash = interpolate(frame, [t, t + 2, t + 10], [0, 0.6, 0], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                });
                return (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "17px 22px",
                      marginBottom: 12,
                      borderRadius: 16,
                      background: "#FFFFFF",
                      border: "1.5px solid rgba(54,40,35,0.1)",
                      boxShadow: `inset 0 0 0 100px rgba(201,161,74,${flash})`,
                      opacity: op,
                      translate: `0 ${slide}px`,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 22,
                        fontWeight: 600,
                        color: "rgba(54,40,35,0.5)",
                      }}
                    >
                      {label}
                    </span>
                    <span
                      style={{
                        fontSize: 23,
                        fontWeight: 700,
                        color: C.ink,
                      }}
                    >
                      {op > 0.95 ? value : "•••"}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* verified chip */}
            {verifiedPop > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 6,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    background: "#E8F5E9",
                    border: "1.5px solid #2E7D32",
                    color: "#1B5E20",
                    borderRadius: 999,
                    padding: "12px 28px",
                    fontSize: 23,
                    fontWeight: 800,
                    scale: String(verifiedPop),
                  }}
                >
                  ✓ All details extracted
                </div>
              </div>
            )}
          </div>
      </Phone>

      {/* captions */}
      {frame < 58 && (
        <Caption text="Upload one photo…" y={1630} opacityOverride={cap1Out} />
      )}
      {frame >= 58 && (
        <Caption
          text={
            <>
              <span style={{ color: C.goldSoft }}>AI</span> fills your details
            </>
          }
          y={1630}
          opacityOverride={cap2In}
        />
      )}
    </AbsoluteFill>
  );
};
