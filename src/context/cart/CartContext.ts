import { useContext, createContext } from "react";
import type { CartItem } from "../../types/CartItem";

interface CartContextType {
  cartItems: CartItem[];
  totalAmount: number;

  addItemToCart: (item: CartItem) => void;
  clearCart: () => void;

  updateItemQuantity: (productId: string, quantity: number) => void;
  removeItemFromCart: (productId: string) => void;
  resetCart: () => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
