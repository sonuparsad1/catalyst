import { useEffect, useState } from "react";
import Seo from "../../components/Seo.jsx";
import { createEvent, listAdminEvents, updateEvent } from "../../api/events.js";

const emptyEventForm = {
  title: "",
  description: "",
  category: "education",
  date: "",
  time: "",
  venue: "",
  price: 0,
  totalSeats: 0,
};

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [eventForm, setEventForm] = useState(emptyEventForm);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loadEvents = async () => {
    try {
      const data = await listAdminEvents();
      setEvents(data || []);
    } catch (error) {
      setErrorMessage(error?.message || "Unable to load events.");
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleCreateEvent = async (event) => {
    event.preventDefault();
    setStatusMessage("");
    setErrorMessage("");
    try {
      const payload = {
        ...eventForm,
        price: Number(eventForm.price) || 0,
        totalSeats: Number(eventForm.totalSeats) || 0,
      };
      const created = await createEvent(payload);
      setEvents((prev) => [created, ...prev]);
      setEventForm(emptyEventForm);
      setStatusMessage("Event created.");
    } catch (error) {
      setErrorMessage(error?.message || "Unable to create event.");
    }
  };

  const toggleStatus = async (eventItem) => {
    setStatusMessage("");
    setErrorMessage("");
    try {
      const nextStatus = eventItem.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
      const updated = await updateEvent(eventItem._id, { status: nextStatus });
      setEvents((prev) => prev.map((item) => (item._id === updated._id ? updated : item)));
      setStatusMessage("Event updated.");
    } catch (error) {
      setErrorMessage(error?.message || "Unable to update event.");
    }
  };

  return (
    <section className="space-y-6">
      <Seo title="Admin Events" description="Publish and manage Catalyst Society events." />
      <header className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Events</p>
          <h2 className="text-3xl font-semibold text-textPrimary">Event publishing hub</h2>
          <p className="mt-2 text-sm text-textSecondary">
            Create, edit, and publish premium experiences in real time.
          </p>
        </div>
        <button
          type="button"
          onClick={loadEvents}
          className="rounded-full border border-primary px-4 py-2 text-xs font-semibold text-primary transition hover:bg-primary/10"
        >
          Refresh
        </button>
      </header>

      {(statusMessage || errorMessage) && (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm ${
            errorMessage
              ? "border-red-500/40 bg-red-500/10 text-red-200"
              : "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
          }`}
        >
          {errorMessage || statusMessage}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-2xl border border-border bg-surface/70 p-4">
          <h3 className="text-sm font-semibold text-textPrimary">Create event</h3>
          <form className="mt-4 grid gap-3" onSubmit={handleCreateEvent}>
            <input
              type="text"
              placeholder="Event title"
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
              value={eventForm.title}
              onChange={(event) =>
                setEventForm((prev) => ({ ...prev, title: event.target.value }))
              }
              required
            />
            <textarea
              placeholder="Event description"
              className="min-h-[90px] rounded-lg border border-border bg-background px-3 py-2 text-sm"
              value={eventForm.description}
              onChange={(event) =>
                setEventForm((prev) => ({ ...prev, description: event.target.value }))
              }
              required
            />
            <select
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
              value={eventForm.category}
              onChange={(event) =>
                setEventForm((prev) => ({ ...prev, category: event.target.value }))
              }
            >
              <option value="education">Education</option>
              <option value="sports">Sports</option>
              <option value="general">General</option>
            </select>
            <div className="grid gap-3 md:grid-cols-2">
              <input
                type="date"
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                value={eventForm.date}
                onChange={(event) =>
                  setEventForm((prev) => ({ ...prev, date: event.target.value }))
                }
                required
              />
              <input
                type="time"
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                value={eventForm.time}
                onChange={(event) =>
                  setEventForm((prev) => ({ ...prev, time: event.target.value }))
                }
                required
              />
            </div>
            <input
              type="text"
              placeholder="Venue"
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
              value={eventForm.venue}
              onChange={(event) =>
                setEventForm((prev) => ({ ...prev, venue: event.target.value }))
              }
              required
            />
            <div className="grid gap-3 md:grid-cols-2">
              <input
                type="number"
                placeholder="Price"
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                value={eventForm.price}
                onChange={(event) =>
                  setEventForm((prev) => ({ ...prev, price: event.target.value }))
                }
                min="0"
              />
              <input
                type="number"
                placeholder="Total seats"
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                value={eventForm.totalSeats}
                onChange={(event) =>
                  setEventForm((prev) => ({ ...prev, totalSeats: event.target.value }))
                }
                min="0"
                required
              />
            </div>
            <button
              type="submit"
              className="rounded-full bg-gold-gradient px-4 py-2 text-xs font-semibold text-background"
            >
              Create event
            </button>
          </form>
        </div>

        <div className="grid gap-4">
          {events.map((event) => (
            <div
              key={event._id}
              className="rounded-2xl border border-border bg-surface/70 p-4"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted">
                    {event.category}
                  </p>
                  <h3 className="text-lg font-semibold text-textPrimary">{event.title}</h3>
                  <p className="text-sm text-textSecondary">
                    {event.date} • {event.time} • {event.venue}
                  </p>
                  <p className="text-xs text-textSecondary">
                    Seats: {event.seatsAvailable}/{event.totalSeats}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span
                    className={`rounded-full border px-3 py-1 font-semibold ${
                      event.status === "PUBLISHED"
                        ? "border-primary text-primary"
                        : "border-border text-textSecondary"
                    }`}
                  >
                    {event.status}
                  </span>
                  <button
                    type="button"
                    className="rounded-full border border-primary px-3 py-1 text-primary transition hover:bg-primary/10"
                    onClick={() => toggleStatus(event)}
                  >
                    {event.status === "PUBLISHED" ? "Unpublish" : "Publish"}
                  </button>
                </div>
              </div>
            </div>
          ))}
          {events.length === 0 && (
            <p className="text-sm text-textSecondary">No events found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminEvents;
