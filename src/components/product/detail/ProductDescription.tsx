import type { Product } from "../../../types/Product";

interface Props {
  product: Product;
}

const ProductDescription = ({ product }: Props) => {
  if (!product.description) return null;

  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold text-gray-900">Description</h2>

      <div
        className="
          mt-8
          rounded-3xl
          border
          border-gray-200
          bg-white
          p-10
          shadow-sm
        "
      >
        <div
          className="
            prose
            prose-gray
            max-w-none
            leading-8
            text-gray-600
          "
        >
          <p>{product.description}</p>
        </div>
      </div>
    </section>
  );
};

export default ProductDescription;
