import api from "../../../api/axios";
import type {
  AdminCustomersResponse,
  AdminCustomerFilters,
  AdminCustomerDetail,
} from "../types/adminCustomer";

export const getAdminCustomers = (filters?: AdminCustomerFilters) => {
  const params = new URLSearchParams();

  if (filters?.search) params.set("search", filters.search);
  if (filters?.sort) params.set("sort", filters.sort);
  if (filters?.page) params.set("page", String(filters.page));
  if (filters?.limit) params.set("limit", String(filters.limit));

  return api.get<AdminCustomersResponse>("/admin/customers", { params });
};

export const getAdminCustomerById = (id: string) =>
  api.get<AdminCustomerDetail>(`/admin/customers/${id}`);
