import { BASE_URL } from "../../constants/baseUrl";
import type { CartItem } from "../../types/CartItem";

interface Props {
  items: CartItem[];
}

const CheckoutItems = ({ items }: Props) => {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden">
      <div className="grid grid-cols-5 gap-4 p-4 border-b text-sm font-semibold text-gray-500">
        <span className="col-span-2">Product</span>
        <span>Price</span>
        <span>Qty</span>
        <span className="text-right">Total</span>
      </div>

      {items.map((item) => (
        <div
          key={item.productId}
          className="grid grid-cols-5 gap-4 p-4 items-center border-b"
        >
          <div className="col-span-2 flex items-center gap-4">
            <img
              src={`${BASE_URL}/images/${item.productImage}`}
              className="w-16 h-16 object-contain"
            />
            <span>{item.title}</span>
          </div>

          <span>₺{item.unitPrice}</span>
          <span>{item.quantity}</span>

          <span className="text-right">₺{item.unitPrice * item.quantity}</span>
        </div>
      ))}
    </div>
  );
};

export default CheckoutItems;
