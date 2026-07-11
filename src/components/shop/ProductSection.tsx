import { useProducts } from "../../hooks/useProducts";

import ProductGrid from "../product/card/ProductGrid";

import ErrorState from "../ui/ErrorState";
import EmptyState from "../ui/EmptyState";
import ProductToolbar from "./ProductToolbar";
import Pagination from "./Pagination";
import ProductGridSkeleton from "../product/card/ProductGridSkeleton";
const ProductSection = () => {
  const {
    products,
    loading,
    error,
    refetch,
    currentPage,
    totalPages,
    totalProducts,
  } = useProducts();

  if (loading) {
    return <ProductGridSkeleton />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  if (products.length === 0) {
    return <EmptyState message="No products found." />;
  }

  return (
    <>
      <ProductToolbar productCount={totalProducts} />

      <ProductGrid products={products} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
};

export default ProductSection;
