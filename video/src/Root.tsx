import "./index.css";
import { Composition } from "remotion";
import { LaunchVideo } from "./LaunchVideo";

const FPS = 30;

// Total: 3 + 4.5 + 5 + 5.5 + 4.5 + 3.5 = 26s minus 5 transitions of 15 frames each
// = 26*30 - 5*15 = 780 - 75 = 705 frames ≈ 23.5s
const TOTAL_FRAMES = 705;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="LaunchVideo"
        component={LaunchVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
