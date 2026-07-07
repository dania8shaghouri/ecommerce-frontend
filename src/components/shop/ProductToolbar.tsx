import SortSelect from "./SortSelect";

interface ProductToolbarProps {
  productCount: number;
}

const ProductToolbar = ({ productCount }: ProductToolbarProps) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <p className="text-sm text-gray-500">
        Showing{" "}
        <span className="font-semibold text-gray-900">{productCount}</span>{" "}
        Products
      </p>

      <SortSelect />
    </div>
  );
};

export default ProductToolbar;
