import { FiCheckCircle, FiXCircle } from "react-icons/fi";

interface Props {
  stock: number;
}

const ProductAvailability = ({ stock }: Props) => {
  const inStock = stock > 0;

  return (
    <div className="flex items-center gap-2">
      {inStock ? (
        <FiCheckCircle className="text-green-500" size={18} />
      ) : (
        <FiXCircle className="text-red-500" size={18} />
      )}

      <span
        className={`font-medium ${
          inStock ? "text-green-600" : "text-red-500"
        }`}
      >
        {inStock ? `${stock} available` : "Out of stock"}
      </span>
    </div>
  );
};

export default ProductAvailability;