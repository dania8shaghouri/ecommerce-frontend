import { useEffect, useState } from "react";

import { getCategories } from "../services/categoryService";

import type { Category } from "../types/Category";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      setError(null);

      const data = await getCategories();

      setCategories(data);
    } catch (err) {
      console.error("Categories fetch error:", err);

      setError("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,

    loading,

    error,

    refetch: fetchCategories,
  };
};
