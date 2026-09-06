const CustomersTableSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-border bg-background text-xs uppercase tracking-wide text-textSecondary">
            <th className="px-6 py-4 font-medium">Customer</th>
            <th className="px-6 py-4 font-medium">Email</th>
            <th className="px-6 py-4 font-medium">Orders</th>
            <th className="px-6 py-4 font-medium">Total Spent</th>
            <th className="px-6 py-4 font-medium">Joined</th>
            <th className="px-6 py-4 font-medium text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 6 }).map((_, index) => (
            <tr key={index} className="border-b border-border last:border-0">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200" />
                  <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
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

export default CustomersTableSkeleton;
