import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from 'remotion';
import { theme } from '../theme';

const positions = [
  { period: "JAN'26 — NOW", org: 'ZenCabs', role: 'STRATEGY & GROWTH', tag: 'CORE HOLDING' },
  { period: "OCT'24 — JAN'26", org: 'PwC India', role: 'RISK CONSULTANT', tag: 'BLUE CHIP' },
  { period: "AUG'22 — MAY'24", org: 'Cairros', role: 'FOUNDER', tag: 'FOUNDER ROUND' },
  { period: "DEC'22 — OCT'24", org: 'Equip9', role: 'DIGITAL MARKETING', tag: 'GROWTH POSITION' },
];

export const PositionsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timeline fill progress
  const fillProgress = interpolate(frame, [0.3 * fps, 3.5 * fps], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        padding: '80px 140px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div
        style={{
          opacity: interpolate(frame, [0, 0.4 * fps], [0, 1], {
            extrapolateRight: 'clamp',
            extrapolateLeft: 'clamp',
          }),
          marginBottom: 50,
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 14,
            letterSpacing: '0.24em',
            color: theme.fgDim,
          }}
        >
          <span style={{ color: theme.mint }}>01</span> — POSITION HISTORY
        </div>
        <div
          style={{
            fontFamily: "'Clash Display', 'Inter', sans-serif",
            fontSize: 52,
            fontWeight: 700,
            color: theme.fg,
            marginTop: 16,
            textTransform: 'uppercase',
            lineHeight: 1.05,
          }}
        >
          Eight years. Six positions.{' '}
          <span style={{ color: theme.mint }}>Zero exits at a loss.</span>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ display: 'flex', gap: 60, flex: 1, alignItems: 'stretch' }}>
        {/* Vertical line */}
        <div style={{ position: 'relative', width: 3, flexShrink: 0 }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: theme.line,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: `${fillProgress * 100}%`,
              backgroundColor: theme.mint,
              boxShadow: '0 0 10px rgba(159,248,222,0.5)',
            }}
          />
        </div>

        {/* Position cards */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
            flex: 1,
          }}
        >
          {positions.map((pos, i) => {
            const delay = i * 0.6 * fps;
            const cardOpacity = interpolate(
              frame,
              [delay, delay + 0.5 * fps],
              [0, 1],
              { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
            );
            const cardX = interpolate(
              frame,
              [delay, delay + 0.5 * fps],
              [-40, 0],
              {
                extrapolateRight: 'clamp',
                extrapolateLeft: 'clamp',
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }
            );

            return (
              <div
                key={pos.org}
                style={{
                  opacity: cardOpacity,
                  transform: `translateX(${cardX}px)`,
                  backgroundColor: theme.panel,
                  border: `1px solid ${theme.line}`,
                  padding: '28px 36px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 20,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "'Clash Display', 'Inter', sans-serif",
                      fontSize: 32,
                      fontWeight: 700,
                      color: theme.fg,
                      textTransform: 'uppercase',
                    }}
                  >
                    {pos.org}
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 13,
                      letterSpacing: '0.18em',
                      color: theme.mint,
                      marginTop: 6,
                    }}
                  >
                    {pos.role}
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      letterSpacing: '0.14em',
                      color: theme.fgDim,
                    }}
                  >
                    {pos.period}
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      letterSpacing: '0.12em',
                      color: theme.amber,
                      marginTop: 4,
                    }}
                  >
                    {pos.tag}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
