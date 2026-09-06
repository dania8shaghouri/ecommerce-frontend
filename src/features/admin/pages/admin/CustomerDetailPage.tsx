import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { getAdminCustomerById } from "../../services/adminCustomerService";
import { getAdminOrders } from "../../services/adminOrderService";
import type { AdminCustomerDetail } from "../../types/adminCustomer";
import type { AdminOrder } from "../../types/adminOrder";
import Loading from "../../../../components/ui/Loading";
import OrdersTable from "../../components/orders/OrdersTable";
import OrdersTableSkeleton from "../../components/orders/OrdersTableSkeleton";

const LIMIT = 8;

const getInitials = (firstName: string, lastName: string) =>
  `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

const CustomerDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [detail, setDetail] = useState<AdminCustomerDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      try {
        const response = await getAdminCustomerById(id);
        setDetail(response.data);
      } catch (error) {
        console.error(error);
        navigate("/admin/customers");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id, navigate]);

  const fetchOrders = useCallback(async () => {
    if (!id) return;
    setOrdersLoading(true);
    try {
      const response = await getAdminOrders({ userId: id, page, limit: LIMIT });
      setOrders(response.data.orders);
      setTotalPages(response.data.totalPages);
      setTotalOrders(response.data.totalOrders);
    } catch (error) {
      console.error(error);
    } finally {
      setOrdersLoading(false);
    }
  }, [id, page]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (loading) return <Loading />;
  if (!detail) return null;

  const { customer, summary, shipping } = detail;

  return (
    <div className="space-y-6 pb-10">
      <div>
        <p className="text-sm text-textSecondary">
          <Link to="/admin/customers" className="hover:underline">
            Customers
          </Link>{" "}
          / {customer.firstName} {customer.lastName}
        </p>

        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
              {getInitials(customer.firstName, customer.lastName)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold text-textPrimary">
                  {customer.firstName} {customer.lastName}
                </h1>
                {customer.createdAt && (
                  <span className="rounded-full bg-background px-2.5 py-1 text-xs text-textSecondary">
                    Customer since{" "}
                    {new Date(customer.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                )}
              </div>
              <p className="text-sm text-textSecondary">{customer.email}</p>
            </div>
          </div>

          <Link
            to="/admin/customers"
            className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-textSecondary hover:bg-background"
          >
            <FiArrowLeft size={16} /> Back to Customers
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-semibold text-textPrimary">
            Customer Information
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-textSecondary">Full Name</p>
              <p className="mt-1 font-medium text-textPrimary">
                {customer.firstName} {customer.lastName}
              </p>
            </div>
            <div>
              <p className="text-textSecondary">Email Address</p>
              <p className="mt-1 font-medium text-textPrimary">
                {customer.email}
              </p>
            </div>
            <div>
              <p className="text-textSecondary">Phone</p>
              <p className="mt-1 font-medium text-textPrimary">
                {shipping?.phone ?? "—"}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-semibold text-textPrimary">
            Shipping Address
          </h2>
          {shipping ? (
            <>
              <p className="text-sm font-medium text-textPrimary">
                {shipping.fullName}
              </p>
              <p className="text-sm text-textSecondary">{shipping.address}</p>
              <p className="text-sm text-textSecondary">{shipping.city}</p>
            </>
          ) : (
            <p className="text-sm text-textSecondary">
              No orders yet — no address on file.
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-semibold text-textPrimary">
            Customer Summary
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-textSecondary">Total Orders</span>
              <span className="font-semibold text-textPrimary">
                {summary.totalOrders}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-textSecondary">Total Spent</span>
              <span className="font-semibold text-primary">
                ${summary.totalSpent.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-textSecondary">Average Order Value</span>
              <span className="font-semibold text-textPrimary">
                ${summary.averageOrderValue.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-3 font-semibold text-textPrimary">Order History</h2>
        {ordersLoading ? (
          <OrdersTableSkeleton />
        ) : (
          <OrdersTable
            orders={orders}
            currentPage={page}
            totalPages={totalPages}
            totalOrders={totalOrders}
            limit={LIMIT}
            onPageChange={setPage}
            showCustomerColumn={false}
          />
        )}
      </div>
    </div>
  );
};

export default CustomerDetailPage;
