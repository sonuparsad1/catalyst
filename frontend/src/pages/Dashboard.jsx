import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <section className="px-6 py-16">
      <div className="mx-auto w-full max-w-4xl space-y-8">
        <div className="rounded-2xl border border-border bg-card-gradient p-8 shadow-card-ambient">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Member Dashboard</p>
          <h1 className="mt-3 text-3xl font-semibold text-textPrimary">
            Welcome, {user?.name}
          </h1>
          <p className="mt-2 text-sm text-textSecondary">
            Your secure member profile is active.
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
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/tickets"
              className="rounded-full border border-primary px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
            >
              My Tickets
            </Link>
            {user?.role === "admin" ? (
              <>
                <Link
                  to="/admin/events"
                  className="rounded-full border border-border px-5 py-3 text-sm font-semibold text-textSecondary transition hover:text-textPrimary"
                >
                  Manage Events
                </Link>
                <Link
                  to="/admin/scan"
                  className="rounded-full border border-border px-5 py-3 text-sm font-semibold text-textSecondary transition hover:text-textPrimary"
                >
                  Scan Tickets
                </Link>
              </>
            ) : null}
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
