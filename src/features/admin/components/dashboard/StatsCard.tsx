import type { IconType } from "react-icons";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: IconType;
  iconColor: string;
  iconBg: string;
}

const StatsCard = ({
  title,
  value,
  change,
  icon: Icon,
  iconColor,
  iconBg,
}: StatsCardProps) => {
  return (
    <div className="bg-white border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-4 min-w-0">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}
        >
          <Icon size={22} className={iconColor} />
        </div>

        <div className="flex flex-col min-w-0">
          <p className="text-sm text-gray-500">{title}</p>

          <h3 className="text-2xl font-bold leading-tight">{value}</h3>

          <span className="text-sm text-green-500 font-medium">
            {change}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;