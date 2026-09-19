import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";

import { SceneHook } from "./scenes/SceneHook";
import { SceneBefore } from "./scenes/SceneBefore";
import { SceneReveal } from "./scenes/SceneReveal";
import { SceneAiFill } from "./scenes/SceneAiFill";
import { SceneTemplates } from "./scenes/SceneTemplates";
import { SceneSpeedRun } from "./scenes/SceneSpeedRun";
import { SceneOutput } from "./scenes/SceneOutput";
import { SceneEndcard } from "./scenes/SceneEndcard";

/**
 * BiodataAd — 30s · 1080×1920 · 30fps (900 frames)
 *
 * | Beat      | Scene        | Frames |
 * |-----------|--------------|--------|
 * | Hook      | crash sheet  | 0–60   |
 * | Before    | hours counter| 60–105 |
 * | Reveal    | 5 minutes    | 105–150|
 * | AI fill   | phone demo   | 150–270|
 * | Templates | 12 designs   | 270–390|
 * | Speed run | 4-step flow  | 390–690|
 * | Output    | PDF + share  | 690–795|
 * | Endcard   | CTA          | 795–900|
 *
 * Durations below are pre-transition; each 15f transition overlaps
 * the cut, keeping the total at exactly 900 frames.
 */
export const BiodataAd: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={75}>
        <SceneHook />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      <TransitionSeries.Sequence durationInFrames={60}>
        <SceneBefore />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={wipe({ direction: "from-left" })}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      <TransitionSeries.Sequence durationInFrames={60}>
        <SceneReveal />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      <TransitionSeries.Sequence durationInFrames={135}>
        <SceneAiFill />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-bottom" })}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      <TransitionSeries.Sequence durationInFrames={135}>
        <SceneTemplates />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      <TransitionSeries.Sequence durationInFrames={314}>
        <SceneSpeedRun />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      <TransitionSeries.Sequence durationInFrames={113}>
        <SceneOutput />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      <TransitionSeries.Sequence durationInFrames={113}>
        <SceneEndcard />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
