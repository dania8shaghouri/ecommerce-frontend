import type { Product } from "../../../types/Product";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div>
      <span
        className="
          text-xs
          font-semibold
          uppercase
          tracking-wider
          text-primary
        "
      >
        {product.category}
      </span>

      <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-gray-900">
        {product.title}
      </h3>

      <p className="mt-3 text-sm text-gray-500">{product.brand}</p>
    </div>
  );
};

export default ProductInfo;
