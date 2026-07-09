import { useCart } from "../context/cart/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/Auth/AuthContext";
import toast from "react-hot-toast";
import { checkoutRequest } from "../services/cartService";
import Loading from "../components/ui/Loading";
import CheckoutItems from "../components/checkout/CheckoutItems";
import ShippingForm from "../components/checkout/ShippingForm";
import type { CheckoutFormData } from "../validation/checkoutSchema";

const CheckoutPage = () => {
  const { cartItems, totalAmount, clearCart } = useCart();
  // const { token } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleCheckout = async (data: CheckoutFormData) => {
    setLoading(true);

    try {
      await checkoutRequest({
        shipping: data,
      });

      await clearCart();

      toast.success("Order placed successfully");
      navigate("/order-success");
    } catch {
      toast.error("Checkout failed");
    } finally {
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
