import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from 'remotion';
import { theme } from '../theme';

const bootLines = [
  'ARCHT HUMAN CAPITAL TERMINAL v2.0',
  '════════════════════════════════════',
  'INITIALIZING NSE:ARCHT...',
  'LOADING POSITION HISTORY...',
  'CALIBRATING GROWTH METRICS...',
  'CONNECTION ESTABLISHED.',
  '',
  '> READY.',
];

export const BootScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const visibleLines = Math.floor(
    interpolate(frame, [0, 2 * fps], [0, bootLines.length], {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
    })
  );

  const cursorOpacity = interpolate(
    frame % Math.round(fps * 0.6),
    [0, Math.round(fps * 0.3)],
    [1, 0],
    { extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        padding: '100px 140px',
        fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
        justifyContent: 'flex-start',
      }}
    >
      {/* Scanlines overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'repeating-linear-gradient(0deg, transparent 0 2px, rgba(159,248,222,0.03) 2px 3px)',
          pointerEvents: 'none',
        }}
      />

      {bootLines.slice(0, visibleLines).map((line, i) => {
        const lineDelay = (i / bootLines.length) * 2 * fps;
        const lineOpacity = interpolate(
          frame,
          [lineDelay, lineDelay + 4],
          [0, 1],
          { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
        );
        const isReady = line.includes('READY');
        return (
          <div
            key={i}
            style={{
              opacity: lineOpacity,
              fontSize: 22,
              letterSpacing: '0.08em',
              color: isReady ? theme.mint : theme.fgDim,
              lineHeight: 2,
              textShadow: isReady ? '0 0 20px rgba(159,248,222,0.4)' : 'none',
            }}
          >
            {line}
            {i === visibleLines - 1 && i < bootLines.length - 1 && (
              <span
                style={{
                  display: 'inline-block',
                  width: 12,
                  height: 22,
                  backgroundColor: theme.mint,
                  marginLeft: 4,
                  opacity: cursorOpacity,
                  verticalAlign: 'middle',
                }}
              />
            )}
          </div>
        );
      })}

      {/* Bottom progress bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          left: 140,
          right: 140,
          height: 2,
          backgroundColor: theme.line,
        }}
      >
        <div
          style={{
            height: '100%',
            backgroundColor: theme.mint,
            boxShadow: '0 0 12px rgba(159,248,222,0.6)',
            width: `${interpolate(frame, [0, 2.5 * fps], [0, 100], {
              extrapolateRight: 'clamp',
              extrapolateLeft: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            })}%`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
