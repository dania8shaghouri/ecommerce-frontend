export interface AdminCustomer {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "customer" | "admin";
  totalOrders: number;
  totalSpent: number;
  createdAt?: string;
}

export type CustomerSort =
  | "name-asc"
  | "newest"
  | "oldest"
  | "spent-desc"
  | "orders-desc";

export interface AdminCustomersResponse {
  customers: AdminCustomer[];
  totalCustomers: number;
  totalPages: number;
  currentPage: number;
}

export interface AdminCustomerFilters {
  search?: string;
  sort?: CustomerSort;
  page?: number;
  limit?: number;
}

export interface CustomerShipping {
  fullName: string;
  phone: string;
  city: string;
  address: string;
}

export interface AdminCustomerDetail {
  customer: AdminCustomer;
  summary: {
    totalOrders: number;
    totalSpent: number;
    averageOrderValue: number;
  };
  shipping: CustomerShipping | null;
}
