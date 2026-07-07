import { useState } from "react";
import type { FC, PropsWithChildren } from "react";

import { ShopFilterContext } from "./ShopFilterContext";

import type { ProductSort, ShopFilters } from "../../types/Filter";

const initialFilters: ShopFilters = {
  category: [],
  brand: [],
  minPrice: null,
  maxPrice: null,
  inStock: false,
  sort: "featured",
  page: 1,
};

const ShopFilterProvider: FC<PropsWithChildren> = ({ children }) => {
  const [filters, setFilters] = useState<ShopFilters>(initialFilters);

  const toggleCategory = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      page: 1,

      category: prev.category.includes(category)
        ? prev.category.filter((item) => item !== category)
        : [...prev.category, category],
    }));
  };

  const setPrice = (min: number | null, max: number | null) => {
    setFilters((prev) => ({
      ...prev,
      page: 1,
      minPrice: min,
      maxPrice: max,
    }));
  };

  const toggleInStock = () => {
    setFilters((prev) => ({
      ...prev,
      page: 1,
      inStock: !prev.inStock,
    }));
  };

  const toggleBrand = (brand: string) => {
    setFilters((prev) => ({
      ...prev,
      page: 1,

      brand: prev.brand.includes(brand)
        ? prev.brand.filter((item) => item !== brand)
        : [...prev.brand, brand],
    }));
  };

  const setMinPrice = (price: number | null) => {
    setFilters((prev) => ({
      ...prev,
      page: 1,
      minPrice: price,
    }));
  };

  const setMaxPrice = (price: number | null) => {
    setFilters((prev) => ({
      ...prev,
      page: 1,
      maxPrice: price,
    }));
  };

  const setSort = (sort: ProductSort) => {
    setFilters((prev) => ({
      ...prev,
      page: 1,
      sort,
    }));
  };

  const setPage = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <ShopFilterContext.Provider
      value={{
        filters,

        toggleCategory,
        toggleBrand,
        setMinPrice,
        setMaxPrice,
        setPrice,
        toggleInStock,
        setSort,
        setPage,

        clearFilters,
      }}
    >
      {children}
    </ShopFilterContext.Provider>
  );
};

export default ShopFilterProvider;
