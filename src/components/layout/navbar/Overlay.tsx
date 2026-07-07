import { useEffect } from "react";

type OverlayProps = {
  onClick: () => void;
};

export default function Overlay({ onClick }: OverlayProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClick();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClick]);

  return (
    <div
      onClick={onClick}
      aria-hidden="true"
      className="fixed inset-0 bg-black/70 z-40"
    />
  );
}
