import type { AdminOrder, OrderStatus } from "./adminOrder";

export interface DashboardSummary {
  totalRevenue: number;
  revenueChangePct: number | null;
  totalOrders: number;
  ordersChangePct: number | null;
  totalCustomers: number;
  customersChangePct: number | null;
  totalProducts: number;
  productsChangePct: number | null;
}

export interface MonthlyRevenuePoint {
  month: string;
  revenue: number;
}

export interface OrderStatusBreakdownItem {
  status: OrderStatus;
  count: number;
  percentage: number;
}

export interface TopProduct {
  title: string;
  image: string;
  unitsSold: number;
  revenue: number;
}

export interface DashboardOverview {
  summary: DashboardSummary;
  monthlyRevenue: MonthlyRevenuePoint[];
  orderStatusBreakdown: OrderStatusBreakdownItem[];
  topProducts: TopProduct[];
  recentOrders: AdminOrder[];
}
