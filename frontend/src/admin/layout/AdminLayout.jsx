import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar.jsx";
import AdminTopbar from "./AdminTopbar.jsx";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-background text-textPrimary">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row">
        <AdminSidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
        {isSidebarOpen ? (
          <button
            type="button"
            aria-label="Close navigation overlay"
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            onClick={handleCloseSidebar}
          />
        ) : null}
        <div className="flex flex-1 flex-col gap-6">
          <AdminTopbar onMenuToggle={handleToggleSidebar} />
          <main className="flex-1 rounded-3xl border border-border bg-card-gradient p-6 shadow-card-ambient">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
