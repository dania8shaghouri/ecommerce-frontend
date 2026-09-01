import { Link } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import type {
  AdminOrder,
  OrderStatus,
  PaymentStatus,
} from "../../types/adminOrder";
import EmptyState from "../../../../components/ui/EmptyState";
import Pagination from "../../../../components/ui/Paigination";

interface Props {
  orders: AdminOrder[];
  currentPage: number;
  totalPages: number;
  totalOrders: number;
  limit: number;
  onPageChange: (page: number) => void;
}

const statusStyles: Record<OrderStatus, string> = {
  pending: "bg-amber-50 text-warning",
  processing: "bg-blue-50 text-blue-600",
  shipped: "bg-purple-50 text-purple-600",
  delivered: "bg-emerald-50 text-success",
  cancelled: "bg-red-50 text-danger",
};

const paymentStyles: Record<PaymentStatus, string> = {
  paid: "text-success",
  unpaid: "text-warning",
  failed: "text-danger",
  refunded: "text-danger",
};

const formatStatusLabel = (status: string) =>
  status.charAt(0).toUpperCase() + status.slice(1);

const OrdersTable = ({
  orders,
  currentPage,
  totalPages,
  totalOrders,
  limit,
  onPageChange,
}: Props) => {
  if (orders.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-white shadow-sm">
        <EmptyState message="No orders found matching your filters." />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      <div className="overflow-x-auto">
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
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b border-border last:border-0 hover:bg-background/60"
              >
                <td className="px-6 py-4">
                  <Link
                    to={`/admin/orders/${order._id}`}
                    className="font-medium text-primary hover:underline"
                  >
                    #{order.orderNumber}
                  </Link>
                </td>

                <td className="px-6 py-4 text-textPrimary">
                  {order.userId
                    ? `${order.userId.firstName} ${order.userId.lastName}`
                    : "—"}
                </td>

                <td className="px-6 py-4 text-textSecondary">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>

                <td className="px-6 py-4 font-medium text-textPrimary">
                  ${order.total.toFixed(2)}
                </td>

                <td
                  className={`px-6 py-4 font-medium ${paymentStyles[order.paymentStatus]}`}
                >
                  {formatStatusLabel(order.paymentStatus)}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusStyles[order.status]}`}
                  >
                    {formatStatusLabel(order.status)}
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  <Link
                    to={`/admin/orders/${order._id}`}
                    className="inline-flex rounded-lg p-2 text-textSecondary hover:bg-background"
                  >
                    <FiEye size={18} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalOrders}
        limit={limit}
        onPageChange={onPageChange}
        itemLabel="orders"
      />
    </div>
  );
};

export default OrdersTable;
