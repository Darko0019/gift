import type { ReactNode } from "react";
import { motion } from "framer-motion";
import LightRays from "../components/LightRays";

type Props = {
  children: ReactNode;
};

export default function BlackRaysStage({ children }: Props) {
  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={5}
          followMouse={false}
          noiseAmount={0}
          distortion={0}
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </motion.div>

      <div className="absolute inset-0 z-10 flex items-center justify-center text-white">
        {children}
      </div>
    </div>
  );
}
