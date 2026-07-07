import { FiShoppingCart } from "react-icons/fi";

interface Props {
  count: number;
  onClick: () => void;
  active?: boolean;
}

const formatCartCount = (count: number) => {
  return count > 99 ? "99+" : count;
};

const CartButton = ({ count, onClick, active }: Props) => {
  const hasItems = count > 0;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Shopping cart"
      aria-busy={false}
      className={`
        relative
        flex
        items-center
        justify-center
        w-10
        h-10
        rounded-xl
        transition
        hover:bg-background
        hover:scale-105
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-primary

        ${active ? "text-primary bg-background" : "text-textPrimary"}
      `}
    >
      <FiShoppingCart className="text-xl" />

      {hasItems && (
        <span
          aria-label={`Cart items: ${count}`}
          className="
            absolute
            -top-1
            -right-1
            bg-primary
            text-white
            text-xs
            font-bold
            w-5
            h-5
            rounded-full
            flex
            items-center
            justify-center
          "
        >
          {formatCartCount(count)}
        </span>
      )}
    </button>
  );
};

export default CartButton;
