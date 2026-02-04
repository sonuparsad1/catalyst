import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/admin/dashboard" },
  { label: "Events", to: "/admin/events" },
  { label: "Tickets", to: "/admin/tickets" },
  { label: "Attendance", to: "/admin/attendance" },
  { label: "Scanner", to: "/admin/scan" },
  { label: "Payments", to: "/admin/payments" },
  { label: "Refunds", to: "/admin/refunds" },
  { label: "Users", to: "/admin/users" },
  { label: "Settings", to: "/admin/settings" },
];

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-background text-textPrimary">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row">
        <aside className="w-full rounded-3xl border border-border bg-card-gradient p-5 shadow-card-ambient lg:w-72">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">
                Admin panel
              </p>
              <h1 className="text-xl font-semibold text-textPrimary">
                Catalyst Society
              </h1>
            </div>
            <span className="rounded-full border border-primary px-3 py-1 text-xs text-primary">
              Secure
            </span>
          </div>
          <nav className="mt-6 grid gap-2 text-sm">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-2xl border px-4 py-3 transition ${
                    isActive
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-surface/70 text-textSecondary hover:border-primary/60 hover:text-textPrimary"
                  }`
                }
              >
                <span>{item.label}</span>
                <span className="text-xs">→</span>
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="flex-1 rounded-3xl border border-border bg-card-gradient p-6 shadow-card-ambient">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
