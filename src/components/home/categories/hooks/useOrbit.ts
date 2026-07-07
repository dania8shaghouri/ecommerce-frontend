import { useEffect, useState } from "react";

const RADIUS_X = 420;
const RADIUS_Y = 120;

export interface OrbitPosition {
  x: number;
  y: number;
  scale: number;
  zIndex: number;
  opacity: number;
}

export const useOrbit = (count: number) => {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    let frame = 0;

    const animate = () => {
      setAngle((prev) => prev + 0.0035);
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, []);

  const positions: OrbitPosition[] = [];

  for (let i = 0; i < count; i++) {
    const a = angle + (i * Math.PI * 2) / count;

    const x = Math.cos(a) * RADIUS_X;

    const y = Math.sin(a) * RADIUS_Y;

    const depth = (Math.sin(a) + 1) / 2;

    positions.push({
      x,
      y,
      scale: 0.72 + depth * 0.28,
      opacity: 0.45 + depth * 0.55,
      zIndex: Math.round(depth * 100),
    });
  }

  return positions;
};
