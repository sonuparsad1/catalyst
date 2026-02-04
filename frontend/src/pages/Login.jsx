import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    setFormState((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(formState.email, formState.password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card-gradient p-8 shadow-card-ambient">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Member Access</p>
        <h1 className="mt-3 text-3xl font-semibold text-textPrimary">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-textSecondary">
          Sign in to manage your Catalyst Society experience.
        </p>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-muted">
              Email
            </label>
            <input
              className="mt-2 w-full rounded-lg border border-border bg-surface/70 px-4 py-3 text-sm text-textPrimary outline-none transition focus:border-primary"
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-muted">
              Password
            </label>
            <input
              className="mt-2 w-full rounded-lg border border-border bg-surface/70 px-4 py-3 text-sm text-textPrimary outline-none transition focus:border-primary"
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="text-sm text-primary">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-full bg-gold-gradient px-5 py-3 text-sm font-semibold text-background shadow-accent-glow transition hover:opacity-90"
            disabled={submitting}
          >
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="mt-6 text-sm text-textSecondary">
          New to Catalyst Society?{" "}
          <Link className="text-primary" to="/register">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
