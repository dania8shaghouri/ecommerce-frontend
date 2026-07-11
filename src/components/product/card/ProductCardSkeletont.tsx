const ProductCardSkeleton = () => {
  return (
    <article className="overflow-hidden rounded-3xl border border-gray-200 bg-white">
      <div className="aspect-square animate-pulse bg-gray-200" />

      <div className="space-y-4 p-5">
        <div className="h-4 w-20 rounded bg-gray-200 animate-pulse" />

        <div className="h-6 w-full rounded bg-gray-200 animate-pulse" />

        <div className="h-4 w-2/3 rounded bg-gray-200 animate-pulse" />

        <div className="h-6 w-24 rounded bg-gray-200 animate-pulse" />
      </div>

      <div className="p-5 pt-0">
        <div className="h-11 rounded-xl bg-gray-200 animate-pulse" />
      </div>
    </article>
  );
};

export default ProductCardSkeleton;
