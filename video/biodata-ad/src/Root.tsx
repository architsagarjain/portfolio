import React from "react";
import { Composition, Folder } from "remotion";
import { BiodataAd } from "./BiodataAd";
import { SceneHook } from "./scenes/SceneHook";
import { SceneBefore } from "./scenes/SceneBefore";
import { SceneReveal } from "./scenes/SceneReveal";
import { SceneAiFill } from "./scenes/SceneAiFill";
import { SceneTemplates } from "./scenes/SceneTemplates";
import { SceneSpeedRun } from "./scenes/SceneSpeedRun";
import { SceneOutput } from "./scenes/SceneOutput";
import { SceneEndcard } from "./scenes/SceneEndcard";

const FPS = 30;
const W = 1080;
const H = 1920;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="BiodataAd"
        component={BiodataAd}
        durationInFrames={900}
        fps={FPS}
        width={W}
        height={H}
      />
      <Folder name="Scenes">
        <Composition
          id="Scene-Hook"
          component={SceneHook}
          durationInFrames={75}
          fps={FPS}
          width={W}
          height={H}
        />
        <Composition
          id="Scene-Before"
          component={SceneBefore}
          durationInFrames={60}
          fps={FPS}
          width={W}
          height={H}
        />
        <Composition
          id="Scene-Reveal"
          component={SceneReveal}
          durationInFrames={60}
          fps={FPS}
          width={W}
          height={H}
        />
        <Composition
          id="Scene-AiFill"
          component={SceneAiFill}
          durationInFrames={135}
          fps={FPS}
          width={W}
          height={H}
        />
        <Composition
          id="Scene-Templates"
          component={SceneTemplates}
          durationInFrames={135}
          fps={FPS}
          width={W}
          height={H}
        />
        <Composition
          id="Scene-SpeedRun"
          component={SceneSpeedRun}
          durationInFrames={314}
          fps={FPS}
          width={W}
          height={H}
        />
        <Composition
          id="Scene-Output"
          component={SceneOutput}
          durationInFrames={113}
          fps={FPS}
          width={W}
          height={H}
        />
        <Composition
          id="Scene-Endcard"
          component={SceneEndcard}
          durationInFrames={113}
          fps={FPS}
          width={W}
          height={H}
        />
      </Folder>
    </>
  );
};
