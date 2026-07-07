import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import type { Product } from "../../../types/Product";

interface ProductActionsProps {
  product: Product;
}

const ProductActions = ({ product }: ProductActionsProps) => {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => console.log(product._id)}
        className="
    flex
    h-12
    w-12
    items-center
    justify-center
    rounded-xl
    bg-primary
    text-white
    transition-all
    duration-300
    hover:bg-primaryHover
    hover:scale-105
  "
      >
        <FiShoppingCart size={20} />
      </button>

      <Link
        to={`/product/${product._id}`}
        className="
    flex-1
    rounded-xl
    border
    border-primary
    py-3
    text-center
    font-semibold
    text-primary
    transition
    hover:bg-primary
    hover:text-white
  "
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductActions;
