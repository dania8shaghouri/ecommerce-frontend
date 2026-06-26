import type { Order } from "../../types/order";
import { getImageUrl } from "../../utils/getImageUrl";

const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return "bg-green-100 text-green-600";
    case "pending":
      return "bg-yellow-100 text-yellow-600";
    case "cancelled":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const OrderCard = ({ order }: { order: Order }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-gray-500">
          Order #: {order.orderNumber}
        </span>

        <span
          className={`text-xs font-medium px-2 py-1 rounded ${getStatusStyle(
            order.status,
          )}`}
        >
          {order.status}
        </span>
      </div>

      {/* SHIPPING */}
      <div className="text-sm text-gray-600 mb-4">
        <p className="font-medium text-gray-800">{order.shipping.fullName}</p>
        <p>
          {order.shipping.city} • {order.shipping.address}
        </p>
        <p className="text-xs text-gray-400">{order.shipping.phone}</p>
      </div>

      {/* ITEMS */}
      <div className="space-y-3">
        {order.orderItems.map((item, index) => {
          console.log("PRODUCT IMAGE DEBUG:", item.productImage);

          return (
            <div
              key={item.productTitle + index}
              className="flex items-center gap-3 border-t pt-3"
            >
              <img
                src={getImageUrl(item.productImage)}
                alt={item.productTitle}
                className="w-12 h-12 object-cover rounded"
              />

              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">
                  {item.productTitle}
                </p>
                <p className="text-xs text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>

              <span className="text-sm font-semibold text-gray-800">
                ₺{(item.unitPrice * item.quantity).toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>

      {/* TOTAL */}
      <div className="flex justify-between mt-4 border-t pt-3 text-sm">
        <span className="text-gray-600">Total</span>
        <span className="font-bold text-primary text-lg">
          ₺{order.total.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default OrderCard;
