import { useCart } from "../context/Auth/cart/CartContext";
import type { Product } from "../types/Product";

export const useAddToCart = () => {
  const { addItemToCart } = useCart();

  const addToCart = (product: Product, quantity: number = 1) => {
    if (!product) return;

    addItemToCart({
      productId: product._id,
      title: product.title,
      unitPrice: product.price,
      quantity,
      productImage: product.image,
    });
  };

  return { addToCart };
};
