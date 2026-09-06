import api from "../../../api/axios";
import type {
  AdminOrdersResponse,
  AdminOrder,
  AdminOrderFilters,
  OrderStatus,
} from "../types/adminOrder";

export const getAdminOrders = (filters?: AdminOrderFilters) => {
  // URL query oluşturmak için
  const params = new URLSearchParams();

  if (filters?.search) params.set("search", filters.search);
  if (filters?.status) params.set("status", filters.status);
  if (filters?.startDate) params.set("startDate", filters.startDate);
  if (filters?.endDate) params.set("endDate", filters.endDate);
  if (filters?.sort) params.set("sort", filters.sort);
  if (filters?.userId) params.set("userId", filters.userId);
  if (filters?.page) params.set("page", String(filters.page));
  if (filters?.limit) params.set("limit", String(filters.limit));

  // Bu endpoint'ten dönecek response'un data'sı AdminOrdersResponse yapısında
  return api.get<AdminOrdersResponse>("/admin/orders", { params });
};

export const getAdminOrderById = (id: string) =>
  api.get<AdminOrder>(`/admin/orders/${id}`);

export const updateOrderStatus = (id: string, status: OrderStatus) =>
  api.patch<AdminOrder>(`/admin/orders/${id}/status`, { status });
