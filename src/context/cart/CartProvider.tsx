import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import { CartContext } from "./CartContext";
import type { CartItem } from "../../types/CartItem";
import { useAuth } from "../Auth/AuthContext";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCartRequest,
} from "../../services/cartService";
import toast from "react-hot-toast";

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  type BackendCartItem = {
    product: {
      _id: string;
      title: string;
      image: string;
    };
    quantity: number;
    unitPrice: number;
  };

  type BackendCart = {
    items: BackendCartItem[];
    totalAmount: number;
  };

  const mapBackendItem = (i: BackendCartItem): CartItem => ({
    productId: i.product._id,
    title: i.product.title,
    unitPrice: i.unitPrice,
    quantity: i.quantity,
    productImage: i.product.image,
  });

  const syncCart = async () => {
    if (!token) return;

    const { data } = await getCart();
    const backendCart = data as BackendCart;

    setCartItems(backendCart.items.map(mapBackendItem));
    setTotalAmount(backendCart.totalAmount);
  };

  const resetCart = () => {
    setCartItems([]);
    setTotalAmount(0);
  };

  useEffect(() => {
    if (!token) return;

    syncCart();
  }, [token]);

  const addItemToCart = async (item: CartItem) => {
    try {
      await addToCart({
        productId: item.productId,
        quantity: item.quantity,
      });

      await syncCart();

      toast.success("Product added to cart");
    } catch {
      toast.error("Failed to add product");
    }
  };

  const updateItemQuantity = async (productId: string, quantity: number) => {
    try {
      await updateCartItem({ productId, quantity });
      await syncCart();
      toast.success("Cart updated");
    } catch {
      toast.error("Failed to update cart");
    }
  };

  const removeItemFromCart = async (productId: string) => {
    try {
      await removeCartItem(productId);

      await syncCart();

      toast.success("Item removed from cart");
    } catch {
      toast.error("Failed to remove item");
    }
  };

  const clearCart = async () => {
    try {
      await clearCartRequest();
      resetCart();

      toast.success("Cart cleared");
    } catch {
      toast.error("Failed to clear cart");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalAmount,
        addItemToCart,
        clearCart,
        updateItemQuantity,
        removeItemFromCart,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
