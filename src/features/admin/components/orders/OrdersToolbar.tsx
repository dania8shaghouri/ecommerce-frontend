import { FiSearch } from "react-icons/fi";
import type { AdminOrderFilters, OrderStatus, OrderSort } from "../../types/adminOrder";

interface Props {
  filters: AdminOrderFilters;
  onFilterChange: (filters: AdminOrderFilters) => void;
}

type DatePreset = "all" | "today" | "7d" | "30d";

const getDateRange = (preset: DatePreset) => {
  const now = new Date();

  if (preset === "all") return { startDate: undefined, endDate: undefined };

  const start = new Date(now);
  if (preset === "today") {
    start.setHours(0, 0, 0, 0);
  } else if (preset === "7d") {
    start.setDate(start.getDate() - 7);
  } else if (preset === "30d") {
    start.setDate(start.getDate() - 30);
  }

  return { startDate: start.toISOString(), endDate: now.toISOString() };
};

const OrdersToolbar = ({ filters, onFilterChange }: Props) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5">
        <FiSearch className="text-textSecondary" />
        <input
          type="text"
          placeholder="Search by order ID or customer..."
          value={filters.search ?? ""}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      <select
        value={filters.status ?? "all"}
        onChange={(e) =>
          onFilterChange({
            ...filters,
            status: e.target.value === "all" ? undefined : (e.target.value as OrderStatus),
          })
        }
        className="rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-textPrimary"
      >
        <option value="all">Order Status</option>
        <option value="pending">Pending</option>
        <option value="processing">Processing</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>

      <select
        onChange={(e) => {
          const { startDate, endDate } = getDateRange(e.target.value as DatePreset);
          onFilterChange({ ...filters, startDate, endDate });
        }}
        className="rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-textPrimary"
      >
        <option value="all">Date Range</option>
        <option value="today">Today</option>
        <option value="7d">Last 7 days</option>
        <option value="30d">Last 30 days</option>
      </select>

      <select
        value={filters.sort ?? ""}
        onChange={(e) =>
          onFilterChange({
            ...filters,
            sort: e.target.value ? (e.target.value as OrderSort) : undefined,
          })
        }
        className="rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-textPrimary"
      >
        <option value="">Sort By</option>
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="total-desc">Total (High-Low)</option>
        <option value="total-asc">Total (Low-High)</option>
      </select>
    </div>
  );
};

export default OrdersToolbar;