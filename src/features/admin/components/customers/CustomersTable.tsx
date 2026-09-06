import { Link } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import type { AdminCustomer } from "../../types/adminCustomer";
import EmptyState from "../../../../components/ui/EmptyState";
import Pagination from "../../../../components/ui/Paigination";

interface Props {
  customers: AdminCustomer[];
  currentPage: number;
  totalPages: number;
  totalCustomers: number;
  limit: number;
  onPageChange: (page: number) => void;
}

const getInitials = (firstName: string, lastName: string) =>
  `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

const CustomersTable = ({
  customers,
  currentPage,
  totalPages,
  totalCustomers,
  limit,
  onPageChange,
}: Props) => {
  if (customers.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-white shadow-sm">
        <EmptyState message="No customers found matching your search." />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border bg-background text-xs uppercase tracking-wide text-textSecondary">
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Orders</th>
              <th className="px-6 py-4 font-medium">Total Spent</th>
              <th className="px-6 py-4 font-medium">Joined</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer._id}
                className="border-b border-border last:border-0 hover:bg-background/60"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                      {getInitials(customer.firstName, customer.lastName)}
                    </div>
                    <p className="font-medium text-textPrimary">
                      {customer.firstName} {customer.lastName}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-4 text-textSecondary">
                  {customer.email}
                </td>
                <td className="px-6 py-4 text-textSecondary">
                  {customer.totalOrders} orders
                </td>
                <td className="px-6 py-4 font-medium text-textPrimary">
                  ${customer.totalSpent.toFixed(2)}
                </td>

                <td className="px-6 py-4 text-textSecondary">
                  {customer.createdAt
                    ? new Date(customer.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "—"}
                </td>

                <td className="px-6 py-4 text-right">
                  <Link
                    to={`/admin/customers/${customer._id}`}
                    className="inline-flex rounded-lg p-2 text-textSecondary hover:bg-background"
                  >
                    <FiEye size={18} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalCustomers}
        limit={limit}
        onPageChange={onPageChange}
        itemLabel="customers"
      />
    </div>
  );
};

export default CustomersTable;
