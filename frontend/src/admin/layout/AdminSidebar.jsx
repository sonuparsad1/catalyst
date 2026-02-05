import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/admin/dashboard" },
  { label: "Events", to: "/admin/events" },
  { label: "Tickets", to: "/admin/tickets" },
  { label: "Attendance", to: "/admin/attendance" },
  { label: "Scan", to: "/admin/scan" },
  { label: "Members", to: "/admin/members" },
  { label: "Settings", to: "/admin/settings" },
];

const AdminSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path) => {
    navigate(path);
    if (onClose) {
      onClose();
    }
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-72 transform rounded-r-3xl border border-border bg-card-gradient p-5 shadow-card-ambient transition duration-200 lg:static lg:translate-x-0 lg:rounded-3xl ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      aria-label="Admin navigation"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            Admin panel
          </p>
          <h1 className="text-xl font-semibold text-textPrimary">
            Catalyst Society
          </h1>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-border px-3 py-1 text-xs text-textSecondary transition hover:border-primary/60 lg:hidden"
        >
          Close
        </button>
      </div>
      <nav className="mt-6 grid gap-2 text-sm">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <button
              key={item.to}
              type="button"
              onClick={() => handleNavigate(item.to)}
              className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
                isActive
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-surface/70 text-textSecondary hover:border-primary/60 hover:text-textPrimary"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <span>{item.label}</span>
              <span className="text-xs">→</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
