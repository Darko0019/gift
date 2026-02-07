import DomeGallery from "@/components/DomeGallery";
import FadeContent from "@/components/FadeContent";

export default function MemoryStage({
  children,
  autoRotateSpeed = 0.6,
  grayscale = true,
  scale = 1,
}: {
  children: React.ReactNode;
  autoRotateSpeed?: number;
  grayscale?: boolean;
  scale?: number;
  showGallery?: boolean;
}) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
      {/* ===== BACKGROUND GALLERY (ALWAYS MOUNTED) ===== */}
      <FadeContent
        duration={2}
        blur
        initialOpacity={0}
        delay={2}
        className="absolute inset-0 flex items-center justify-center"
      >
        {/* ===== ONLY THE GALLERY IS SCALED ===== */}
        <div
          className={`transition-all duration-2000 w-full h-full ${
            grayscale ? "grayscale" : ""
          }`}
          style={{
            transform: `scale(${scale})`,
          }}
        >
          <DomeGallery
            autoRotate
            autoRotateSpeed={autoRotateSpeed}
            grayscale={false}
          />
        </div>
      </FadeContent>

      {/* ===== OVERLAYS ===== */}
      <div className="absolute inset-0 pointer-events-none">
        {children}
      </div>
    </div>
  );
}
