export interface OrderItem {
  productTitle: string;
  productImage: string;
  unitPrice: number;
  quantity: number;
}

export interface Shipping {
  fullName: string;
  phone: string;
  city: string;
  address: string;
}
export interface Payment {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}
export interface Order {
  _id: string;
  orderNumber: string;
  orderItems: OrderItem[];
  total: number;
  shipping: Shipping;
  status: string;
  createdAt: string;
}

export type CheckoutFormData = Shipping;

export type OrderStatus = "Paid" | "Pending" | "Failed";

export interface DashboardOrder {
  id: string;
  customer: string;
  status: OrderStatus;
  total: string;
  date: string;
}
