import { FiStar } from "react-icons/fi";

interface ProductRatingProps {
  rating: number;
  reviewCount: number;
}

const ProductRating = ({ rating, reviewCount }: ProductRatingProps) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <FiStar
          key={index}
          className={
            index < Math.round(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }
          size={16}
        />
      ))}

      <span className="ml-2 text-sm font-medium text-gray-700">
        {rating.toFixed(1)}
      </span>

      <span className="text-sm text-gray-500">({reviewCount})</span>
    </div>
  );
};

export default ProductRating;
