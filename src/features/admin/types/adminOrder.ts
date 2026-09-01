export interface OrderCustomer {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface OrderItem {
  productTitle: string;
  productImage: string;
  unitPrice: number;
  quantity: number;
}

export interface OrderShipping {
  fullName: string;
  phone: string;
  city: string;
  address: string;
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";
export type PaymentStatus = "unpaid" | "paid" | "failed" | "refunded";
export type OrderSort = "newest" | "oldest" | "total-asc" | "total-desc";

export interface AdminOrder {
  _id: string;
  orderNumber: string;
  orderItems: OrderItem[];
  total: number;
  shipping: OrderShipping;
  userId: OrderCustomer;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AdminOrdersResponse {
  orders: AdminOrder[];
  totalOrders: number;
  totalPages: number;
  currentPage: number;
}

export interface AdminOrderFilters {
  search?: string;
  status?: OrderStatus;
  startDate?: string;
  endDate?: string;
  sort?: OrderSort;
  page?: number;
  limit?: number;
}
