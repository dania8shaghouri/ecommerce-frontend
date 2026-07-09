import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import toast from "react-hot-toast";

import { WishlistContext } from "./WishlistContext";
import { useAuth } from "../Auth/AuthContext";

import type { WishlistItem } from "../../types/Wishlist";

import {
  getWishlist,
  toggleWishlist as toggleWishlistRequest,
} from "../../services/wishlistService";

const WishlistProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = useAuth();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = async () => {
    if (!token) return;

    try {
      setLoading(true);

      const { data } = await getWishlist();

      setWishlist(data);
    } catch {
      toast.error("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [token]);

  const isWishlisted = (productId: string) => {
    return wishlist.some((item) => item.product._id === productId);
  };

  const toggleWishlist = async (productId: string) => {
    if (!token) return;

    try {
      const { data } = await toggleWishlistRequest(productId);

      await fetchWishlist();

      toast.success(data.message);
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        fetchWishlist,
        isWishlisted,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
