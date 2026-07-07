// Mouse ve touch etkileşimleri
import { useRef } from "react";

interface BooleanRef {
  current: boolean;
}

interface NumberRef {
  current: number;
}

interface UseOrbitDragProps {
  setRotation: React.Dispatch<React.SetStateAction<number>>;
  autoRotateRef: BooleanRef;
  isDraggingRef: BooleanRef;
  velocityRef: NumberRef;
}

const useOrbitDrag = ({
  setRotation,
  autoRotateRef,
  isDraggingRef,
  velocityRef,
}: UseOrbitDragProps) => {
  const lastClientX = useRef(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    autoRotateRef.current = false;
    lastClientX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    const delta = e.clientX - lastClientX.current;

    setRotation((prev) => prev + delta * 0.006);

    velocityRef.current = delta * 0.00012;

    lastClientX.current = e.clientX;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;

    setTimeout(() => {
      autoRotateRef.current = true;
    }, 2000);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    autoRotateRef.current = false;
    lastClientX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    const delta = e.touches[0].clientX - lastClientX.current;

    setRotation((prev) => prev + delta * 0.006);

    velocityRef.current = delta * 0.00012;

    lastClientX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;

    setTimeout(() => {
      autoRotateRef.current = true;
    }, 2000);
  };

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};

export default useOrbitDrag;
