import type { Product } from "../../../types/Product";
import { getImageUrl } from "../../../utils/getImageUrl";

import WishlistButton from "../shared/WishlistButton";
import CategoryBadge from "../shared/CategoryBadge";
import StockBadge from "./StockBadge";

interface Props {
  product: Product;
}

const ProductImage = ({ product }: Props) => {
  return (
    <div
      className="
    relative
    aspect-square
    overflow-hidden
    rounded-t-3xl
    bg-gradient-to-b
    from-slate-50
    to-slate-100
    transition-colors
duration-300
group-hover:from-blue-50
group-hover:to-slate-50
  "
    >
      <WishlistButton productId={product._id} />

      <CategoryBadge category={product.category} />

      <StockBadge stock={product.stock} />

      <img
        src={getImageUrl(product.image)}
        alt={product.title}
        className="
          h-full
          w-full
          rounded-xl
          object-contain
          p-8
          transition-all
          duration-500
          group-hover:scale-105
        "
      />
    </div>
  );
};

export default ProductImage;
