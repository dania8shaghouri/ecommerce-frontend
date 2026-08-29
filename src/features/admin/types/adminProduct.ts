export interface AdminProduct {
  _id: string;
  title: string;
  brand: string;
  category: string;
  image: string;
  images: string[];
  description?: string;
  price: number;
  stock: number;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;

  cpu?: string;
  ram?: string;
  storage?: string;
  gpu?: string;

  resolution?: string;
  refreshRate?: string;
  panel?: string;
  size?: string;

  type?: string;
  connectivity?: string;
  switches?: string;
  dpi?: string;
  rgb?: boolean;

  capacity?: string;
  interface?: string;
  readSpeed?: string;
}

export interface AdminProductsResponse {
  products: AdminProduct[];
  totalProducts: number;
  totalPages: number;
  currentPage: number;
}
export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

export type AdminProductSort =
  | "name-asc"
  | "name-desc"
  | "price-asc"
  | "price-desc"
  | "stock-asc"
  | "stock-desc";

export interface AdminProductFilters {
  search?: string;
  category?: string;
  stockStatus?: StockStatus;
  sort?: AdminProductSort;
  page?: number;
  limit?: number;
}
