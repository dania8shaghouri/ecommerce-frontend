import { useCart } from "../context/cart/CartContext";
import { useState } from "react";
import toast from "react-hot-toast";
import { checkoutRequest } from "../services/cartService";
import Loading from "../components/ui/Loading";
import CheckoutItems from "../components/checkout/CheckoutItems";
import ShippingForm from "../components/checkout/ShippingForm";
import type { CheckoutFormData } from "../validation/checkoutSchema";

const CheckoutPage = () => {
  const { cartItems, totalAmount } = useCart();

  const [loading, setLoading] = useState(false);

  const handleCheckout = async (data: CheckoutFormData) => {
    setLoading(true);

    try {
      const response = await checkoutRequest({ shipping: data });
      const { checkoutUrl } = response.data;
      window.location.href = checkoutUrl;
    } catch {
      toast.error("Checkout failed");
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (cartItems.length === 0) return <div>Cart is empty</div>;

  const totalItems = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  console.log(totalAmount, totalItems);
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl mb-6">Checkout</h1>

      <CheckoutItems items={cartItems} />

      <ShippingForm onSubmit={handleCheckout} />
    </div>
  );
};

export default CheckoutPage;
