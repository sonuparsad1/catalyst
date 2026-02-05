import { useContext, useEffect, useMemo, useState } from "react";
import AuthContext from "../auth/AuthContext.jsx";
import {
  createEvent,
  deleteEvent,
  listAdminEvents,
  updateEvent,
} from "../api/events.js";
import { listEventTickets } from "../api/tickets.js";

const emptyForm = {
  title: "",
  description: "",
  category: "general",
  date: "",
  time: "",
  venue: "",
  price: 0,
  totalSeats: 0,
  status: "DRAFT",
};

const AdminEvents = () => {
  const { token } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [formState, setFormState] = useState(emptyForm);
  const [mode, setMode] = useState("create");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const selectedEvent = useMemo(
    () => events.find((event) => event.id === selectedEventId),
    [events, selectedEventId]
  );

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await listAdminEvents(token);
        setEvents(data);
      } catch (error) {
        setMessage({ type: "error", text: error?.message || "Unable to load events" });
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [token]);

  useEffect(() => {
    if (!selectedEventId) {
      setTickets([]);
      return;
    }

    const fetchTickets = async () => {
      try {
        const data = await listEventTickets(selectedEventId, token);
        setTickets(data);
      } catch (error) {
        setMessage({ type: "error", text: error?.message || "Unable to load tickets" });
      }
    };
    fetchTickets();
  }, [selectedEventId, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null);
    try {
      let updated;
      if (mode === "create") {
        updated = await createEvent(formState, token);
      } else if (selectedEventId) {
        updated = await updateEvent(selectedEventId, formState, token);
      }
      const data = await listAdminEvents(token);
      setEvents(data);
      setFormState(emptyForm);
      setMode("create");
      setSelectedEventId(updated?.id || "");
      setMessage({ type: "success", text: "Event saved." });
    } catch (error) {
      setMessage({ type: "error", text: error?.message || "Unable to save event" });
    }
  };

  const handleEdit = (event) => {
    setSelectedEventId(event.id);
    setFormState({
      title: event.title,
      description: event.description,
      category: event.category,
      date: event.date,
      time: event.time,
      venue: event.venue,
      price: event.price,
      totalSeats: event.totalSeats,
      status: event.status,
    });
    setMode("edit");
  };

  const handleDelete = async (eventId) => {
    setMessage(null);
    try {
      await deleteEvent(eventId, token);
      const data = await listAdminEvents(token);
      setEvents(data);
      if (selectedEventId === eventId) {
        setSelectedEventId("");
      }
      setMessage({ type: "success", text: "Event deleted." });
    } catch (error) {
      setMessage({ type: "error", text: error?.message || "Unable to delete event" });
    }
  };

  const exportCsv = () => {
    if (!tickets.length) {
      setMessage({ type: "error", text: "No attendance records to export." });
      return;
    }

    const header = ["Ticket Code", "Name", "Email", "Status", "Purchased At", "Used At"];
    const rows = tickets.map((ticket) => [
      ticket.ticketCode,
      ticket.user?.name || "",
      ticket.user?.email || "",
      ticket.status,
      ticket.purchasedAt,
      ticket.usedAt || "",
    ]);

    const csv = [header, ...rows]
      .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `attendance-${selectedEvent?.title || "event"}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="px-6 py-16">
      <div className="mx-auto w-full max-w-6xl space-y-10">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Admin</p>
          <h1 className="text-3xl font-semibold text-textPrimary">Event Management</h1>
          <p className="text-sm text-textSecondary">
            Create, publish, and manage attendance for Catalyst Society events.
          </p>
        </header>

        {message ? (
          <div
            className={`rounded-2xl border border-border p-4 text-sm ${
              message.type === "error"
                ? "bg-error/10 text-error"
                : "bg-success/10 text-success"
            }`}
          >
            {message.text}
          </div>
        ) : null}

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-2xl border border-border bg-card-gradient p-6 shadow-card-ambient">
            <h2 className="text-lg font-semibold text-textPrimary">{mode === "create" ? "Create Event" : "Edit Event"}</h2>
            <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
              <input
                className="rounded-lg border border-border bg-surface px-4 py-2 text-sm text-textPrimary"
                placeholder="Title"
                value={formState.title}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, title: event.target.value }))
                }
                required
              />
              <textarea
                className="rounded-lg border border-border bg-surface px-4 py-2 text-sm text-textPrimary"
                placeholder="Description"
                rows={3}
                value={formState.description}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, description: event.target.value }))
                }
                required
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <select
                  className="rounded-lg border border-border bg-surface px-4 py-2 text-sm text-textPrimary"
                  value={formState.category}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, category: event.target.value }))
                  }
                >
                  <option value="education">Education</option>
                  <option value="sports">Sports</option>
                  <option value="general">General</option>
                </select>
                <select
                  className="rounded-lg border border-border bg-surface px-4 py-2 text-sm text-textPrimary"
                  value={formState.status}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, status: event.target.value }))
                  }
                >
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="date"
                  className="rounded-lg border border-border bg-surface px-4 py-2 text-sm text-textPrimary"
                  value={formState.date}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, date: event.target.value }))
                  }
                  required
                />
                <input
                  type="time"
                  className="rounded-lg border border-border bg-surface px-4 py-2 text-sm text-textPrimary"
                  value={formState.time}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, time: event.target.value }))
                  }
                  required
                />
              </div>
              <input
                className="rounded-lg border border-border bg-surface px-4 py-2 text-sm text-textPrimary"
                placeholder="Venue"
                value={formState.venue}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, venue: event.target.value }))
                }
                required
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="number"
                  min="0"
                  className="rounded-lg border border-border bg-surface px-4 py-2 text-sm text-textPrimary"
                  placeholder="Price"
                  value={formState.price}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, price: event.target.value }))
                  }
                />
                <input
                  type="number"
                  min="0"
                  className="rounded-lg border border-border bg-surface px-4 py-2 text-sm text-textPrimary"
                  placeholder="Total Seats"
                  value={formState.totalSeats}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, totalSeats: event.target.value }))
                  }
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10"
                >
                  {mode === "create" ? "Create Event" : "Update Event"}
                </button>
                {mode === "edit" ? (
                  <button
                    type="button"
                    onClick={() => {
                      setFormState(emptyForm);
                      setMode("create");
                      setSelectedEventId("");
                    }}
                    className="rounded-full border border-border px-5 py-2 text-sm font-semibold text-textSecondary"
                  >
                    Cancel
                  </button>
                ) : null}
              </div>
            </form>
          </div>

          <div className="rounded-2xl border border-border bg-card-gradient p-6 shadow-card-ambient">
            <h2 className="text-lg font-semibold text-textPrimary">Upcoming Events</h2>
            {loading ? (
              <p className="mt-4 text-sm text-muted">Loading events...</p>
            ) : events.length === 0 ? (
              <p className="mt-4 text-sm text-muted">No events yet.</p>
            ) : (
              <div className="mt-4 space-y-3">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className={`rounded-xl border p-4 transition ${
                      selectedEventId === event.id
                        ? "border-primary bg-surface"
                        : "border-border bg-surface/60"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-textPrimary">{event.title}</p>
                        <p className="text-xs text-textSecondary">
                          {event.date} • {event.time}
                        </p>
                        <p className="text-xs text-textSecondary">{event.venue}</p>
                        <p className="text-xs text-muted">{event.status}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(event)}
                          className="rounded-full border border-primary px-3 py-1 text-xs font-semibold text-primary"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(event.id)}
                          className="rounded-full border border-error px-3 py-1 text-xs font-semibold text-error"
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedEventId(event.id)}
                          className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-textSecondary"
                        >
                          Attendance
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card-gradient p-6 shadow-card-ambient">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-textPrimary">Attendance</h2>
              <p className="text-sm text-textSecondary">
                {selectedEvent ? `Viewing ${selectedEvent.title}` : "Select an event to view attendees."}
              </p>
            </div>
            <button
              type="button"
              onClick={exportCsv}
              className="rounded-full border border-primary px-4 py-2 text-xs font-semibold text-primary"
            >
              Export CSV
            </button>
          </div>
          <div className="mt-4 grid gap-3">
            {selectedEventId && tickets.length === 0 ? (
              <p className="text-sm text-muted">No attendees yet.</p>
            ) : null}
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface/60 px-4 py-3 text-sm"
              >
                <div>
                  <p className="text-textPrimary">{ticket.user?.name || "Guest"}</p>
                  <p className="text-xs text-textSecondary">{ticket.user?.email}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-border px-3 py-1 text-xs text-textSecondary">
                    {ticket.ticketCode}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      ticket.status === "VALID"
                        ? "bg-success/20 text-success"
                        : ticket.status === "USED"
                          ? "bg-warning/20 text-warning"
                          : "bg-error/20 text-error"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminEvents;
