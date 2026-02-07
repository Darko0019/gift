import Hyperspeed from "@/components/Hyperspeed";
import { hyperspeedPresets } from "@/components/HyperSpeedPresets";
import { motion } from "framer-motion";

export default function HyperspeedStage({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#060010]">
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <Hyperspeed effectOptions={hyperspeedPresets.one as any} />
        </motion.div>
      </div>

      <div className="absolute inset-0 z-10">{children}</div>
    </div>
  );
}
