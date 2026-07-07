import CategoryCard from "./CategoryCard";
import type { Category } from "../../../types/Category";

interface OrbitItemProps {
  category: Category;

  x: number;
  y: number;

  scale: number;
  opacity: number;
  zIndex: number;
}

const OrbitItem = ({
  category,
  x,
  y,
  scale,
  opacity,
  zIndex,
}: OrbitItemProps) => {
  return (
    <div
      className="absolute will-change-transform"
      style={{
        left: "50%",
        top: "50%",

        transform: `
translate(-50%,-50%)
translate3d(${x}px,${y}px,0)
scale(${scale})
`,

        opacity,
        zIndex,
      }}
    >
      <CategoryCard category={category} />
    </div>
  );
};

export default OrbitItem;
