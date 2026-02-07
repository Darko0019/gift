import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HyperspeedStage from "@/stages/HyperspeedStage";

type Step = 0 | 1 | 2;

export default function Scene02Paths({
  onFinished,
}: {
  onFinished: () => void;
}) {
  const [step, setStep] = useState<Step>(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => setStep(1), 3000)); // first text
    timers.push(setTimeout(() => setStep(2), 7000)); // second text
    timers.push(setTimeout(() => onFinished(), 12000)); // scene end

    return () => timers.forEach(clearTimeout);
  }, [onFinished]);

  return (
    <motion.div
      className="w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <HyperspeedStage>
        {step === 1 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.p
              className="text-4xl font-medium tracking-wide text-white text-shadow-neutral-500 mb-100"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.95, 1.05, 1.15],
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
              }}
            >
              Once upon a time…
            </motion.p>
          </div>
        )}

        {/* Second text */}
        {step === 2 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.p
              className="text-4xl font-medium tracking-wide text-white text-shadow-neutral-500 mb-100"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.95, 1.05, 1.15],
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
              }}
            >
              Two paths crossed each other.
            </motion.p>
          </div>
        )}
      </HyperspeedStage>
    </motion.div>
  );
}
