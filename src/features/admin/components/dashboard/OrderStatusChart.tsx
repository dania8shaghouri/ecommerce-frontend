import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import type { OrderStatusBreakdownItem } from "../../types/adminDashboard";

interface Props {
  data: OrderStatusBreakdownItem[];
}

const STATUS_COLORS: Record<string, string> = {
  pending: "#F59E0B",
  processing: "#3B82F6",
  shipped: "#8B5CF6",
  delivered: "#10B981",
  cancelled: "#EF4444",
};

const formatLabel = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const OrderStatusChart = ({ data }: Props) => {
  const chartData = data.map((d) => ({
    name: formatLabel(d.status),
    value: d.count,
    status: d.status,
  }));

  return (
    <div className="bg-white border border-border rounded-2xl p-4 h-[320px]">
      <h2 className="font-semibold mb-4">Order Status</h2>

      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
          >
            {chartData.map((entry) => (
              <Cell
                key={entry.status}
                fill={STATUS_COLORS[entry.status] ?? "#9CA3AF"}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="vertical" align="right" verticalAlign="middle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrderStatusChart;
