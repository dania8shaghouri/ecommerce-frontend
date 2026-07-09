import api from "../api/axios";
import type { WishlistItem, WishlistResponse } from "../types/Wishlist";

export const getWishlist = () => {
  return api.get<WishlistItem[]>("/wishlist");
};

export const checkWishlist = (productId: string) => {
  return api.get<{
    isWishlisted: boolean;
  }>(`/wishlist/check/${productId}`);
};

export const toggleWishlist = (productId: string) => {
  return api.post<WishlistResponse>(`/wishlist/${productId}`, {});
};
