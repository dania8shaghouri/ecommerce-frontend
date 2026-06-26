interface Props {
  total: number;
  count: number;
  onCheckout: () => void;
}

const CartSummary = ({ total, count, onCheckout }: Props) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 h-fit sticky top-24">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      <div className="flex justify-between mb-3">
        <span>Items</span>
        <span>{count}</span>
      </div>

      <div className="flex justify-between mb-4 font-bold">
        <span>Total</span>
        <span>₺{total.toLocaleString()}</span>
      </div>

      <button
        onClick={onCheckout}
        className="w-full bg-primary text-white py-2 rounded-lg"
      >
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;