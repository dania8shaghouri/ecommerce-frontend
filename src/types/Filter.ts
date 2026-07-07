export type ProductSort =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "newest";
export interface ShopFilters {
  category: string[];
  brand: string[];

  minPrice: number | null;
  maxPrice: number | null;

  inStock: boolean;
  sort: ProductSort;
  page: number;
}

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}
