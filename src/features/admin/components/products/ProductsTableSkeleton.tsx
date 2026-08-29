const ProductsTableSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-border bg-background text-xs uppercase tracking-wide text-textSecondary">
            <th className="px-6 py-4 font-medium">Product</th>
            <th className="px-6 py-4 font-medium">Category</th>
            <th className="px-6 py-4 font-medium">Price</th>
            <th className="px-6 py-4 font-medium">Stock</th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 6 }).map((_, index) => (
            <tr key={index} className="border-b border-border last:border-0">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 animate-pulse rounded-lg bg-gray-200" />
                  <div className="space-y-2">
                    <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                    <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
                  </div>
                </div>
              </td>

              <td className="px-6 py-4">
                <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
              </td>

              <td className="px-6 py-4">
                <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
              </td>

              <td className="px-6 py-4">
                <div className="h-4 w-14 animate-pulse rounded bg-gray-200" />
              </td>

              <td className="px-6 py-4">
                <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200" />
              </td>

              <td className="px-6 py-4 text-right">
                <div className="ml-auto h-8 w-8 animate-pulse rounded-lg bg-gray-200" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTableSkeleton;