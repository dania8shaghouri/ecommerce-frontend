interface Props {
  category: string;
}

const CategoryBadge = ({ category }: Props) => {
  return (
    <span
      className="
        absolute
        left-4
        top-4
        z-20
        rounded-full
        bg-primary
        px-3
        py-1
        text-xs
        font-semibold
        text-white
      "
    >
      {category}
    </span>
  );
};

export default CategoryBadge;
