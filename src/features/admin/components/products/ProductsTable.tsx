import type { AdminProduct } from "../../types/adminProduct";
import { getImageUrl } from "../../../../utils/getImageUrl";
import EmptyState from "../../../../components/ui/EmptyState";
import ProductsPagination from "./ProductsPagination";
import ProductActionsMenu from "./ProductActionsMenu";
interface Props {
  products: AdminProduct[];
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  limit: number;
  onPageChange: (page: number) => void;
  onEdit: (product: AdminProduct) => void;
  onDelete: (product: AdminProduct) => void;
}

const getStockStatus = (stock: number) => {
  if (stock === 0) {
    return { label: "Out of Stock", bg: "bg-red-50", text: "text-danger" };
  }
  if (stock <= 10) {
    return { label: "Low Stock", bg: "bg-amber-50", text: "text-warning" };
  }
  return { label: "In Stock", bg: "bg-emerald-50", text: "text-success" };
};

const ProductsTable = ({
  products,
  currentPage,
  totalPages,
  totalProducts,
  limit,
  onPageChange,
  onEdit,
  onDelete
}: Props) => {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-white shadow-sm">
        <EmptyState message="No products found matching your filters." />
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border bg-background text-xs uppercase tracking-wide text-textSecondary">
              <th className="px-6 py-4 font-medium">Product</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Price</th>
              <th className="px-6 py-4 font-medium">Stock</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => {
              const status = getStockStatus(product.stock);

              return (
                <tr
                  key={product._id}
                  className="border-b border-border last:border-0 hover:bg-background/60"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={getImageUrl(product.image)}
                        alt={product.title}
                        className="h-11 w-11 rounded-lg border border-border object-contain p-1"
                      />
                      <div>
                        <p className="font-medium text-textPrimary">
                          {product.title}
                        </p>
                        <p className="text-sm text-textSecondary">
                          {product.brand}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-textSecondary">
                    {product.category}
                  </td>

                  <td className="px-6 py-4 font-medium text-textPrimary">
                    ${product.price.toFixed(2)}
                  </td>

                  <td className="px-6 py-4 text-textSecondary">
                    {product.stock} units
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${status.bg} ${status.text}`}
                    >
                      {status.label}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <ProductActionsMenu
                      product={product}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ProductsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalProducts={totalProducts}
        limit={limit}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default ProductsTable;
