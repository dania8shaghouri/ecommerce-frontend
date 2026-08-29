import { FiSearch } from "react-icons/fi";
import type {
  AdminProductFilters,
  StockStatus,
  AdminProductSort,
} from "../../types/adminProduct";
import type { Category } from "../../../../types/Category";

interface Props {
  filters: AdminProductFilters;
  onFilterChange: (filters: AdminProductFilters) => void;
  categories: Category[];
}

const ProductsToolbar = ({ filters, onFilterChange, categories }: Props) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5">
        <FiSearch className="text-textSecondary" />
        <input
          type="text"
          placeholder="Search products by name..."
          value={filters.search ?? ""}
          onChange={(e) =>
            onFilterChange({ ...filters, search: e.target.value })
          }
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      <select
        value={filters.category ?? "all"}
        onChange={(e) =>
          onFilterChange({
            ...filters,
            category: e.target.value === "all" ? undefined : e.target.value,
          })
        }
        className="rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-textPrimary"
      >
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>

      <select
        value={filters.stockStatus ?? "all"}
        onChange={(e) =>
          onFilterChange({
            ...filters,
            stockStatus:
              e.target.value === "all"
                ? undefined
                : (e.target.value as StockStatus),
          })
        }
        className="rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-textPrimary"
      >
        <option value="all">Stock Status</option>
        <option value="in_stock">In Stock</option>
        <option value="low_stock">Low Stock</option>
        <option value="out_of_stock">Out of Stock</option>
      </select>

      <select
        value={filters.sort ?? ""}
        onChange={(e) =>
          onFilterChange({
            ...filters,
            sort: e.target.value
              ? (e.target.value as AdminProductSort)
              : undefined,
          })
        }
        className="rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-textPrimary"
      >
        <option value="">Sort By</option>
        <option value="name-asc">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
        <option value="price-asc">Price (Low-High)</option>
        <option value="price-desc">Price (High-Low)</option>
        <option value="stock-asc">Stock (Low-High)</option>
        <option value="stock-desc">Stock (High-Low)</option>
      </select>
    </div>
  );
};

export default ProductsToolbar;
