const OrdersTableSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-border bg-background text-xs uppercase tracking-wide text-textSecondary">
            <th className="px-6 py-4 font-medium">Order ID</th>
            <th className="px-6 py-4 font-medium">Customer</th>
            <th className="px-6 py-4 font-medium">Date</th>
            <th className="px-6 py-4 font-medium">Total</th>
            <th className="px-6 py-4 font-medium">Payment</th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 6 }).map((_, index) => (
            <tr key={index} className="border-b border-border last:border-0">
              <td className="px-6 py-4">
                <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
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

export default OrdersTableSkeleton;
