import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from 'remotion';
import { theme } from '../theme';

const stats = [
  { value: '10K+', label: 'Downloads · Month One', sub: 'ZenCabs' },
  { value: '₹6 Cr+', label: 'Savings Delivered', sub: 'PwC India' },
  { value: '300%', label: 'Profit Growth', sub: 'Equip9' },
  { value: '8 yrs', label: 'Operating', sub: 'Since Age 15' },
];

export const StatsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 140px',
      }}
    >
      {/* Section label */}
      <div
        style={{
          opacity: interpolate(frame, [0, 0.4 * fps], [0, 1], {
            extrapolateRight: 'clamp',
            extrapolateLeft: 'clamp',
          }),
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 14,
          letterSpacing: '0.24em',
          color: theme.fgDim,
          marginBottom: 50,
          textAlign: 'center',
        }}
      >
        <span style={{ color: theme.mint }}>EXH 01</span> — KEY METRICS · AUDITED
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 2,
          width: '100%',
          maxWidth: 1400,
          background: theme.line,
          border: `1px solid ${theme.line}`,
        }}
      >
        {stats.map((stat, i) => {
          const delay = i * 0.15 * fps;
          const cellOpacity = interpolate(
            frame,
            [delay, delay + 0.5 * fps],
            [0, 1],
            { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
          );
          const cellY = interpolate(
            frame,
            [delay, delay + 0.5 * fps],
            [30, 0],
            {
              extrapolateRight: 'clamp',
              extrapolateLeft: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }
          );

          return (
            <div
              key={stat.label}
              style={{
                opacity: cellOpacity,
                transform: `translateY(${cellY}px)`,
                backgroundColor: theme.panel,
                padding: '50px 40px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: "'Clash Display', 'Inter', sans-serif",
                  fontSize: 64,
                  fontWeight: 700,
                  color: theme.mint,
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 13,
                  letterSpacing: '0.18em',
                  color: theme.fgDim,
                  marginTop: 16,
                  textTransform: 'uppercase',
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  color: theme.fgFaint,
                  marginTop: 6,
                }}
              >
                {stat.sub}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
