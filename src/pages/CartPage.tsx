import { useCart } from "../context/cart/CartContext";
import { useNavigate } from "react-router-dom";
import CartItemCard from "../components/cart/CartItemCard";
import CartSummary from "../components/cart/CartSummary";
import { FiTrash2 } from "react-icons/fi";

const CartPage = () => {
  const {
    cartItems,
    totalAmount,
    updateItemQuantity,
    removeItemFromCart,
    clearCart,
  } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="h-[70vh] flex items-center justify-center">Sepet boş</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between mb-6">
        <h1>My Cart</h1>

        <button onClick={clearCart} className="flex gap-2">
          <FiTrash2 />
          Clear
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-4">
          {cartItems.map((item) => (
            <CartItemCard
              key={item.productId}
              item={item}
              onRemove={removeItemFromCart}
              onUpdate={updateItemQuantity}
              onNavigate={(id) => navigate(`/product/${id}`)}
            />
          ))}
        </div>

        <CartSummary
          total={totalAmount}
          count={cartItems.length}
          onCheckout={() => navigate("/checkout")}
        />
      </div>
    </div>
  );
};

export default CartPage;
