import { FiShoppingCart } from "react-icons/fi";

interface Props {
  onClick: () => void;
}

const Logo = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-white font-semibold text-lg focus:outline-none"
    >
      <FiShoppingCart className="text-2xl" />
      <span className="hidden sm:block">Shop</span>
    </button>
  );
};

export default Logo;