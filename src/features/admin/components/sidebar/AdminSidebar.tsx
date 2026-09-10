import {
  FiGrid,
  FiPackage,
  FiShoppingCart,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiX,
  FiArrowLeft,
} from "react-icons/fi";

import { NavLink } from "react-router-dom";

interface Props {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const menuItems = [
  { label: "Dashboard", icon: FiGrid, path: "/admin/dashboard" },
  { label: "Products", icon: FiPackage, path: "/admin/products" },
  { label: "Orders", icon: FiShoppingCart, path: "/admin/orders" },
  { label: "Customers", icon: FiUsers, path: "/admin/customers" },
  { label: "Analytics", icon: FiBarChart2, path: "/admin/analytics" },
  { label: "Settings", icon: FiSettings, path: "/admin/settings" },
];

const AdminSidebar = ({ isSidebarOpen, setIsSidebarOpen }: Props) => {
  return (
    <aside
      className={`
        fixed left-0 top-0 z-50 flex h-screen w-sidebar flex-col
        bg-sidebar border-r border-slate-800
        transition-transform duration-300

        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}

        lg:translate-x-0
      `}
    >
      {/* HEADER */}
      <div className="flex h-topbar shrink-0 items-center justify-between border-b border-slate-800 px-6">
        <div className="flex items-center gap-2 text-lg font-semibold text-white">
          <FiShoppingCart className="text-2xl" />
          <span>NOVATECH</span>
        </div>

        <button
          onClick={() => setIsSidebarOpen(false)}
          className="text-white lg:hidden"
        >
          <FiX size={24} />
        </button>
      </div>

      {/* MENU */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    `
                    flex items-center gap-3 rounded-xl px-4 py-3
                    transition-all duration-200

                    ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-slate-300 hover:bg-sidebarHover hover:text-white"
                    }
                  `
                  }
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* BACK TO STORE */}
      <div className="shrink-0 border-t border-slate-800 p-4">
        <NavLink
          to="/"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition-all duration-200 hover:bg-sidebarHover hover:text-white"
        >
          <FiArrowLeft size={20} />
          <span className="font-medium">Back to Store</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default AdminSidebar;
