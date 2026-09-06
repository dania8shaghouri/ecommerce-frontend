import { useCallback, useEffect, useState } from "react";
import { getAdminCustomers } from "../../admin/services/adminCustomerService";
import type {
  AdminCustomer,
  AdminCustomerFilters,
} from "../../admin/types/adminCustomer";
import CustomersTable from "../../admin/components/customers/CustomersTable";
import CustomersToolbar from "../../admin/components/customers/CustomersToolbar";
import CustomersTableSkeleton from "../../admin/components/customers/CustomersTableSkeleton";

const LIMIT = 10;

const CustomersPage = () => {
  const [customers, setCustomers] = useState<AdminCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<AdminCustomerFilters>({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCustomers, setTotalCustomers] = useState(0);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAdminCustomers({
        ...filters,
        page,
        limit: LIMIT,
      });
      setCustomers(response.data.customers);
      setTotalPages(response.data.totalPages);
      setTotalCustomers(response.data.totalCustomers);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  useEffect(() => {
    const timeoutId = setTimeout(fetchCustomers, 400);
    return () => clearTimeout(timeoutId);
  }, [fetchCustomers]);

  const handleFilterChange = (newFilters: AdminCustomerFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-textSecondary">Dashboard / Customers</p>
        <h1 className="mt-1 text-2xl font-semibold text-textPrimary">
          Customers
        </h1>
        <p className="mt-1 text-sm text-textSecondary">
          Manage and view your customer information.
        </p>
      </div>

      <CustomersToolbar filters={filters} onFilterChange={handleFilterChange} />

      {loading ? (
        <CustomersTableSkeleton />
      ) : (
        <CustomersTable
          customers={customers}
          currentPage={page}
          totalPages={totalPages}
          totalCustomers={totalCustomers}
          limit={LIMIT}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default CustomersPage;
