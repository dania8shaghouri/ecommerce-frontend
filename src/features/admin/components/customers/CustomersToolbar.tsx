import { FiSearch } from "react-icons/fi";
import type {
  AdminCustomerFilters,
  CustomerSort,
} from "../../types/adminCustomer";

interface Props {
  filters: AdminCustomerFilters;
  onFilterChange: (filters: AdminCustomerFilters) => void;
}

const CustomersToolbar = ({ filters, onFilterChange }: Props) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5">
        <FiSearch className="text-textSecondary" />
        <input
          type="text"
          placeholder="Search customers..."
          value={filters.search ?? ""}
          onChange={(e) =>
            onFilterChange({ ...filters, search: e.target.value })
          }
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      <select
        value={filters.sort ?? ""}
        onChange={(e) =>
          onFilterChange({
            ...filters,
            sort: e.target.value ? (e.target.value as CustomerSort) : undefined,
          })
        }
        className="rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-textPrimary"
      >
        <option value="">Sort By</option>
        <option value="newest">Newest Joined</option>
        <option value="oldest">Oldest Joined</option>
        <option value="name-asc">Name (A-Z)</option>
        <option value="spent-desc">Total Spent (High-Low)</option>
        <option value="orders-desc">Most Orders</option>
      </select>
    </div>
  );
};

export default CustomersToolbar;
