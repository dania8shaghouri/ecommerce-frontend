import { FiMinus, FiPlus } from "react-icons/fi";

interface QuantitySelectorProps {
  quantity: number;
  increase: () => void;
  decrease: () => void;
}

const QuantitySelector = ({
  quantity,
  increase,
  decrease,
}: QuantitySelectorProps) => {
  return (
    <div className="flex h-14 overflow-hidden rounded-2xl border border-gray-200">
      <button
        onClick={decrease}
        className="
          flex
          h-full
          w-12
          items-center
          justify-center
          transition
          hover:bg-gray-100
        "
      >
        <FiMinus />
      </button>

      <div
        className="
          flex
          w-16
          items-center
          justify-center
          border-x
          border-gray-200
          font-semibold
        "
      >
        {quantity}
      </div>

      <button
        onClick={increase}
        className="
          flex
          h-full
          w-12
          items-center
          justify-center
          transition
          hover:bg-gray-100
        "
      >
        <FiPlus />
      </button>
    </div>
  );
};

export default QuantitySelector;