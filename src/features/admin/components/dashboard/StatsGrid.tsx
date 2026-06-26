import StatsCard from "./StatsCard";
import {
  FiDollarSign,
  FiShoppingCart,
  FiUsers,
  FiPackage,
} from "react-icons/fi";

import type { IconType } from "react-icons";

interface StatItem {
  title: string;
  value: string;
  change: string;
  icon: IconType;
  iconColor: string;
  iconBg: string;
}

const stats: StatItem[] = [
  {
    title: "Total Revenue",
    value: "$24,780",
    change: "+12.5%",
    icon: FiDollarSign,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
  },
  {
    title: "Orders",
    value: "1,458",
    change: "+8.2%",
    icon: FiShoppingCart,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
  },
  {
    title: "Customers",
    value: "2,345",
    change: "+10.1%",
    icon: FiUsers,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
  },
  {
    title: "Products",
    value: "856",
    change: "+5.4%",
    icon: FiPackage,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-50",
  },
];

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((item) => (
        <StatsCard key={item.title} {...item} />
      ))}
    </div>
  );
};

export default StatsGrid;
