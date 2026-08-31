import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from 'remotion';
import { theme } from '../theme';

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 0.6 * fps], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const titleY = interpolate(frame, [0, 0.6 * fps], [40, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const itemsOpacity = interpolate(frame, [0.5 * fps, 1 * fps], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const badgeOpacity = interpolate(frame, [1 * fps, 1.5 * fps], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const badgeScale = interpolate(frame, [1 * fps, 1.5 * fps], [0.8, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

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
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(159,248,222,0.06) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      {/* Section label */}
      <div
        style={{
          opacity: itemsOpacity,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 14,
          letterSpacing: '0.24em',
          color: theme.fgDim,
          marginBottom: 24,
        }}
      >
        <span style={{ color: theme.mint }}>05</span> — THE DESK · WHY ALLOCATE
      </div>

      {/* Headline */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          fontFamily: "'Clash Display', 'Inter', sans-serif",
          fontSize: 88,
          fontWeight: 700,
          color: theme.fg,
          textAlign: 'center',
          textTransform: 'uppercase',
          lineHeight: 1,
        }}
      >
        Initiate a{' '}
        <span style={{ color: theme.mint }}>position.</span>
      </div>

      {/* Buyer targets */}
      <div
        style={{
          opacity: itemsOpacity,
          display: 'flex',
          gap: 40,
          marginTop: 50,
          maxWidth: 1100,
        }}
      >
        {[
          {
            key: "FOUNDER'S OFFICES",
            desc: 'Handed an ambiguous problem on Monday, back with a system by Friday.',
          },
          {
            key: 'VENTURE FUNDS',
            desc: 'Operators who can diligence a company from the inside out.',
          },
          {
            key: 'STRATEGY & GROWTH',
            desc: 'Consulting rigor + founder empathy in a single instrument.',
          },
        ].map((item, i) => (
          <div
            key={item.key}
            style={{
              flex: 1,
              padding: '28px 32px',
              backgroundColor: theme.panel,
              border: `1px solid ${theme.line}`,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                letterSpacing: '0.2em',
                color: theme.mint,
                marginBottom: 12,
              }}
            >
              {item.key}
            </div>
            <div
              style={{
                fontFamily: "'Clash Display', 'Inter', sans-serif",
                fontSize: 20,
                fontWeight: 600,
                color: theme.fg,
                lineHeight: 1.3,
              }}
            >
              {item.desc}
            </div>
          </div>
        ))}
      </div>

      {/* CTA badge */}
      <div
        style={{
          opacity: badgeOpacity,
          transform: `scale(${badgeScale})`,
          marginTop: 50,
          display: 'flex',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <div
          style={{
            border: `1px solid ${theme.up}`,
            padding: '12px 28px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 14,
            letterSpacing: '0.16em',
            color: theme.up,
          }}
        >
          ▲ STRONG BUY
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            letterSpacing: '0.14em',
            color: theme.fgDim,
          }}
        >
          OPEN TO FOUNDER'S OFFICE · VC · STRATEGY & GROWTH
        </div>
      </div>
    </AbsoluteFill>
  );
};
