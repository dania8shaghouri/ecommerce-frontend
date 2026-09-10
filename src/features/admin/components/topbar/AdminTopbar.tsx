import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiBell, FiSearch, FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../../../../context/Auth/AuthContext";
import { getAdminProducts } from "../../services/adminProductService";
import { getAdminOrders } from "../../services/adminOrderService";
import { getAdminCustomers } from "../../services/adminCustomerService";

interface Props {
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SearchResult {
  id: string;
  label: string;
  sublabel: string;
  type: "product" | "order" | "customer";
  path: string;
}

const AdminTopbar = ({ setIsSidebarOpen }: Props) => {
  const { username } = useAuth();
  const navigate = useNavigate();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isSearchOpen) inputRef.current?.focus();
  }, [isSearchOpen]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsSearching(true);
      try {
        const [productsRes, ordersRes, customersRes] = await Promise.all([
          getAdminProducts({ search: query, limit: 3 }),
          getAdminOrders({ search: query, limit: 3 }),
          getAdminCustomers({ search: query, limit: 3 }),
        ]);

        setResults([
          ...productsRes.data.products.map((p) => ({
            id: p._id,
            label: p.title,
            sublabel: p.category,
            type: "product" as const,
            path: `/admin/products/${p._id}/edit`,
          })),
          ...ordersRes.data.orders.map((o) => ({
            id: o._id,
            label: `#${o.orderNumber}`,
            sublabel: o.userId
              ? `${o.userId.firstName} ${o.userId.lastName}`
              : "",
            type: "order" as const,
            path: `/admin/orders/${o._id}`,
          })),
          ...customersRes.data.customers.map((c) => ({
            id: c._id,
            label: `${c.firstName} ${c.lastName}`,
            sublabel: c.email,
            type: "customer" as const,
            path: `/admin/customers/${c._id}`,
          })),
        ]);
      } catch (error) {
        console.error(error);
      } finally {
        setIsSearching(false);
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const closeSearch = () => {
    setIsSearchOpen(false);
    setQuery("");
    setResults([]);
  };

  const handleSelect = (result: SearchResult) => {
    closeSearch();
    navigate(result.path);
  };

  const typeLabel: Record<SearchResult["type"], string> = {
    product: "Product",
    order: "Order",
    customer: "Customer",
  };

  return (
    <header className="sticky top-0 z-30 flex h-topbar items-center justify-between border-b border-border bg-white px-4 sm:px-6">
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="rounded-xl p-2 hover:bg-slate-100 lg:hidden"
      >
        <FiMenu size={22} />
      </button>

      <div className="hidden lg:block" />

      <div className="flex items-center gap-3">
        <div className="relative" ref={searchRef}>
          {isSearchOpen ? (
            <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 sm:w-[280px]">
              <FiSearch className="shrink-0 text-textSecondary" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-sm outline-none"
              />
              <button
                onClick={closeSearch}
                className="shrink-0 text-textSecondary"
              >
                <FiX size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="rounded-xl bg-background p-3 transition hover:bg-slate-200"
            >
              <FiSearch size={20} />
            </button>
          )}

          {isSearchOpen && query.trim().length >= 2 && (
            <div className="absolute right-0 top-full z-20 mt-2 w-[320px] rounded-xl border border-border bg-white py-2 shadow-dropdown">
              {isSearching ? (
                <p className="px-4 py-3 text-sm text-textSecondary">
                  Searching...
                </p>
              ) : results.length === 0 ? (
                <p className="px-4 py-3 text-sm text-textSecondary">
                  No results found.
                </p>
              ) : (
                results.map((result) => (
                  <button
                    key={`${result.type}-${result.id}`}
                    onClick={() => handleSelect(result)}
                    className="flex w-full items-center justify-between px-4 py-2.5 text-left hover:bg-background"
                  >
                    <div>
                      <p className="text-sm font-medium text-textPrimary">
                        {result.label}
                      </p>
                      <p className="text-xs text-textSecondary">
                        {result.sublabel}
                      </p>
                    </div>
                    <span className="rounded-full bg-background px-2 py-1 text-xs text-textSecondary">
                      {typeLabel[result.type]}
                    </span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        <button className="relative rounded-xl bg-background p-3 transition hover:bg-slate-200">
          <FiBell size={20} />
        </button>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-semibold text-white">
          {username ? username.charAt(0).toUpperCase() : "A"}
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
