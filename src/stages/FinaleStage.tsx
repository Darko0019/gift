import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";

interface FinaleStageProps {
  videoSrc: string;
  children?: React.ReactNode;
  brightness?: number;
  contrast?: number;
  onVideoReady?: () => void;
}

export interface FinaleStageRef {
  setVideoTime: (time: number) => void;
  setBrightness: (value: number) => void;
  setContrast: (value: number) => void;
}

const FinaleStage = forwardRef<FinaleStageRef, FinaleStageProps>(
  ({ videoSrc, children, brightness = 1, contrast = 1, onVideoReady }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const brightnessRef = useRef(brightness);
    const contrastRef = useRef(contrast);

    useImperativeHandle(ref, () => ({
      setVideoTime: (time: number) => {
        if (videoRef.current) {
          videoRef.current.currentTime = time;
        }
      },
      setBrightness: (value: number) => {
        brightnessRef.current = value;
        updateFilter();
      },
      setContrast: (value: number) => {
        contrastRef.current = value;
        updateFilter();
      },
    }));

    const updateFilter = () => {
      if (videoRef.current) {
        videoRef.current.style.filter = `brightness(${brightnessRef.current}) contrast(${contrastRef.current})`;
      }
    };

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const handleLoadedData = () => {
        video.currentTime = 3.5; // Start at 3 seconds
        if (onVideoReady) onVideoReady();
      };

      const handleTimeUpdate = () => {
        // Loop from 3s to 9s
        if (video.currentTime >= 11) {
          video.currentTime = 5;
        }
      };

      video.addEventListener("loadeddata", handleLoadedData);
      video.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        video.removeEventListener("loadeddata", handleLoadedData);
        video.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }, [onVideoReady]);

    useEffect(() => {
      updateFilter();
    }, [brightness, contrast]);

    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
        {/* ===== BACKGROUND VIDEO ===== */}
        <video
          ref={videoRef}
          src={videoSrc}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          autoPlay
          style={{
            filter: `brightness(${brightness}) contrast(${contrast})`,
            transition: "filter 2s ease",
          }}
        />

        {/* ===== OVERLAYS (TEXT ETC) ===== */}
        <div className="absolute inset-0 pointer-events-none">
          {children}
        </div>
      </div>
    );
  }
);

FinaleStage.displayName = "FinaleStage";

export default FinaleStage;