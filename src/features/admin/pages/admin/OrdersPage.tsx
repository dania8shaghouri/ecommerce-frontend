import { useCallback, useEffect, useState } from "react";
import { getAdminOrders } from "../../services/adminOrderService";
import type { AdminOrder, AdminOrderFilters } from "../../types/adminOrder";
import OrdersTable from "../../components/orders/OrdersTable";
import OrdersToolbar from "../../components/orders/OrdersToolbar";

const LIMIT = 10;

const OrdersPage = () => {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<AdminOrderFilters>({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAdminOrders({ ...filters, page, limit: LIMIT });
      setOrders(response.data.orders);
      setTotalPages(response.data.totalPages);
      setTotalOrders(response.data.totalOrders);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  useEffect(() => {
    const timeoutId = setTimeout(fetchOrders, 400);
    return () => clearTimeout(timeoutId);
  }, [fetchOrders]);

  const handleFilterChange = (newFilters: AdminOrderFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-textSecondary">Dashboard / Orders</p>
        <h1 className="mt-1 text-2xl font-semibold text-textPrimary">Orders</h1>
        <p className="mt-1 text-sm text-textSecondary">
          Track and manage customer orders.
        </p>
      </div>

      <OrdersToolbar filters={filters} onFilterChange={handleFilterChange} />

      {loading ? (
        <p className="text-textSecondary">Loading orders...</p>
      ) : (
        <OrdersTable
          orders={orders}
          currentPage={page}
          totalPages={totalPages}
          totalOrders={totalOrders}
          limit={LIMIT}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default OrdersPage;
