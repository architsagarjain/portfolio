import React, { useEffect, useState } from 'react';
import { AbsoluteFill, staticFile, delayRender, continueRender } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { Audio } from '@remotion/media';
import { loadFont } from '@remotion/fonts';

import { BootScene } from './scenes/BootScene';
import { NameReveal } from './scenes/NameReveal';
import { StatsScene } from './scenes/StatsScene';
import { PositionsScene } from './scenes/PositionsScene';
import { CTAScene } from './scenes/CTAScene';
import { EndcardScene } from './scenes/EndcardScene';

const FPS = 30;
const TRANSITION_FRAMES = 15;

export const LaunchVideo: React.FC = () => {
  const [handle] = useState(() => delayRender('Loading fonts'));

  useEffect(() => {
    Promise.all([
      loadFont({
        family: 'Clash Display',
        url: staticFile('fonts/ClashDisplay-500.woff2'),
        weight: '500',
      }),
      loadFont({
        family: 'Clash Display',
        url: staticFile('fonts/ClashDisplay-600.woff2'),
        weight: '600',
      }),
      loadFont({
        family: 'Clash Display',
        url: staticFile('fonts/ClashDisplay-700.woff2'),
        weight: '700',
      }),
    ]).then(() => continueRender(handle));
  }, [handle]);
  return (
    <AbsoluteFill style={{ backgroundColor: '#07090C' }}>
      {/* Background music with fade in/out */}
      <Audio
        src={staticFile('music/ambient.mp3')}
        volume={(f) => {
          const fadeInEnd = 1 * FPS;
          const totalFrames = 25 * FPS;
          const fadeOutStart = totalFrames - 2 * FPS;
          if (f < fadeInEnd) return f / fadeInEnd * 0.35;
          if (f > fadeOutStart) return ((totalFrames - f) / (2 * FPS)) * 0.35;
          return 0.35;
        }}
        loop
      />

      <TransitionSeries>
        {/* Scene 1: Boot — 3s */}
        <TransitionSeries.Sequence durationInFrames={3 * FPS} name="Boot">
          <BootScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scene 2: Name Reveal — 4.5s */}
        <TransitionSeries.Sequence durationInFrames={Math.round(4.5 * FPS)} name="NameReveal">
          <NameReveal />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-right' })}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scene 3: Stats — 5s */}
        <TransitionSeries.Sequence durationInFrames={5 * FPS} name="Stats">
          <StatsScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scene 4: Positions — 5.5s */}
        <TransitionSeries.Sequence durationInFrames={Math.round(5.5 * FPS)} name="Positions">
          <PositionsScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-bottom' })}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scene 5: CTA — 4.5s */}
        <TransitionSeries.Sequence durationInFrames={Math.round(4.5 * FPS)} name="CTA">
          <CTAScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scene 6: Endcard — 3.5s */}
        <TransitionSeries.Sequence durationInFrames={Math.round(3.5 * FPS)} name="Endcard">
          <EndcardScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
