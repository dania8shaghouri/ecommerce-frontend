import axios from "axios";
import { BASE_URL } from "../constants/baseUrl";
import type { Shipping } from "../types/order";

export const getCart = (token: string) =>
  axios.get(`${BASE_URL}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addToCart = (
  token: string,
  data: { productId: string; quantity: number },
) =>
  axios.post(`${BASE_URL}/cart/items`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateCartItem = (
  token: string,
  data: { productId: string; quantity: number },
) =>
  axios.put(`${BASE_URL}/cart/items`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const removeCartItem = (token: string, productId: string) =>
  axios.delete(`${BASE_URL}/cart/items/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const clearCartRequest = (token: string) =>
  axios.delete(`${BASE_URL}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// export const checkoutRequest = (token: string, shipping: Shipping) =>
//   axios.post(
//     `${BASE_URL}/cart/checkout`,
//     { shipping },
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     },
//   );

export const checkoutRequest = (
  token: string,
  data: { shipping: Shipping }
) =>
  axios.post(
    `${BASE_URL}/cart/checkout`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );