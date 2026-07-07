import { useCallback, useEffect, useState } from "react";

import { getBrands } from "../services/productService";

export interface Brand {
  name: string;
}

export const useBrands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBrands = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getBrands();

      setBrands(data);
    } catch (error) {
      console.error(error);
      setError("Failed to load brands.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  return {
    brands,
    loading,
    error,
    refetch: fetchBrands,
  };
};
