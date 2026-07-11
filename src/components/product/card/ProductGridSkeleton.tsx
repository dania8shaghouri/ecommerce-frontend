import ProductCardSkeleton from "./ProductCardSkeletont";

const ProductGridSkeleton = () => {
  return (
    <section
      className="
        grid
        grid-cols-1
        gap-6
        sm:grid-cols-2
        xl:grid-cols-3
        2xl:grid-cols-4
      "
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </section>
  );
};

export default ProductGridSkeleton;
