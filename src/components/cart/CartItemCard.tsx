import { FiTrash2 } from "react-icons/fi";
import { BASE_URL } from "../../constants/baseUrl";
import type { CartItem } from "../../types/CartItem";

interface Props {
  item: CartItem;
  onRemove: (id: string) => void;
  onUpdate: (id: string, qty: number) => void;
  onNavigate: (id: string) => void;
}

const CartItemCard = ({ item, onRemove, onUpdate, onNavigate }: Props) => {
  return (
    <div
      onClick={() => onNavigate(item.productId)}
      className="relative flex items-center justify-between bg-white shadow-md rounded-xl p-4 hover:cursor-pointer"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(item.productId);
        }}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
      >
        <FiTrash2 />
      </button>

      <div className="flex items-center gap-4">
        <img
          src={`${BASE_URL}/images/${item.productImage}`}
          className="w-20 h-20 object-contain"
        />

        <div>
          <h2 className="font-semibold">{item.title}</h2>

          <p className="text-gray-500 text-sm">
            ₺{item.unitPrice.toLocaleString()}
          </p>

          <div className="flex gap-2 mt-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (item.quantity === 1) onRemove(item.productId);
                else onUpdate(item.productId, item.quantity - 1);
              }}
            >
              -
            </button>

            <span>{item.quantity}</span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onUpdate(item.productId, item.quantity + 1);
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <span className="font-semibold">
        ₺{(item.unitPrice * item.quantity).toLocaleString()}
      </span>
    </div>
  );
};

export default CartItemCard;