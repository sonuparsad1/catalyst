import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    setFormState((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);
    try {
      await register(formState.name, formState.email, formState.password);
      setSuccess("Registration successful. Please sign in.");
      setTimeout(() => navigate("/login"), 800);
    } catch (err) {
      setError("Unable to register");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card-gradient p-8 shadow-card-ambient">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">
          Join the Circle
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-textPrimary">
          Become a member
        </h1>
        <p className="mt-2 text-sm text-textSecondary">
          Register for access to member-only opportunities.
        </p>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-muted">
              Name
            </label>
            <input
              className="mt-2 w-full rounded-lg border border-border bg-surface/70 px-4 py-3 text-sm text-textPrimary outline-none transition focus:border-primary"
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
            />
          </div>
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
          {success && <p className="text-sm text-textSecondary">{success}</p>}
          <button
            type="submit"
            className="w-full rounded-full bg-gold-gradient px-5 py-3 text-sm font-semibold text-background shadow-accent-glow transition hover:opacity-90"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Create account"}
          </button>
        </form>
        <p className="mt-6 text-sm text-textSecondary">
          Already a member?{" "}
          <Link className="text-primary" to="/login">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
