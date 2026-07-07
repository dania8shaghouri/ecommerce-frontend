import { createContext, useContext } from "react";
import type { ShopFilters, ProductSort } from "../../types/Filter";

interface ShopFilterContextType {
  filters: ShopFilters;

  toggleCategory: (category: string) => void;
  toggleBrand: (brand: string) => void;
  setMinPrice: (price: number | null) => void;
  setMaxPrice: (price: number | null) => void;
  setPrice: (min: number | null, max: number | null) => void;
  toggleInStock: () => void;
  setSort: (sort: ProductSort) => void;
  setPage: (page: number) => void;

  clearFilters: () => void;
}

export const ShopFilterContext = createContext<ShopFilterContextType>({
  filters: {
    category: [],
    brand: [],
    minPrice: null,
    maxPrice: null,
    inStock: false,
    sort: "featured",
    page: 1,
  },

  toggleCategory: () => {},
  toggleBrand: () => {},
  setMinPrice: () => {},
  setMaxPrice: () => {},
  setPrice: () => {},
  toggleInStock: () => {},
  setSort: () => {},
  setPage: () => {},

  clearFilters: () => {},
});

export const useShopFilter = () => useContext(ShopFilterContext);
