import { useShopFilter } from "../../context/shop/ShopFilterContext";
import type { ProductSort } from "../../types/Filter";

const options: {
  value: ProductSort;
  label: string;
}[] = [
  {
    value: "featured",
    label: "Featured",
  },
  {
    value: "price-asc",
    label: "Price: Low to High",
  },
  {
    value: "price-desc",
    label: "Price: High to Low",
  },
  {
    value: "rating",
    label: "Highest Rated",
  },
  {
    value: "newest",
    label: "Newest",
  },
];

const SortSelect = () => {
  const { filters, setSort } = useShopFilter();

  return (
    <select
      value={filters.sort}
      onChange={(e) => setSort(e.target.value as ProductSort)}
      className="
        rounded-xl
        border
        border-border
        bg-white
        px-4
        py-2
        text-sm
        outline-none
        focus:border-primary
      "
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SortSelect;
