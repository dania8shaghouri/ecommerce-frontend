import axios from "axios";
import { BASE_URL } from "../constants/baseUrl";
import type { WishlistItem, WishlistResponse } from "../types/Wishlist";

export const getWishlist = (token: string) => {
  return axios.get<WishlistItem[]>(`${BASE_URL}/wishlist`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const checkWishlist = (token: string, productId: string) => {
  return axios.get<{
    isWishlisted: boolean;
  }>(`${BASE_URL}/wishlist/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const toggleWishlist = (token: string, productId: string) => {
  return axios.post<WishlistResponse>(
    `${BASE_URL}/wishlist/${productId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
