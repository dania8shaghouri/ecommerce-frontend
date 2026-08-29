import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminProducts, deleteProduct } from "../../services/adminProductService";
import { getCategories } from "../../../../services/categoryService";
import type { AdminProduct, AdminProductFilters } from "../../types/adminProduct";
import type { Category } from "../../../../types/Category";
import ProductsTable from "../../components/products/ProductsTable";
import ProductsToolbar from "../../components/products/ProductsToolbar";
import ProductsTableSkeleton from "../../components/products/ProductsTableSkeleton";
import DeleteConfirmModal from "../../components/products/DeleteConfirmModal";
import toast from "react-hot-toast";

const LIMIT = 10;

const ProductsPage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<AdminProductFilters>({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const [deletingProduct, setDeletingProduct] = useState<AdminProduct | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAdminProducts({ ...filters, page, limit: LIMIT });
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
      setTotalProducts(response.data.totalProducts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  useEffect(() => {
    const timeoutId = setTimeout(fetchProducts, 400);
    return () => clearTimeout(timeoutId);
  }, [fetchProducts]);

  const handleFilterChange = (newFilters: AdminProductFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleConfirmDelete = async () => {
    if (!deletingProduct) return;
    setIsDeleting(true);
    try {
      await deleteProduct(deletingProduct._id);
      toast.success("Product deleted");
      setDeletingProduct(null);
      fetchProducts();
    } catch {
      toast.error("Failed to delete product");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-textSecondary">Dashboard / Products</p>
          <h1 className="mt-1 text-2xl font-semibold text-textPrimary">Products</h1>
          <p className="mt-1 text-sm text-textSecondary">
            Manage and organize your store products.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/products/new")}
          className="rounded-xl bg-primary px-5 py-2.5 font-medium text-white transition hover:bg-primaryHover"
        >
          + Add Product
        </button>
      </div>

      <ProductsToolbar filters={filters} onFilterChange={handleFilterChange} categories={categories} />

      {loading ? (
        <ProductsTableSkeleton />
      ) : (
        <ProductsTable
          products={products}
          currentPage={page}
          totalPages={totalPages}
          totalProducts={totalProducts}
          limit={LIMIT}
          onPageChange={setPage}
          onEdit={(product) => navigate(`/admin/products/${product._id}/edit`)}
          onDelete={setDeletingProduct}
        />
      )}

      <DeleteConfirmModal
        isOpen={Boolean(deletingProduct)}
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleConfirmDelete}
        product={deletingProduct}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default ProductsPage;