import { useEffect, useState } from "react";
import Seo from "../../components/Seo.jsx";
import { listAdminEvents } from "../../api/events.js";
import { listEventTickets } from "../../api/tickets.js";

const AdminTickets = () => {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [tickets, setTickets] = useState([]);
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

  const loadTickets = async (eventId) => {
    if (!eventId) {
      setTickets([]);
      return;
    }
    try {
      const data = await listEventTickets(eventId);
      setTickets(data || []);
      setStatusMessage("Tickets loaded.");
    } catch (error) {
      setErrorMessage(error?.message || "Unable to load tickets.");
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    loadTickets(selectedEventId);
  }, [selectedEventId]);

  return (
    <section className="space-y-6">
      <Seo title="Admin Tickets" description="Manage ticket inventory and access tiers." />
      <header className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Tickets</p>
          <h2 className="text-3xl font-semibold text-textPrimary">Ticket inventory</h2>
          <p className="mt-2 text-sm text-textSecondary">
            Monitor ticket registrations and attendee access.
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

      <div className="rounded-2xl border border-border bg-surface/70 p-4">
        <label className="text-xs text-textSecondary">Select event</label>
        <select
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          value={selectedEventId}
          onChange={(event) => setSelectedEventId(event.target.value)}
        >
          <option value="">Choose an event</option>
          {events.map((event) => (
            <option key={event._id} value={event._id}>
              {event.title}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-3">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="rounded-2xl border border-border bg-surface/70 p-4 text-sm"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted">{ticket.id}</p>
                <p className="text-base font-semibold text-textPrimary">
                  {ticket.user?.name || "Unassigned"}
                </p>
                <p className="text-xs text-textSecondary">{ticket.user?.email}</p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded-full border border-primary px-3 py-1 text-primary">
                  {ticket.status}
                </span>
                <span className="text-textSecondary">{ticket.ticketCode}</span>
              </div>
            </div>
          </div>
        ))}
        {selectedEventId && tickets.length === 0 && (
          <p className="text-sm text-textSecondary">No tickets for this event yet.</p>
        )}
      </div>
    </section>
  );
};

export default AdminTickets;
