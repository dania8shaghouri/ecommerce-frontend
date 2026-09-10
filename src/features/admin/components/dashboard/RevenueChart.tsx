import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { MonthlyRevenuePoint } from "../../types/adminDashboard";

interface Props {
  data: MonthlyRevenuePoint[];
}

const RevenueChart = ({ data }: Props) => {
  return (
    <div className="bg-white border border-border rounded-2xl p-4 h-[320px]">
      <h2 className="font-semibold mb-4">Sales Overview</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip
            formatter={(value) => [
              `$${Number(value).toLocaleString()}`,
              "Revenue",
            ]}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#4F46E5"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
