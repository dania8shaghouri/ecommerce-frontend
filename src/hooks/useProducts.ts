import { useEffect, useState } from "react";
import axios from "axios";
import type { Product } from "../types/Product";
import { BASE_URL } from "../constants/baseUrl";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.get<Product[]>(`${BASE_URL}/product`);
      setProducts(data);
    } catch (err) {
      console.error("Products fetch error:", err);
      setError("Failed to load products. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
};
