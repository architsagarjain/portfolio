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
import {
  C,
  EASE_OUT,
  TEMPLATE_NAMES,
  TEMPLATE_STYLES,
  fontSans,
  fontSerif,
} from "../theme";
import { Caption } from "../components/Chrome";

/**
 * Scene 5 — Templates (9.0–13.0s · 120 frames)
 * 12 designer template cards cascade into a grid, each in its own
 * palette pulled from the real template styles, with name chips.
 */
export const SceneTemplates: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const W = 200;
  const H = (W * 297) / 210;
  const cols = 3;
  const gapX = 24;
  const gapY = 24;

  const headIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(...EASE_OUT),
  });

  return (
    <AbsoluteFill style={{ background: C.maroonDeep }}>
      {/* gold flourishes, mirrored at the two top corners */}
      <Img
        src={staticFile("divider-flourish.png")}
        style={{
          position: "absolute",
          top: 60,
          left: 60,
          width: 260,
          height: "auto",
          opacity: 0.45,
          scale: "1 -1",
        }}
      />
      <Img
        src={staticFile("divider-flourish.png")}
        style={{
          position: "absolute",
          top: 60,
          right: 60,
          width: 260,
          height: "auto",
          opacity: 0.45,
          scale: "-1 -1",
        }}
      />

      {/* heading */}
      <div
        style={{
          position: "absolute",
          top: 170,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: headIn,
        }}
      >
        <div
          style={{
            fontFamily: fontSerif,
            fontWeight: 700,
            fontSize: 104,
            color: C.cream,
          }}
        >
          12 designer
        </div>
        <div
          style={{
            fontFamily: fontSerif,
            fontWeight: 700,
            fontSize: 104,
            marginTop: -10,
            background: `linear-gradient(120deg, ${C.goldSoft}, ${C.gold})`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          templates
        </div>
      </div>

      {/* grid */}
      <div
        style={{
          position: "absolute",
          top: 470,
          left: 0,
          right: 0,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: `${gapY}px ${gapX}px`,
        }}
      >
        {TEMPLATE_NAMES.map((name, i) => {
          const col = i % cols;
          const row = Math.floor(i / cols);
          const delay = 8 + i * 4 + row * 4;
          const pop = spring({
            frame: frame - delay,
            fps,
            config: { damping: 13, mass: 0.7 },
          });
          const s = TEMPLATE_STYLES[name];
          return (
            <div
              key={name}
              style={{
                width: W,
                opacity: Math.max(0, pop),
                scale: String(0.6 + pop * 0.4),
                rotate: `${(col - 1) * 2}deg`,
              }}
            >
              <div
                style={{
                  width: W,
                  height: H,
                  borderRadius: 14,
                  background: s.bg,
                  border: `2px solid ${s.accent}44`,
                  boxShadow: "0 18px 44px rgba(0,0,0,0.4)",
                  padding: 18,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "70%",
                    height: 5,
                    borderRadius: 3,
                    background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)`,
                  }}
                />
                <div
                  style={{
                    fontFamily: fontSerif,
                    fontWeight: 700,
                    fontSize: 30,
                    color: s.head,
                    marginTop: 14,
                  }}
                >
                  Priya Sharma
                </div>
                <div
                  style={{
                    fontFamily: fontSans,
                    fontSize: 15,
                    fontWeight: 700,
                    color: s.accent,
                    letterSpacing: 2,
                    marginTop: 4,
                  }}
                >
                  {name.toUpperCase()}
                </div>
                <div
                  style={{
                    marginTop: 14,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 9,
                  }}
                >
                  {[0, 1, 2, 3].map((r) => (
                    <div
                      key={r}
                      style={{
                        height: 10,
                        borderRadius: 5,
                        background:
                          r % 2 === 0
                            ? `${s.accent}22`
                            : "rgba(54,40,35,0.10)",
                        width: r === 0 ? "85%" : "100%",
                      }}
                    />
                  ))}
                </div>
                <div style={{ flex: 1 }} />
                <div
                  style={{
                    width: "40%",
                    height: 6,
                    borderRadius: 3,
                    background: `${s.accent}55`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <Caption text="Pick your favorite" y={1710} size={52} />
    </AbsoluteFill>
  );
};
