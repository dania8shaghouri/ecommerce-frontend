import { useEffect, useState } from "react";
import Orbit from "./Orbit";
import CategorySkeleton from "./CategorySkeleton";

const RADIUS_X = 330;
const RADIUS_Y = 95;

const TOTAL_ITEMS = 5;

const OrbitSkeleton = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let frameId: number;

    const animate = () => {
      setRotation((prev) => prev + 0.003);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="relative h-[540px] overflow-visible">
      <Orbit
        width={1150}
        height={310}
        className="
          left-1/2
          top-[380px]
          -translate-x-1/2
        "
      />

      {Array.from({ length: TOTAL_ITEMS }).map((_, index) => {
        const angle = rotation + (index * Math.PI * 2) / TOTAL_ITEMS;

        const x = Math.cos(angle) * RADIUS_X;

        const y = Math.sin(angle) * RADIUS_Y + 20;

        const depth = (Math.sin(angle) + 1) / 2;

        return (
          <div
            key={index}
            className="absolute will-change-transform"
            style={{
              left: "50%",
              top: "50%",
              transform: `
translate(-50%,-50%)
translate3d(${x}px,${y}px,0)
scale(${0.78 + depth * 0.22})
`,
              opacity: 0.55 + depth * 0.45,
              zIndex: Math.round(depth * 100),
            }}
          >
            <CategorySkeleton />
          </div>
        );
      })}
    </div>
  );
};

export default OrbitSkeleton;
