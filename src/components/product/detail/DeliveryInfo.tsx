import { FiTruck, FiRefreshCw, FiShield } from "react-icons/fi";

const DeliveryInfo = () => {
  return (
    <div
      className="
        mt-8
        grid
        grid-cols-3
        rounded-2xl
        border
        border-gray-200
        bg-gray-50
        p-5
      "
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <FiTruck size={22} className="text-primary" />

        <span className="text-sm font-medium">Free Shipping</span>
      </div>

      <div className="flex flex-col items-center gap-2 border-x border-gray-200 text-center">
        <FiRefreshCw size={22} className="text-primary" />

        <span className="text-sm font-medium">30 Day Returns</span>
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <FiShield size={22} className="text-primary" />

        <span className="text-sm font-medium">Secure Payment</span>
      </div>
    </div>
  );
};

export default DeliveryInfo;
