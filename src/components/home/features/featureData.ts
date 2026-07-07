import { FiTruck, FiHeadphones, FiShield, FiRefreshCw } from "react-icons/fi";

import type { IconType } from "react-icons";

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: IconType;
}

export const features: Feature[] = [
  {
    id: 1,
    title: "Free Shipping",
    description: "Free delivery on eligible orders.",
    icon: FiTruck,
  },
  {
    id: 2,
    title: "24/7 Support",
    description: "Always here whenever you need help.",
    icon: FiHeadphones,
  },
  {
    id: 3,
    title: "Secure Payment",
    description: "SSL protected secure checkout.",
    icon: FiShield,
  },
  {
    id: 4,
    title: "Easy Returns",
    description: "30 day money back guarantee.",
    icon: FiRefreshCw,
  },
];
