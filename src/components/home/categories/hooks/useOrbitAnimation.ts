// Animasyon mantığı
import { useEffect } from "react";

interface BooleanRef {
  current: boolean;
}

interface NumberRef {
  current: number;
}

interface UseOrbitAnimationProps {
  setRotation: React.Dispatch<React.SetStateAction<number>>;
  autoRotate: BooleanRef;
  isDragging: BooleanRef;
  velocity: NumberRef;
}

const useOrbitAnimation = ({
  setRotation,
  autoRotate,
  isDragging,
  velocity,
}: UseOrbitAnimationProps) => {
  useEffect(() => {
    let frame = 0;

    const animate = () => {
      setRotation((prev) => {
        let next = prev;

        if (autoRotate.current) {
          next += 0.0022;
        }

        if (!isDragging.current) {
          next += velocity.current;

          velocity.current *= 0.95;

          if (Math.abs(velocity.current) < 0.00005) {
            velocity.current = 0;
          }
        }

        return next;
      });

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [setRotation, autoRotate, isDragging, velocity]);
};

export default useOrbitAnimation;
