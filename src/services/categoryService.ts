import axios from "axios";

import { BASE_URL } from "../constants/baseUrl";

import type { Category } from "../types/Category";

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await axios.get<Category[]>(
    `${BASE_URL}/product/categories`,
  );

  return data;
};
