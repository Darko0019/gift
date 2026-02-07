import { useRef, useState, useEffect } from "react";
import Scene00Start from "@/scenes/Scene00_Start";
import Scene01Intro from "@/scenes/Scene01_Intro";
import Scene02Paths from "@/scenes/Scene02_Paths";
import Scene03Hope from "@/scenes/Scene03_Hope";
import Scene04Moments from "@/scenes/Scene04_Memories";
import Scene05Finale from "@/scenes/Scene05_Finale";
import lastDive from "@/assets/music/hks-last-dive.mp3";
import hyperspaceVideo from "@/assets/videos/hyperspace.mp4";

// Preload components by importing them
import "@/components/FadeContent";
import "@/components/DomeGallery";
import "@/stages/MemoryStage";
import "@/stages/FinaleStage";
import "@/components/Hyperspeed";

type SceneID = "scene00" | "black" | "scene01" | "scene02" | "scene03" | "scene04" | "scene05";

export default function SceneManager() {
  const [scene, setScene] = useState<SceneID>("scene00");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoPreloadRef = useRef<HTMLVideoElement | null>(null);

  // Preload video
  useEffect(() => {
    if (videoPreloadRef.current) {
      videoPreloadRef.current.load();
    }
  }, []);

  const startExperience = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setTimeout(() => audioRef.current?.play(), 2000);
    }

    setScene("black");

    setTimeout(() => {
      setScene("scene01");
    }, 2000);
  };

  const goToBlackThenScene03 = () => {
    setScene("black");

    setTimeout(() => {
      setScene("scene03");
    }, 1000);
  };

  const goToBlackThenScene04 = () => {
    setScene("black");
    setTimeout(() => {
      setScene("scene04");
    }, 1000);
  };

  const goToBlackThenScene05 = () => {
    setScene("black");
    setTimeout(() => {
      setScene("scene05");
    }, 1000);
  };

  return (
    <>
      {/* Preload assets */}
      <audio ref={audioRef} src={lastDive} preload="auto" />
      <video ref={videoPreloadRef} src={hyperspaceVideo} preload="auto" style={{ display: 'none' }} />

      {scene === "scene00" && <Scene00Start onContinue={startExperience} />}

      {scene === "scene01" && (
        <Scene01Intro onFinished={() => setScene("scene02")} />
      )}

      {scene === "scene02" && (
        <Scene02Paths onFinished={goToBlackThenScene03} />
      )}

      {scene === "scene03" && (
        <Scene03Hope onFinished={goToBlackThenScene04} />
      )}

      {scene === "scene04" && (
        <Scene04Moments onFinished={goToBlackThenScene05} />
      )}

      {scene === "scene05" && <Scene05Finale />}

      {scene === "black" && <div className="w-full h-full bg-black" />}
    </>
  );
}