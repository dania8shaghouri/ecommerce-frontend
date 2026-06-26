import { Outlet } from "react-router-dom";
import { useState } from "react";

import AdminSidebar from "../components/sidebar/AdminSidebar";
import AdminTopbar from "../components/topbar/AdminTopbar";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="
            fixed inset-0 z-40 bg-black/50
            lg:hidden
          "
        />
      )}

      <AdminSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="min-h-screen lg:ml-sidebar">
        <AdminTopbar setIsSidebarOpen={setIsSidebarOpen} />

        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
