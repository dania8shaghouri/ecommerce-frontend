import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface OrderStatusData {
  name: string;
  value: number;
}

const data: OrderStatusData[] = [
  {
    name: "Paid",
    value: 70,
  },
  {
    name: "Pending",
    value: 20,
  },
  {
    name: "Failed",
    value: 10,
  },
];

const COLORS = [
  "#10B981",
  "#F59E0B",
  "#EF4444",
];

const OrderStatusChart = () => {
  return (
    <div className="bg-white border border-border rounded-2xl p-4 h-[320px]">
      <h2 className="font-semibold mb-4">
        Order Status
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrderStatusChart;