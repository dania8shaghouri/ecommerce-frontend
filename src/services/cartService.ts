import api from "../api/axios";
import type { Shipping } from "../types/order";

export const getCart = () => api.get("/cart");

export const addToCart = (data: { productId: string; quantity: number }) =>
  api.post("/cart/items", data);

export const updateCartItem = (data: { productId: string; quantity: number }) =>
  api.put("/cart/items", data);

export const removeCartItem = (productId: string) =>
  api.delete(`/cart/items/${productId}`);

export const clearCartRequest = () => api.delete("/cart");

// export const checkoutRequest = (token: string, shipping: Shipping) =>
//   axios.post(
//     `${BASE_URL}/cart/checkout`,
//     { shipping },
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     },
//   );

export const checkoutRequest = (data: { shipping: Shipping }) =>
  api.post("/cart/checkout", data);
