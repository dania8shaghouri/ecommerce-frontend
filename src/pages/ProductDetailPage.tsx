import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import type { Product } from "../types/Product";
import { getProductById } from "../services/productService";

import ProductDescription from "../components/product/detail/ProductDescription";
import ProductGallery from "../components/product/detail/ProductGallery";
import ProductSpecs from "../components/product/detail/ProductSpecs";
import ProductSummary from "../components/product/detail/ProductSummary";

import Loading from "../components/ui/Loading";
import ErrorState from "../components/ui/ErrorState";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const data = await getProductById(id);

        setProduct(data);
      } catch (err) {
        console.error(err);

        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error || !product) {
    return (
      <ErrorState
        message={error ?? "Product not found."}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (

    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-12 lg:grid-cols-2">
        <ProductGallery product={product} />

        <ProductSummary product={product} />
      </div>

      <ProductSpecs product={product} />

      <ProductDescription product={product} />
    </div>
  );
};

export default ProductDetailPage;
