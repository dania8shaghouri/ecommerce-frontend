import { FiBell, FiSearch, FiMenu } from "react-icons/fi";

interface Props {
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminTopbar = ({ setIsSidebarOpen }: Props) => {
  return (
    <header
      className="
        sticky top-0 z-30 flex h-topbar
        items-center justify-between
        border-b border-border
        bg-white px-4 sm:px-6
      "
    >
      <div className="flex items-center gap-4">
        {/* MOBILE MENU */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="
            rounded-xl p-2 hover:bg-slate-100
            lg:hidden
          "
        >
          <FiMenu size={22} />
        </button>

        {/* SEARCH */}
        <div
          className="
            hidden sm:flex items-center gap-3
            rounded-xl border border-border
            bg-background px-4 py-2
            w-[320px]
          "
        >
          <FiSearch className="text-textSecondary" />

          <input
            type="text"
            placeholder="Search..."
            className="
              w-full bg-transparent
              text-sm outline-none
            "
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <button
          className="
            relative rounded-xl bg-background
            p-3 transition hover:bg-slate-200
          "
        >
          <FiBell size={20} />
        </button>

        <div className="flex items-center gap-3">
          <div
            className="
              flex h-10 w-10 items-center
              justify-center rounded-full
              bg-primary font-semibold text-white
            "
          >
            A
          </div>

          <div className="hidden sm:block">
            <p className="font-medium text-textPrimary">Admin</p>

            <p className="text-sm text-textSecondary">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
