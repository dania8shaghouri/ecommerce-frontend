export interface Product {
  _id: string;

  title: string;
  brand: string;
  category: string;

  image: string;
  images: string[];

  description?: string;

  // Laptop
  cpu?: string;
  ram?: string;
  storage?: string;
  gpu?: string;

  // Monitor
  resolution?: string;
  refreshRate?: string;
  panel?: string;
  size?: string;

  // Gaming Products
  type?: string;
  connectivity?: string;
  switches?: string;
  dpi?: string;
  rgb?: boolean;

  // Storage
  capacity?: string;
  interface?: string;
  readSpeed?: string;

  price: number;
  stock: number;

  rating: number;
  reviewCount: number;

  isFeatured?: boolean;
}

export interface TopProduct {
  name: string;
  sales: number;
  revenue: string;
  image: string;
}

export interface ProductsResponse {
  products: Product[];
  totalProducts: number;
  totalPages: number;
  currentPage: number;
}
