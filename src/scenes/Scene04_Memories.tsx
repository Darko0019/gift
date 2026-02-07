import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MemoryStage from "@/stages/MemoryStage";
import FadeContent from "@/components/FadeContent";

type Step = 0 | 1 | 2;

export default function Scene04Moments({
  onFinished,
}: {
  onFinished: () => void;
}) {
  const [step, setStep] = useState<Step>(0);
  const [showGallery, setShowGallery] = useState(false);
  const [grayscale, setGrayscale] = useState(true);

  /* ======================================================
     STEP TIMELINE
  ====================================================== */
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => setShowGallery(true), 2000)); // fade-in gallery
    timers.push(setTimeout(() => setStep(1), 6000));          // text 2
    timers.push(setTimeout(() => setGrayscale(false), 10000)); // color fade
    timers.push(setTimeout(() => setStep(2), 17000));         // end

    return () => timers.forEach(clearTimeout);
  }, []);

  /* ======================================================
     SCENE EXIT
  ====================================================== */
  useEffect(() => {
    if (step === 2) onFinished();
  }, [step, onFinished]);

  return (
    <motion.div className="w-full h-full relative bg-black">
      <MemoryStage
        autoRotateSpeed={6}
        grayscale={grayscale}
        showGallery={showGallery}
      >
        {/* ===== STEP 0 — TEXT 1 ===== */}
        {step === 0 && (
          <FadeContent
            blur
            duration={0}
            disappearAfter={5000}
            disappearDuration={1000}
            className="absolute inset-0 flex items-center justify-center"
          >
            <p 
              className="text-4xl font-bold text-white tracking-wide"
              style={{
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.9), 0 8px 16px rgba(0, 0, 0, 0.7), 0 2px 4px rgba(0, 0, 0, 1)'
              }}
            >
              Creating moments...
            </p>
          </FadeContent>
        )}

        {/* ===== STEP 1 — TEXT 2 ===== */}
        {step === 1 && (
          <FadeContent
            blur
            duration={1000}
            disappearAfter={2000}
            disappearDuration={2000}
            className="absolute inset-0 flex items-center justify-center"
          >
            <p 
              className="text-4xl font-bold text-white tracking-wide"
              style={{
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.9), 0 8px 16px rgba(0, 0, 0, 0.7), 0 2px 4px rgba(0, 0, 0, 1)'
              }}
            >
              And moments become memories!
            </p>
          </FadeContent>
        )}
      </MemoryStage>
    </motion.div>
  );
}