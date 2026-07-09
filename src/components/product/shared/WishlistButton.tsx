import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";

import { useWishlist } from "../../../context/Wishlist/WishlistContext";
import { useAuth } from "../../../context/Auth/AuthContext";

interface Props {
  productId: string;
}

const WishlistButton = ({ productId }: Props) => {
  const { isAuthenticated } = useAuth();

  const { isWishlisted, toggleWishlist } = useWishlist();

  const handleClick = () => {
    if (!isAuthenticated) {
      toast("Please login to use wishlist ❤️", {
        
      });

      return;
    }

    toggleWishlist(productId);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="
        absolute
        right-4
        top-4
        z-20
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        bg-white/90
        shadow-md
        backdrop-blur
        transition-all
        duration-300
        hover:scale-110
      "
    >
      {isWishlisted(productId) ? (
        <FaHeart size={18} className="text-red-500" />
      ) : (
        <FiHeart size={18} className="text-gray-700 hover:text-red-500" />
      )}
    </button>
  );
};

export default WishlistButton;
