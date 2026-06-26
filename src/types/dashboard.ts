import type { IconType } from "react-icons";

export interface RevenueData {
  name: string;
  revenue: number;
}

export interface StatItem {
  title: string;
  value: string;
  change: string;
  icon: IconType;
  iconColor: string;
  iconBg: string;
}

export interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: IconType;
  iconColor: string;
  iconBg: string;
}