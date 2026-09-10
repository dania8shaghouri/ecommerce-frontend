import { Link } from "react-router-dom";
import type { AdminOrder, OrderStatus } from "../../types/adminOrder";

interface Props {
  orders: AdminOrder[];
}

const statusStyles: Record<OrderStatus, string> = {
  pending: "bg-amber-50 text-warning border-amber-200",
  processing: "bg-blue-50 text-blue-600 border-blue-200",
  shipped: "bg-purple-50 text-purple-600 border-purple-200",
  delivered: "bg-emerald-50 text-success border-emerald-200",
  cancelled: "bg-red-50 text-danger border-red-200",
};

const formatLabel = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const RecentOrdersTable = ({ orders }: Props) => {
  return (
    <div className="bg-white border border-border rounded-2xl p-4 overflow-x-auto w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">Recent Orders</h2>
        <Link
          to="/admin/orders"
          className="text-sm text-primary hover:underline"
        >
          View All Orders
        </Link>
      </div>

      {orders.length === 0 ? (
        <p className="text-sm text-textSecondary">No orders yet.</p>
      ) : (
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="pb-3">Order ID</th>
              <th className="pb-3">Customer</th>
              <th className="pb-3">Total</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="border-t hover:bg-gray-50 transition">
                <td className="py-3 font-medium">
                  <Link
                    to={`/admin/orders/${o._id}`}
                    className="text-primary hover:underline"
                  >
                    #{o.orderNumber}
                  </Link>
                </td>
                <td>
                  {o.userId
                    ? `${o.userId.firstName} ${o.userId.lastName}`
                    : "—"}
                </td>
                <td className="font-medium">${o.total.toFixed(2)}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs border ${statusStyles[o.status]}`}
                  >
                    {formatLabel(o.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RecentOrdersTable;
