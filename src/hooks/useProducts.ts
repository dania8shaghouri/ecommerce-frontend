import { useCallback, useEffect, useState } from "react";

import type { Product } from "../types/Product";
import { getProducts } from "../services/productService";
import { useShopFilter } from "../context/shop/ShopFilterContext";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { filters } = useShopFilter();

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // const data = await getProducts(filters);

      const data = await getProducts(filters);

      console.log({
        totalProducts: data.totalProducts,
        totalPages: data.totalPages,
        currentPage: data.currentPage,
      });
      setProducts(data.products);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
      setTotalProducts(data.totalProducts);

      // setProducts(data);
    } catch (error) {
      console.error(error);

      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  }, [filters]);
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,

    currentPage,
    totalPages,
    totalProducts,
  };
};
