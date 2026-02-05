import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../auth/AuthContext.jsx";
import { AuthStates } from "../auth/authState.js";

const AdminRoute = ({ children }) => {
  const { authState, isAuthenticated, user } = useContext(AuthContext);

  if (authState === AuthStates.UNKNOWN) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-muted">
        Checking access...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;
