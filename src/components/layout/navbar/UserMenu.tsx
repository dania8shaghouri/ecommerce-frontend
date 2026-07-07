import { useEffect, useRef, useState } from "react";
import { FiUser } from "react-icons/fi";

interface Props {
  username: string | null;
  onLogout: () => void;
  onOrders: () => void;
}

const UserMenu = ({ username, onLogout, onOrders }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const close = () => setOpen(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="
          w-10 h-10
          rounded-xl
          bg-background
          text-textPrimary
          flex items-center justify-center
          hover:bg-border
          transition
        "
      >
        <FiUser className="text-xl" />
      </button>

      {open && (
        <div
          className="
            absolute right-0 mt-3
            w-44 bg-white
            border border-border
            rounded-xl
            shadow-dropdown
            overflow-hidden
            animate-fadeIn
          "
        >
          <div className="px-4 py-3 border-b border-border text-sm font-medium">
            {username ?? "Guest"}
          </div>

          <button
            onClick={() => {
              onOrders();
              close();
            }}
            className="w-full text-left px-4 py-3 hover:bg-background text-sm"
          >
            My Orders
          </button>

          <button
            onClick={() => {
              onLogout();
              close();
            }}
            className="w-full text-left px-4 py-3 text-danger hover:bg-background text-sm"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
