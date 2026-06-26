import { useEffect, useRef, useState } from "react";

interface Props {
  username: string | null;
  onLogout: () => void;
  onOrders: () => void;
}

const getInitial = (username: string | null) =>
  username ? username.charAt(0).toUpperCase() : "?";

const UserMenu = ({ username, onLogout, onOrders }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  //  dışarı tıklayınca kapan
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ESC ile kapatma
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-9 h-9 rounded-full bg-white text-primary flex items-center justify-center font-semibold hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-white"
      >
        {getInitial(username)}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-md overflow-hidden animate-fadeIn">
          <button
            onClick={() => {
              onOrders();
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            My Orders
          </button>

          <button
            onClick={() => {
              onLogout();
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
