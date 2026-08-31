import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from 'remotion';
import { theme } from '../theme';

export const EndcardScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 0.8 * fps, durationInFrames],
    [1, 0],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  const opacity = Math.min(fadeIn, fadeOut);

  const tickerScale = interpolate(frame, [0, 0.6 * fps], [0.9, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const lineWidth = interpolate(frame, [0.3 * fps, 1 * fps], [0, 200], {
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
        opacity,
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(159,248,222,0.1) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      {/* Ticker logo */}
      <div
        style={{
          transform: `scale(${tickerScale})`,
          fontFamily: "'Clash Display', 'Inter', sans-serif",
          fontSize: 120,
          fontWeight: 700,
          color: theme.fg,
          letterSpacing: '-0.02em',
        }}
      >
        ARCHT<span style={{ color: theme.mint }}>.</span>
      </div>

      {/* Divider */}
      <div
        style={{
          width: lineWidth,
          height: 2,
          backgroundColor: theme.mint,
          boxShadow: '0 0 12px rgba(159,248,222,0.5)',
          marginTop: 30,
          marginBottom: 30,
        }}
      />

      {/* Tagline */}
      <div
        style={{
          opacity: interpolate(frame, [0.5 * fps, 1 * fps], [0, 1], {
            extrapolateRight: 'clamp',
            extrapolateLeft: 'clamp',
          }),
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 16,
          letterSpacing: '0.2em',
          color: theme.fgDim,
          textAlign: 'center',
        }}
      >
        HUMAN CAPITAL TERMINAL · EST. 2018
      </div>

      {/* Contact */}
      <div
        style={{
          opacity: interpolate(frame, [0.8 * fps, 1.3 * fps], [0, 1], {
            extrapolateRight: 'clamp',
            extrapolateLeft: 'clamp',
          }),
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 14,
          letterSpacing: '0.14em',
          color: theme.fgFaint,
          marginTop: 20,
        }}
      >
        architsagarjain@gmail.com · linkedin.com/in/archit-sagar-jain
      </div>
    </AbsoluteFill>
  );
};
