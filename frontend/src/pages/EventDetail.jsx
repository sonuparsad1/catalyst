import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";
import { getEvent } from "../api/events.js";
import { registerTicket } from "../api/tickets.js";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, isAuthenticated } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionState, setActionState] = useState({ status: "idle", message: "" });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEvent(id, token);
        setEvent(data);
      } catch (err) {
        setError(err?.message || "Unable to load event");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id, token]);

  const handleRegister = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setActionState({ status: "loading", message: "" });
    try {
      const response = await registerTicket(id, token);
      if (response?.requiresPayment) {
        setActionState({
          status: "info",
          message: `Payment required: $${response.amount}`,
        });
      } else {
        setActionState({ status: "success", message: "Ticket secured." });
      }
    } catch (err) {
      setActionState({ status: "error", message: err?.message || "Unable to register" });
    }
  };

  if (loading) {
    return (
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card-gradient p-10 text-center text-sm text-muted">
          Loading event...
        </div>
      </section>
    );
  }

  if (error || !event) {
    return (
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card-gradient p-10 text-center text-sm text-error">
          {error || "Event not found"}
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-16">
      <div className="mx-auto w-full max-w-4xl space-y-8">
        <div className="rounded-2xl border border-border bg-card-gradient p-8 shadow-card-ambient">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Event Detail</p>
          <h1 className="mt-3 text-3xl font-semibold text-textPrimary">{event.title}</h1>
          <p className="mt-3 text-sm text-textSecondary">{event.description}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">When</p>
              <p className="mt-2 text-sm text-textPrimary">
                {event.date} • {event.time}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Venue</p>
              <p className="mt-2 text-sm text-textPrimary">{event.venue}</p>
            </div>
            <div className="rounded-xl border border-border bg-surface/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Price</p>
              <p className="mt-2 text-sm text-textPrimary">
                {event.price > 0 ? `$${event.price}` : "Free"}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Seats</p>
              <p className="mt-2 text-sm text-textPrimary">
                {event.seatsAvailable} available of {event.totalSeats}
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={handleRegister}
              className="rounded-full border border-primary px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
              disabled={actionState.status === "loading"}
            >
              {actionState.status === "loading" ? "Processing..." : "Register / Buy Ticket"}
            </button>
            <Link
              to="/tickets"
              className="rounded-full border border-border px-5 py-3 text-sm font-semibold text-textSecondary transition hover:text-textPrimary"
            >
              View my tickets
            </Link>
          </div>
          {actionState.message ? (
            <p
              className={`mt-4 text-sm ${
                actionState.status === "error"
                  ? "text-error"
                  : actionState.status === "success"
                    ? "text-success"
                    : "text-textSecondary"
              }`}
            >
              {actionState.message}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default EventDetail;
