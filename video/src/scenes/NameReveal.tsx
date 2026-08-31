import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from 'remotion';
import { theme } from '../theme';

export const NameReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nameOpacity = interpolate(frame, [0, 0.8 * fps], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const nameY = interpolate(frame, [0, 0.8 * fps], [60, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const subtitleOpacity = interpolate(
    frame,
    [0.6 * fps, 1.2 * fps],
    [0, 1],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  const tagOpacity = interpolate(frame, [1 * fps, 1.6 * fps], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const lineWidth = interpolate(frame, [0.3 * fps, 1.2 * fps], [0, 100], {
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
          width: 600,
          height: 600,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(159,248,222,0.08) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      {/* Eyebrow tag */}
      <div
        style={{
          opacity: tagOpacity,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 16,
          letterSpacing: '0.24em',
          color: theme.fgDim,
          marginBottom: 30,
        }}
      >
        NSE:ARCHT · HUMAN CAPITAL DESK
      </div>

      {/* Name */}
      <div
        style={{
          opacity: nameOpacity,
          transform: `translateY(${nameY}px)`,
          fontFamily: "'Clash Display', 'Inter', sans-serif",
          fontSize: 140,
          fontWeight: 700,
          color: theme.fg,
          textAlign: 'center',
          lineHeight: 0.92,
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
        }}
      >
        Archit Sagar
        <br />
        <span style={{ color: theme.mint, textShadow: '0 0 40px rgba(159,248,222,0.35)' }}>
          Jain.
        </span>
      </div>

      {/* Divider line */}
      <div
        style={{
          width: `${lineWidth}%`,
          maxWidth: 500,
          height: 2,
          backgroundColor: theme.mint,
          boxShadow: '0 0 12px rgba(159,248,222,0.5)',
          marginTop: 40,
          marginBottom: 30,
        }}
      />

      {/* Subtitle */}
      <div
        style={{
          opacity: subtitleOpacity,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 18,
          letterSpacing: '0.16em',
          color: theme.fgDim,
          textAlign: 'center',
          maxWidth: 700,
          lineHeight: 1.6,
        }}
      >
        STRATEGY & GROWTH · EX-PwC · FOUNDER, CAIRROS
      </div>

      {/* Rating badge */}
      <div
        style={{
          opacity: tagOpacity,
          marginTop: 36,
          border: `1px solid ${theme.up}`,
          padding: '8px 24px',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 14,
          letterSpacing: '0.16em',
          color: theme.up,
        }}
      >
        ▲ STRONG BUY
      </div>
    </AbsoluteFill>
  );
};
