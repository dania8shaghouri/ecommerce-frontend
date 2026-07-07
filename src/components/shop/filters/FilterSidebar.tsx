import FilterHeader from "./FilterHeader";
import FilterGroup from "./FilterGroup";
import PriceFilter from "./PriceFilter";

import { useCategories } from "../../../hooks/useCategories";
import { useShopFilter } from "../../../context/shop/ShopFilterContext";
import { useBrands } from "../../../hooks/useBrands";

const FilterSidebar = () => {
  const { categories } = useCategories();
  const { filters, toggleCategory, toggleBrand, toggleInStock } =
    useShopFilter();
  const { brands } = useBrands();

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.name,
    count: category.totalProducts,
  }));

  const brandOptions = brands.map((brand) => ({
    label: brand.name,
    value: brand.name,
  }));

  return (
    <aside className="w-full rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:w-72">
      <FilterHeader />

      <FilterGroup
        title="Category"
        options={categoryOptions}
        selected={filters.category}
        onToggle={toggleCategory}
      />

      <FilterGroup
        title="Brand"
        options={brandOptions}
        selected={filters.brand}
        onToggle={toggleBrand}
      />

      <PriceFilter />
      <FilterGroup
        title="Availability"
        options={[
          {
            label: "In Stock Only",
            value: "inStock",
          },
        ]}
        selected={filters.inStock ? ["inStock"] : []}
        onToggle={toggleInStock}
      />
    </aside>
  );
};

export default FilterSidebar;
