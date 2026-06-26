import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";
import Loading from "../components/ui/Loading";
import ErrorState from "../components/ui/ErrorState";
import EmptyState from "../components/ui/EmptyState";
import type { Product } from "../types/Product";
import { useAddToCart } from "../hooks/useAddToCart";

const HomePage = () => {
  const { products, loading, error, refetch } = useProducts();
  
  const { addToCart } = useAddToCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;
  if (products.length === 0)
    return <EmptyState message="No products available" />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
