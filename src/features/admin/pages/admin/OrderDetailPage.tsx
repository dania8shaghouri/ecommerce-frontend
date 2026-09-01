import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { getAdminOrderById } from "../../services/adminOrderService";
import type {
  AdminOrder,
  OrderStatus,
  PaymentStatus,
} from "../../types/adminOrder";
import { getImageUrl } from "../../../../utils/getImageUrl";
import Loading from "../../../../components/ui/Loading";
import OrderTimeline from "../../components/orders/OrderTimeline";
import OrderStatusControl from "../../components/orders/OrderStatusControl";

const statusStyles: Record<OrderStatus, string> = {
  pending: "bg-amber-50 text-warning",
  processing: "bg-blue-50 text-blue-600",
  shipped: "bg-purple-50 text-purple-600",
  delivered: "bg-emerald-50 text-success",
  cancelled: "bg-red-50 text-danger",
};

const paymentStyles: Record<PaymentStatus, string> = {
  paid: "bg-emerald-50 text-success",
  unpaid: "bg-amber-50 text-warning",
  failed: "bg-red-50 text-danger",
  refunded: "bg-red-50 text-danger",
};

const formatLabel = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState<AdminOrder | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = useCallback(async () => {
    if (!id) return;
    try {
      const response = await getAdminOrderById(id);
      setOrder(response.data);
    } catch (error) {
      console.error(error);
      navigate("/admin/orders");
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  if (loading) return <Loading />;
  if (!order) return null;

  const subtotal = order.orderItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );

  return (
    <div className="space-y-6 pb-10">
      <div>
        <p className="text-sm text-textSecondary">
          <Link to="/admin/orders" className="hover:underline">
            Orders
          </Link>{" "}
          / #{order.orderNumber}
        </p>

        <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-textPrimary">
                Order #{order.orderNumber}
              </h1>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusStyles[order.status]}`}
              >
                {formatLabel(order.status)}
              </span>
            </div>
            <p className="mt-1 text-sm text-textSecondary">
              Placed on{" "}
              {new Date(order.createdAt).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </div>

          <Link
            to="/admin/orders"
            className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-textSecondary hover:bg-background"
          >
            <FiArrowLeft size={16} /> Back to Orders
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* SOL KOLON */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-semibold text-textPrimary">
              Order Items ({order.orderItems.length})
            </h2>
            <div className="space-y-4">
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <img
                    src={getImageUrl(item.productImage)}
                    alt={item.productTitle}
                    className="h-14 w-14 rounded-lg border border-border object-contain p-1"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-textPrimary">
                      {item.productTitle}
                    </p>
                    <p className="text-sm text-textSecondary">
                      ${item.unitPrice.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium text-textPrimary">
                    ${(item.unitPrice * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-semibold text-textPrimary">
              Customer Information
            </h2>
            <p className="font-medium text-textPrimary">
              {order.userId.firstName} {order.userId.lastName}
            </p>
            <p className="text-sm text-textSecondary">{order.userId.email}</p>
            <p className="text-sm text-textSecondary">{order.shipping.phone}</p>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-semibold text-textPrimary">
              Shipping Address
            </h2>
            <p className="font-medium text-textPrimary">
              {order.shipping.fullName}
            </p>
            <p className="text-sm text-textSecondary">
              {order.shipping.address}
            </p>
            <p className="text-sm text-textSecondary">{order.shipping.city}</p>
          </div>
        </div>

        {/* SAĞ KOLON */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-semibold text-textPrimary">
              Order Summary
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-textSecondary">Subtotal</span>
                <span className="text-textPrimary">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-textSecondary">Shipping</span>
                <span className="text-success">Free</span>
              </div>
              <div className="mt-2 flex justify-between border-t border-border pt-2 font-semibold">
                <span className="text-textPrimary">Total</span>
                <span className="text-primary">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-semibold text-textPrimary">Payment</h2>
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${paymentStyles[order.paymentStatus]}`}
            >
              {formatLabel(order.paymentStatus)}
            </span>
          </div>

          <OrderTimeline status={order.status} createdAt={order.createdAt} />

          <OrderStatusControl
            orderId={order._id}
            currentStatus={order.status}
            onUpdated={fetchOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
