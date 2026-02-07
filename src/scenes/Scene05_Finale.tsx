import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import FinaleStage, { type FinaleStageRef } from "@/stages/FinaleStage";
import FadeContent from "@/components/FadeContent";
import hyperspaceVideo from "@/assets/videos/hyperspace.mp4";

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export default function Scene05Finale() {
  const [step, setStep] = useState<Step>(0);
  const [brightness, setBrightness] = useState(1);
  const [contrast, setContrast] = useState(1);
  const stageRef = useRef<FinaleStageRef>(null);

  /* ======================================================
     STEP TIMELINE (Synced with 18s video)
     0s  -> step 0, text 1 "Will there be more?" (fades in at 1s)
     4s  -> text 1 fades out
     6s  -> step 1, text 2 "That's what I'm seeking..."
     10s -> text 2 fades out
     12s -> step 2, text 3 "New days..." (instant)
     14s -> step 3, text 4 "New moments..." (instant)
     16s -> step 4, text 5 "New memories..." (instant, fades out in 2s)
     18s -> step 5, text 6 "With you." + brightness transition starts
     23s -> step 6, text 6 fades out
     25s -> step 7, final text "Happy 20th anniversary, Zahira"
  ====================================================== */
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => setStep(1), 15000));   // text 2 at 6s
    timers.push(setTimeout(() => setStep(2), 34000));  // text 3 at 12s
    timers.push(setTimeout(() => setStep(3), 36000));  // text 4 at 14s
    timers.push(setTimeout(() => setStep(4), 38000));  // text 5 at 16s
    timers.push(setTimeout(() => setStep(5), 40000));  // text 6 + white transition at 18s
    timers.push(setTimeout(() => setStep(6), 42000));  // fade out text 6 at 23s
    timers.push(setTimeout(() => setStep(7), 50000));  // final text at 25s

    return () => timers.forEach(clearTimeout);
  }, []);

  /* ======================================================
     WHITE TRANSITION (starts at 18s with "With you.")
  ====================================================== */
  useEffect(() => {
    if (step !== 5) return;

    const duration = 2000; // 2 seconds transition
    const startTime = performance.now();
    const startBrightness = 1;
    const startContrast = 1;
    const endBrightness = 5;
    const endContrast = 3;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const newBrightness = startBrightness + (endBrightness - startBrightness) * progress;
      const newContrast = startContrast + (endContrast - startContrast) * progress;

      setBrightness(newBrightness);
      setContrast(newContrast);
      stageRef.current?.setBrightness(newBrightness);
      stageRef.current?.setContrast(newContrast);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [step]);

  return (
    <motion.div className="w-full h-full relative bg-black">
      <FinaleStage
        ref={stageRef}
        videoSrc={hyperspaceVideo}
        brightness={brightness}
        contrast={contrast}
      >
        {/* ===== STEP 0 — TEXT 1 (1s-5s) ===== */}
        {step === 0 && (
          <FadeContent
            blur
            duration={1000}
            delay={1000}
            disappearAfter={3000}
            disappearDuration={1000}
            className="absolute inset-0 flex items-center justify-center"
          >
            <p
              className="text-5xl font-bold text-white tracking-wide"
              style={{
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.9), 0 8px 16px rgba(0, 0, 0, 0.7), 0 2px 4px rgba(0, 0, 0, 1)'
              }}
            >
              Will there be more?
            </p>
          </FadeContent>
        )}

        {/* ===== STEP 1 — TEXT 2 (6s-11s) ===== */}
        {step === 1 && (
          <FadeContent
            blur
            duration={1000}
            disappearAfter={4000}
            disappearDuration={1000}
            className="absolute inset-0 flex items-center justify-center"
          >
            <p
              className="text-5xl font-bold text-white tracking-wide"
              style={{
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.9), 0 8px 16px rgba(0, 0, 0, 0.7), 0 2px 4px rgba(0, 0, 0, 1)'
              }}
            >
              That's what I'm seeking...
            </p>
          </FadeContent>
        )}

        {/* ===== STEP 2 — TEXT 3 (12s-14s) ===== */}
        {step === 2 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p
              className="text-5xl font-bold text-white tracking-wide"
              style={{
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.9), 0 8px 16px rgba(0, 0, 0, 0.7), 0 2px 4px rgba(0, 0, 0, 1)'
              }}
            >
              New days...
            </p>
          </div>
        )}

        {/* ===== STEP 3 — TEXT 4 (14s-16s) ===== */}
        {step === 3 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p
              className="text-5xl font-bold text-white tracking-wide"
              style={{
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.9), 0 8px 16px rgba(0, 0, 0, 0.7), 0 2px 4px rgba(0, 0, 0, 1)'
              }}
            >
              New moments...
            </p>
          </div>
        )}

        {/* ===== STEP 4 — TEXT 5 (16s-18s) ===== */}
        {step === 4 && (
          <FadeContent
            blur={false}
            duration={0}
            disappearAfter={0}
            disappearDuration={2000}
            className="absolute inset-0 flex items-center justify-center"
          >
            <p
              className="text-5xl font-bold text-white tracking-wide"
              style={{
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.9), 0 8px 16px rgba(0, 0, 0, 0.7), 0 2px 4px rgba(0, 0, 0, 1)'
              }}
            >
              New memories...
            </p>
          </FadeContent>
        )}

        {/* ===== STEP 5 — TEXT 6 (18s-26s) with white->black transition ===== */}
        {step >= 5 && step < 7 && (
          <FadeContent
            blur
            duration={2000}
            disappearAfter={5000}
            disappearDuration={3000}
            className="absolute inset-0 flex items-center justify-center"
          >
            <p
              className="text-6xl font-bold tracking-wide transition-colors duration-2000"
              style={{
                color: step >= 5 ? '#000000' : '#ffffff',
                textShadow: step >= 5 
                  ? '0 4px 8px rgba(255, 255, 255, 0.5)'
                  : '0 4px 8px rgba(0, 0, 0, 0.9), 0 8px 16px rgba(0, 0, 0, 0.7), 0 2px 4px rgba(0, 0, 0, 1)'
              }}
            >
              With you.
            </p>
          </FadeContent>
        )}
      </FinaleStage>

      {/* ===== WHITE OVERLAY (appears at step 5 for white screen effect) ===== */}
      {step >= 5 && (
        <div 
          className="absolute inset-0 bg-white pointer-events-none transition-opacity duration-2000"
          style={{
            opacity: step >= 5 ? (brightness - 1) / 4 : 0,
          }}
        />
      )}

      {/* ===== STEP 7 — FINAL TEXT (at 25s, as overlay above everything) ===== */}
      {step === 7 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
          <FadeContent
            blur
            duration={2000}
            className="w-full h-full flex items-center justify-center"
          >
            <p
              className="text-6xl font-serif text-black tracking-wide"
              style={{
                fontFamily: "'Playfair Display', 'Georgia', serif",
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
              }}
            >
              Happy 20th anniversary, Zahira
            </p>
          </FadeContent>
        </div>
      )}
    </motion.div>
  );
}