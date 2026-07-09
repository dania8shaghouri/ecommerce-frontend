interface Props {
  totalItems: number;
  totalAmount: number;
  loading: boolean;
  onCheckout: () => void | Promise<void>;
}

const CheckoutSummary = ({
  totalItems,
  totalAmount,
  loading,
  onCheckout,
}: Props) => {
  return (
    <div className="mt-6 bg-white p-5 rounded-xl shadow-md">
      <h2 className="mb-4 font-semibold">Summary</h2>

      <div className="flex justify-between">
        <span>Total Items</span>
        <span>{totalItems}</span>
      </div>

      <div className="flex justify-between text-xl font-bold mt-2">
        <span>Total</span>
        <span>₺{totalAmount}</span>
      </div>

      <button
        onClick={onCheckout}
        disabled={loading}
        className="mt-4 w-full bg-primary text-white py-3 rounded-lg"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default CheckoutSummary;
