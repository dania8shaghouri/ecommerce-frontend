import { Link } from "react-router-dom";
import type { Product } from "../types/Product";
import { getImageUrl } from "../utils/getImageUrl";

interface Props {
  id: string;
  product: Product;
  onAddToCart: (product: Product) => void;
}

const FALLBACK_IMAGE =
  "https://shop.asus.com/media/catalog/product/4/0/40521b738bb3e28bbb9ba94bdcf7e493_5.png";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
  }).format(price);

const ProductCard = ({ product, onAddToCart }: Props) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-2xl transition duration-300 p-4 mt-2 flex flex-col">
      {/* image */}
      <div className="w-full h-48 flex items-center justify-center overflow-hidden">
        <img
          src={getImageUrl(product.image)}
          alt={product.title}
          className="h-full object-contain hover:scale-105 transition"
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMAGE;
          }}
        />
      </div>

      {/* content */}
      <div className="mt-4 flex flex-col flex-1">
        <h2 className="text-lg font-semibold text-[#111827] line-clamp-1">
          {product.title}
        </h2>

        <div className="mt-3 text-xl font-bold text-primary">
          {formatPrice(product.price)}
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <button
            onClick={() => onAddToCart(product)}
            className="w-full bg-primary text-white py-2 rounded-xl hover:bg-primaryHover transition font-medium"
          >
            Add to Cart
          </button>

          <Link
            to={`/product/${product._id}`}
            className="w-full text-center border border-primary text-primary py-2 rounded-xl hover:bg-[#e6f0ff] transition font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
