import { useState } from "react";
import toast from "react-hot-toast";
import { updateOrderStatus } from "../../services/adminOrderService";
import type { OrderStatus } from "../../types/adminOrder";

interface Props {
  orderId: string;
  currentStatus: OrderStatus;
  onUpdated: () => void;
}

const STATUS_OPTIONS: OrderStatus[] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const OrderStatusControl = ({ orderId, currentStatus, onUpdated }: Props) => {
  const [selected, setSelected] = useState<OrderStatus>(currentStatus);
  const [isSaving, setIsSaving] = useState(false);

  const hasChanged = selected !== currentStatus;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateOrderStatus(orderId, selected);
      toast.success("Order status updated");
      onUpdated();
    } catch {
      toast.error("Failed to update order status");
      setSelected(currentStatus);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <h2 className="mb-4 font-semibold text-textPrimary">Update Status</h2>

      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value as OrderStatus)}
        className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary"
      >
        {STATUS_OPTIONS.map((status) => (
          <option key={status} value={status}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </option>
        ))}
      </select>

      {hasChanged && (
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="mt-3 w-full rounded-xl bg-primary px-4 py-2.5 font-medium text-white hover:bg-primaryHover disabled:opacity-60"
        >
          {isSaving ? "Saving..." : "Save Status"}
        </button>
      )}
    </div>
  );
};

export default OrderStatusControl;
