import { Link } from "react-router-dom";

import type { Product } from "../../../types/Product";

import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import ProductPrice from "./ProductPrice";
import ProductActions from "./ProductActions";
import ProductRating from "./ProductRating";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <article
      className="
        group
        overflow-hidden
        rounded-3xl
        border
        border-gray-200
        bg-white
        transition-all
        duration-300
        hover:border-primary/20
        hover:shadow-2xl
      "
    >
      <Link to={`/product/${product._id}`}>
        <ProductImage product={product} />
      </Link>

      <div className="space-y-4 p-5">
        <Link to={`/product/${product._id}`}>
          <ProductInfo product={product} />
        </Link>

        <ProductRating
          rating={product.rating}
          reviewCount={product.reviewCount}
        />

        <ProductPrice price={product.price} />
      </div>

      <div className="px-5 pb-5">
        <ProductActions product={product} />
      </div>
    </article>
  );
};

export default ProductCard;
