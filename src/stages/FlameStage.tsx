import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function BlackRaysStage({ children }: Props) {
  return (
    <div className="fixed w-full h-full bg-black overflow-hidden">
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
