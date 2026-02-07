import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BlackRaysStage from "../stages/BlackRaysStage";
import FadeContent from "../components/FadeContent";

type Step = 0 | 1 | 2 | 3 | 4;

export default function Scene01Intro({
  onFinished,
}: {
  onFinished?: () => void;
}) {
  const [step, setStep] = useState<Step>(0);
  const [fadeOutScene, setFadeOutScene] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => setStep(1), 2000));
    timers.push(setTimeout(() => setStep(2), 5000));
    timers.push(setTimeout(() => setStep(3), 20000));
    timers.push(setTimeout(() => setStep(4), 31000));

    // Scene exit
    timers.push(
      setTimeout(() => {
        setFadeOutScene(true);

        // notify SceneManager AFTER fade-out
        setTimeout(() => {
          onFinished?.();
        }, 2000); // matches transition duration
      }, 38500),
    );

    return () => timers.forEach(clearTimeout);
  }, [onFinished]);

  return (
    <motion.div
      className="w-full h-full"
      animate={{ opacity: fadeOutScene ? 0 : 1 }}
      transition={{ duration: 2 }}
    >
      <BlackRaysStage>
        {/* Abdelmalek */}
        {step === 2 && (
          <FadeContent
            blur
            duration={3}
            disappearAfter={5}
            disappearDuration={3}
          >
            <p className="font-mono text-xl tracking-widest">
              Abdelmalek G. presents
            </p>
          </FadeContent>
        )}

        {/* A special gift */}
        {step === 3 && (
          <FadeContent
            blur
            duration={3}
            disappearAfter={5}
            disappearDuration={3}
          >
            <p className="text-4xl font-light scale-105">A special gift...</p>
          </FadeContent>
        )}

        {/* for a special person */}
        {step === 4 && (
          <FadeContent
            blur
            duration={3}
            disappearAfter={5}
            disappearDuration={3}
          >
            <p className="text-4xl font-light scale-110">
              ... for a special person
            </p>
          </FadeContent>
        )}
      </BlackRaysStage>
    </motion.div>
  );
}
