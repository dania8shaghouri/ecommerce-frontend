type OrderStatus = "Paid" | "Pending" | "Failed";

interface Order {
  id: string;
  customer: string;
  status: OrderStatus;
  total: string;
  date: string;
}

const orders: Order[] = [
  {
    id: "#1001",
    customer: "John Doe",
    status: "Paid",
    total: "$120",
    date: "2026-06-15",
  },
  {
    id: "#1002",
    customer: "Jane Smith",
    status: "Pending",
    total: "$80",
    date: "2026-06-14",
  },
  {
    id: "#1003",
    customer: "Alex Brown",
    status: "Failed",
    total: "$200",
    date: "2026-06-13",
  },
];

const statusStyles: Record<OrderStatus, string> = {
  Paid: "bg-green-50 text-green-600 border-green-200",
  Pending: "bg-yellow-50 text-yellow-600 border-yellow-200",
  Failed: "bg-red-50 text-red-600 border-red-200",
};

const RecentOrdersTable = () => {
  return (
    <div className="bg-white border border-border rounded-2xl p-4 overflow-x-auto w-full">
      <h2 className="font-semibold mb-4">Recent Orders</h2>

      <table className="w-full text-sm min-w-[600px]">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="pb-3">Order ID</th>
            <th className="pb-3">Customer</th>
            <th className="pb-3">Date</th>
            <th className="pb-3">Status</th>
            <th className="pb-3">Total</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-t hover:bg-gray-50 transition">
              <td className="py-3 font-medium text-indigo-600">{o.id}</td>
              <td>{o.customer}</td>
              <td className="text-gray-500">{o.date}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded-full text-xs border ${statusStyles[o.status]}`}
                >
                  {o.status}
                </span>
              </td>
              <td className="font-medium">{o.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrdersTable;
