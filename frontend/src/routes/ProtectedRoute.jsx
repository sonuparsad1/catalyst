import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import AuthContext from "../auth/AuthContext.jsx";
import { AuthStates } from "../auth/authState.js";

const ProtectedRoute = ({ children }) => {
  const { authState } = useContext(AuthContext);

  if (authState === AuthStates.UNKNOWN) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-muted">
        Checking access...
      </div>
    );
  }

  if (authState === AuthStates.DB_DISABLED) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center px-6 py-16">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card-gradient p-6 text-center shadow-card-ambient">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            Service notice
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-textPrimary">
            Member access is temporarily unavailable
          </h2>
          <p className="mt-3 text-sm text-textSecondary">
            Please check back soon while we restore secure services.
          </p>
          <Link
            className="mt-5 inline-flex rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10"
            to="/"
          >
            Return home
          </Link>
        </div>
      </section>
    );
  }

  if (authState !== AuthStates.AUTHENTICATED) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
