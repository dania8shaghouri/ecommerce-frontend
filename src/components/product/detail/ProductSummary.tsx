import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";

import { useAddToCart } from "../../../hooks/useAddToCart";
import type { Product } from "../../../types/Product";

import ProductRating from "../card/ProductRating";
import ProductAvailability from "./ProductAvailability";
import QuantitySelector from "./QuantitySelector";
import DeliveryInfo from "./DeliveryInfo";

interface ProductSummaryProps {
  product: Product;
}

const ProductSummary = ({ product }: ProductSummaryProps) => {
  const { addToCart } = useAddToCart();

  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    if (quantity < product.stock) {
      setQuantity((q) => q + 1);
    }
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Category */}
      <span className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
        {product.category}
      </span>

      {/* Title */}
      <h1 className="text-4xl font-bold leading-tight text-gray-900">
        {product.title}
      </h1>

      {/* Brand */}
      <p className="mt-3 text-lg text-gray-500">
        by <span className="font-semibold">{product.brand}</span>
      </p>

      {/* Rating */}
      <div className="mt-5">
        <ProductRating
          rating={product.rating}
          reviewCount={product.reviewCount}
        />
      </div>

      {/* Price */}
      <div className="mt-7">
        <p className="text-4xl font-bold text-primary">
          {new Intl.NumberFormat("tr-TR", {
            style: "currency",
            currency: "TRY",
          }).format(product.price)}
        </p>
      </div>

      {/* Availability + SKU */}
      <div className="mt-7 flex items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <ProductAvailability stock={product.stock} />

        <p className="text-sm text-gray-500 whitespace-nowrap">
          SKU
          <span className="ml-2 font-semibold text-gray-900">
            {product._id.slice(-8).toUpperCase()}
          </span>
        </p>
      </div>

      {/* Quantity + Buttons */}
      <div className="mt-8 flex items-center gap-4">
        <QuantitySelector
          quantity={quantity}
          increase={increase}
          decrease={decrease}
        />

        <button
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
          className="
            flex
            flex-1
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-primary
            px-8
            py-4
            font-semibold
            text-white
            transition-all
            duration-300
            hover:bg-primaryHover
            hover:shadow-xl
            disabled:cursor-not-allowed
            disabled:bg-gray-300
          "
        >
          <FiShoppingCart size={20} />
          Add to Cart
        </button>

        <button
          className="
            rounded-2xl
            border
            border-primary
            px-8
            py-4
            font-semibold
            text-primary
            transition-all
            duration-300
            hover:bg-primary
            hover:text-white
          "
        >
          Buy Now
        </button>
      </div>

      {/* Delivery */}
      <DeliveryInfo />
    </div>
  );
};

export default ProductSummary;
