import { useProducts } from "../../hooks/useProducts";

import ProductGrid from "../product/card/ProductGrid";

import Loading from "../ui/Loading";
import ErrorState from "../ui/ErrorState";
import EmptyState from "../ui/EmptyState";
import ProductToolbar from "./ProductToolbar";
import Pagination from "./Pagination";
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
    return <Loading />;
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
