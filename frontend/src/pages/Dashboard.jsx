import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";

const quickLinks = [
  {
    title: "Checkout",
    description: "Securely complete your event ticket payment.",
    to: "/checkout",
  },
  {
    title: "Payments",
    description: "Review real-time payment confirmations and status.",
    to: "/payments",
  },
  {
    title: "Invoices",
    description: "Access and download premium invoices instantly.",
    to: "/invoices",
  },
  {
    title: "Refunds",
    description: "Track refund requests with verified approvals.",
    to: "/refunds",
  },
  {
    title: "Admin Analytics",
    description: "Monitor revenue, ticket activations, and risk signals.",
    to: "/admin/analytics",
  },
  {
    title: "Admin Payments",
    description: "Oversee all orders with secure audit trails.",
    to: "/admin/payments",
  },
];

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <section className="px-6 py-16">
      <div className="mx-auto w-full max-w-5xl">
        <div className="rounded-2xl border border-border bg-card-gradient p-8 shadow-card-ambient">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            Member Dashboard
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-textPrimary">
            Welcome, {user?.name}
          </h1>
          <p className="mt-2 text-sm text-textSecondary">
            Your secure member profile is active with verified access controls.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface/60 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Email</p>
              <p className="mt-2 text-sm text-textPrimary">{user?.email}</p>
            </div>
            <div className="rounded-xl border border-border bg-surface/60 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Role</p>
              <p className="mt-2 text-sm text-textPrimary">{user?.role}</p>
            </div>
          </div>
          <div className="mt-8">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              Payment Operations
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-xl border border-border bg-surface/70 p-5 transition hover:border-primary hover:shadow-accent-glow"
                >
                  <p className="text-sm font-semibold text-textPrimary">
                    {link.title}
                  </p>
                  <p className="mt-2 text-xs text-textSecondary">
                    {link.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={logout}
            className="mt-8 rounded-full border border-primary px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
          >
            Sign out
          </button>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
