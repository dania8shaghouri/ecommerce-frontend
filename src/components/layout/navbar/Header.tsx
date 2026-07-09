import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/Auth/AuthContext";
import { useCart } from "../../../context/cart/CartContext";

import Logo from "./Logo";
import CartButton from "./CartButton";
import UserMenu from "./UserMenu";
import SearchBar from "./SearchBar";

import { FiMenu } from "react-icons/fi";

type HeaderProps = {
  setMenuOpen: (value: boolean) => void;
};

const NAV_ITEMS = [
  { label: "Shop", path: "/shop" },
  { label: "Categories", path: "/categories" },
  { label: "Brands", path: "/brands" },
  { label: "Deals", path: "/deals" },
];

export default function Header({ setMenuOpen }: HeaderProps) {
  const { username, isAuthenticated, logout } = useAuth();
  const { cartItems, resetCart } = useCart();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const go = (path: string) => navigate(path);

  const handleLogout = () => {
    resetCart();
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* LEFT */}
          <Logo onClick={() => go("/")} />

          {/* CENTER */}
          <div className="hidden lg:flex items-center gap-6 text-sm text-textSecondary">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.path}
                onClick={() => go(item.path)}
                className="hover:text-primary transition"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:block w-64">
              <SearchBar />
            </div>

            <CartButton
              count={cartItems.length}
              onClick={() => go("/cart")}
              active={pathname === "/cart"}
            />

            {isAuthenticated ? (
              <UserMenu
                username={username}
                onLogout={handleLogout}
                onOrders={() => go("/my-orders")}
              />
            ) : (
              <button
                onClick={() => go("/login")}
                className="hidden lg:block bg-primary text-white px-4 py-2 rounded-xl"
              >
                Login
              </button>
            )}

            {/* MOBILE MENU */}
            <button
              className="lg:hidden text-2xl"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <FiMenu />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
