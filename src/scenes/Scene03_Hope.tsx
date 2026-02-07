import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import FlameStage from "@/stages/FlameStage";
import Fireball from "@/components/Fireball";
import FadeContent from "@/components/FadeContent";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

export default function Scene03Hope({
  onFinished,
}: {
  onFinished: () => void;
}) {
  const [showFireball, setShowFireball] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => setShowFireball(true), 15000));
    timers.push(setTimeout(() => onFinished(), 17000));

    return () => timers.forEach(clearTimeout);
  }, [onFinished]);

  return (
    <motion.div
      className="w-full h-full relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <FlameStage>
        {/* ===== TEXT 1 (appears at 3s, disappears) ===== */}
        <FadeContent
          delay={3000}
          duration={2}
          disappearAfter={3}
          disappearDuration={2}
          blur
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-4xl font-bold text-white tracking-wide whitespace-nowrap">
              By one's act...
            </p>
          </div>
        </FadeContent>

        {/* ===== TEXT 2 (appears at 12s, NEVER disappears) ===== */}
        <FadeContent delay={12000} duration={2} blur>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-4xl font-bold text-white tracking-wide whitespace-nowrap">
              ...another's hope ignites
            </p>
          </div>
        </FadeContent>

        {/* ===== FIREBALL (mounted immediately, revealed at 15s) ===== */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <FadeContent delay={15000} duration={2} blur className="w-full h-full">
            <Canvas
              className="relative w-full h-full"
              camera={{ position: [0, 0, 6], fov: 50 }}
            >
              <ambientLight intensity={0.8} />
              <directionalLight position={[3, 3, 3]} intensity={2} />

              {/* CENTERED FIREBALL */}
              <group scale={showFireball ? 1 : 0} position={[0, 0, 0]}>
                <Fireball />
              </group>

              <EffectComposer resolutionScale={0.5}>
                <Bloom
                  intensity={0.9}
                  luminanceThreshold={0.4}
                  luminanceSmoothing={0.85}
                  mipmapBlur
                />
              </EffectComposer>
            </Canvas>
          </FadeContent>
        </div>
      </FlameStage>
    </motion.div>
  );
}
