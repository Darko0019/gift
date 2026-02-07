import { motion } from "framer-motion";
import FadeContent from "./FadeContent";
import { useState, useEffect } from "react";

export default function PressToContinue({
  onFinished,
}: {
  onFinished: () => void;
}) {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (!clicked) return;

    const t = setTimeout(() => {
      onFinished();
    }, 1000);

    return () => clearTimeout(t);
  }, [clicked, onFinished]);

  return (
    <FadeContent
      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-extrabold"
      duration={1}
      disappearDuration={1}
      disappearAfter={clicked ? 0 : Infinity}
      onClick={() => setClicked(true)}
    >
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Press anywhere to continue
      </motion.div>
    </FadeContent>
  );
}
