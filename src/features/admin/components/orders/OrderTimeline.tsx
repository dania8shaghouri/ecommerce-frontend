import { FiCheck } from "react-icons/fi";
import type { OrderStatus } from "../../types/adminOrder";

interface Props {
  status: OrderStatus;
  createdAt: string;
}

const STEPS: { key: OrderStatus; label: string }[] = [
  { key: "pending", label: "Order Placed" },
  { key: "processing", label: "Processing" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
];

const OrderTimeline = ({ status, createdAt }: Props) => {
  if (status === "cancelled") {
    return (
      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-semibold text-textPrimary">Order Timeline</h2>
        <p className="text-sm text-danger">This order was cancelled.</p>
      </div>
    );
  }

  const currentIndex = STEPS.findIndex((s) => s.key === status);

  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <h2 className="mb-4 font-semibold text-textPrimary">Order Timeline</h2>

      <div className="space-y-4">
        {STEPS.map((step, index) => {
          const isDone = index <= currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={step.key} className="flex items-start gap-3">
              <div
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                  isDone
                    ? "bg-success text-white"
                    : "border-2 border-border bg-white"
                }`}
              >
                {isDone && <FiCheck size={12} />}
              </div>

              <div>
                <p
                  className={`text-sm font-medium ${
                    isCurrent
                      ? "text-primary"
                      : isDone
                        ? "text-textPrimary"
                        : "text-textSecondary"
                  }`}
                >
                  {step.label}
                </p>
                {step.key === "pending" && (
                  <p className="text-xs text-textSecondary">
                    {new Date(createdAt).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                )}
                {isCurrent && step.key !== "pending" && (
                  <p className="text-xs text-textSecondary">In progress</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTimeline;
