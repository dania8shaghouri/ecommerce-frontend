import api from "../api/axios";
import type { Category } from "../types/Category";

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await api.get<Category[]>("/product/categories");

  return data;
};
