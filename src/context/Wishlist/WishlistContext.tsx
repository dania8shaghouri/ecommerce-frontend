import { createContext, useContext } from "react";
import type { WishlistItem } from "../../types/Wishlist";

interface WishlistContextType {
  wishlist: WishlistItem[];

  loading: boolean;

  fetchWishlist: () => Promise<void>;

  isWishlisted: (productId: string) => boolean;

  toggleWishlist: (productId: string) => Promise<void>;
}

export const WishlistContext = createContext<WishlistContextType>({
  wishlist: [],

  loading: false,

  fetchWishlist: async () => {},

  isWishlisted: () => false,

  toggleWishlist: async () => {},
});

export const useWishlist = () => useContext(WishlistContext);
