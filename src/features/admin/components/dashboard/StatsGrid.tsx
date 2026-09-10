import StatsCard from "./StatsCard";
import {
  FiDollarSign,
  FiShoppingCart,
  FiUsers,
  FiPackage,
} from "react-icons/fi";
import type { DashboardSummary } from "../../types/adminDashboard";

interface Props {
  summary: DashboardSummary;
}

const formatChange = (pct: number | null) => {
  if (pct === null) return { label: "New", trend: "neutral" as const };
  const trend = pct >= 0 ? ("up" as const) : ("down" as const);
  const sign = pct >= 0 ? "+" : "";
  return { label: `${sign}${pct.toFixed(1)}% vs last month`, trend };
};

const StatsGrid = ({ summary }: Props) => {
  const revenueChange = formatChange(summary.revenueChangePct);
  const ordersChange = formatChange(summary.ordersChangePct);
  const customersChange = formatChange(summary.customersChangePct);
  const productsChange = formatChange(summary.productsChangePct);

  const stats = [
    {
      title: "Total Revenue",
      value: `$${summary.totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      change: revenueChange.label,
      trend: revenueChange.trend,
      icon: FiDollarSign,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
    },
    {
      title: "Total Orders",
      value: summary.totalOrders.toLocaleString("en-US"),
      change: ordersChange.label,
      trend: ordersChange.trend,
      icon: FiShoppingCart,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
    },
    {
      title: "Total Customers",
      value: summary.totalCustomers.toLocaleString("en-US"),
      change: customersChange.label,
      trend: customersChange.trend,
      icon: FiUsers,
      iconColor: "text-violet-600",
      iconBg: "bg-violet-50",
    },
    {
      title: "Total Products",
      value: summary.totalProducts.toLocaleString("en-US"),
      change: productsChange.label,
      trend: productsChange.trend,
      icon: FiPackage,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((item) => (
        <StatsCard key={item.title} {...item} />
      ))}
    </div>
  );
};

export default StatsGrid;
