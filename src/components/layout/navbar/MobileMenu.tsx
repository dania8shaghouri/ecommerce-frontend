import {
  FiX,
  FiShoppingCart,
  FiPackage,
  FiLogIn,
  FiLogOut,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { NAV_ITEMS } from "../../../shared/constants/navItems";
import { useAuth } from "../../../context/Auth/AuthContext";
import Logo from "./Logo";

type MobileMenuProps = {
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
};

export default function MobileMenu({ menuOpen, setMenuOpen }: MobileMenuProps) {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const go = (path: string) => {
    navigate(path);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <div
      className={`
        fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-xl
        transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "translate-x-full"}
        flex flex-col
      `}
    >
      {/* TOP BAR */}
      <div className="relative flex justify-end px-4 py-8">
        {/* CLOSE BUTTON  */}
        <button
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          className="
            absolute top-4 right-4
            w-7 h-7
            rounded-full
            border border-blue-300
            text-blue-500
            flex items-center justify-center
            hover:bg-blue-50
            transition
          "
        >
          <FiX className="text-sm" />
        </button>
      </div>

      {/* LOGO SECTION (CLEAN VERSION) */}
      <div className="flex flex-col items-center justify-center gap-2 pb-6 ">
        <Logo onClick={() => navigate("/")} />
        <div className="text-sm font-semibold">
          Byte<span className="text-primary">Store</span>
        </div>
      </div>

      {/* NAV */}
      <div className="flex flex-col px-5 py-5 gap-1 text-sm text-textSecondary">
        {/* MAIN NAV */}
        {NAV_ITEMS.map((item) => (
          <button
            key={item.path}
            onClick={() => go(item.path)}
            className="
              text-left py-2
              hover:text-primary
              transition
            "
          >
            {item.label}
          </button>
        ))}

        {/* DIVIDER */}
        <div className="my-3 border-t border-blue-200" />

        {/* CART */}
        <button
          onClick={() => go("/cart")}
          className="flex items-center gap-2 py-2 hover:text-primary transition"
        >
          <FiShoppingCart className="text-primary" />
          <span>Cart</span>
        </button>

        {/* ORDERS */}
        <button
          onClick={() => go("/my-orders")}
          className="flex items-center gap-2 py-2 hover:text-primary transition"
        >
          <FiPackage className="text-primary" />
          <span>Orders</span>
        </button>

        <div className="my-3 border-t border-blue-200" />

        {/* AUTH */}
        {!isAuthenticated ? (
          <button
            onClick={() => go("/login")}
            className="flex items-center gap-2 py-2 text-primary hover:opacity-80 transition"
          >
            <FiLogIn />
            <span>Login</span>
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 py-2 text-red-500 hover:opacity-80 transition"
          >
            <FiLogOut />
            <span>Logout</span>
          </button>
        )}
      </div>
    </div>
  );
}
