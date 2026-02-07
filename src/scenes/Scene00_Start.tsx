import { useEffect, useState } from "react";
import FadeContent from "@/components/FadeContent";
import PressToContinue from "@/components/PressToContinue";

type Props = {
  onContinue: () => void;
};

export default function Scene00Start({ onContinue }: Props) {
  const [step, setStep] = useState<0 | 1>(0);

  useEffect(() => {
    const t = setTimeout(() => setStep(1), 9000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="w-full h-full flex items-center justify-center bg-black text-white cursor-pointer"
      onClick={() => step === 1 && onContinue()}
    >
      {step === 0 && (
        <FadeContent
          delay={1}
          duration={2000}
          disappearAfter={3000}
          disappearDuration={2000}
        >
          <p className="text-lg tracking-wide">
            Wear headphones for better experience{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Layer_1"
              data-name="Layer 1"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 ml-2 mb-1 fill-current"
            >
              <path d="M21.225,12.729c-.031-7.648-2.965-11.212-9.225-11.212S2.798,5.091,2.775,12.763c-1.015,.787-1.775,2.093-1.775,4.265,0,4.89,3.638,5.456,6.375,5.456,.431,0,.813-.276,.949-.685,1.02-3.076,1.02-6.464,0-9.541-.136-.409-.518-.685-.949-.685-.377,0-.938,0-1.573,.075,.311-6.557,3.221-7.132,6.198-7.132s5.889,.575,6.199,7.138c-.536-.062-1.07-.081-1.574-.081-.431,0-.813,.276-.949,.685-1.021,3.076-1.021,6.464,0,9.541,.136,.409,.519,.685,.949,.685,1.577,0,6.375,0,6.375-5.456,0-2.185-.727-3.506-1.775-4.3Z" />
            </svg>
          </p>
        </FadeContent>
      )}

      {step === 1 && <PressToContinue onFinished={onContinue} />}
    </div>
  );
}
