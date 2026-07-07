interface Props {
  stock: number;
}

const StockBadge = ({ stock }: Props) => {
  return (
    <span
      className="
        absolute
        bottom-4
        z-20
        left-4
        rounded-full
        bg-green-100
        px-3
        py-1
        text-xs
        font-semibold
        text-green-700
      "
    >
      {stock > 0 ? "In Stock" : "Out of Stock"}
    </span>
  );
};

export default StockBadge;
