import { useState } from "react";
import Seo from "../../components/Seo.jsx";

const initialEvents = [
  {
    id: "evt-243",
    title: "Founder’s Salon",
    date: "2024-11-18",
    status: "Draft",
    capacity: 120,
  },
  {
    id: "evt-244",
    title: "Catalyst Gala",
    date: "2024-12-02",
    status: "Published",
    capacity: 380,
  },
  {
    id: "evt-245",
    title: "Investor Roundtable",
    date: "2024-12-14",
    status: "Published",
    capacity: 64,
  },
];

const AdminEvents = () => {
  const [events, setEvents] = useState(initialEvents);

  const toggleStatus = (id) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id
          ? {
              ...event,
              status: event.status === "Published" ? "Draft" : "Published",
            }
          : event
      )
    );
  };

  return (
    <section className="space-y-6">
      <Seo title="Admin Events" description="Publish and manage Catalyst Society events." />
      <header className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            Events
          </p>
          <h2 className="text-3xl font-semibold text-textPrimary">
            Event publishing hub
          </h2>
          <p className="mt-2 text-sm text-textSecondary">
            Create, edit, and publish premium experiences in real time.
          </p>
        </div>
        <button
          type="button"
          disabled
          title="Event creation is managed by the production console."
          className="rounded-full bg-gold-gradient/40 px-4 py-2 text-xs font-semibold text-background opacity-70"
        >
          Create event
        </button>
      </header>

      <div className="grid gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="rounded-2xl border border-border bg-surface/70 p-4"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted">
                  {event.id}
                </p>
                <h3 className="text-lg font-semibold text-textPrimary">
                  {event.title}
                </h3>
                <p className="text-sm text-textSecondary">
                  {event.date} • Capacity {event.capacity}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span
                  className={`rounded-full border px-3 py-1 font-semibold ${
                    event.status === "Published"
                      ? "border-primary text-primary"
                      : "border-border text-textSecondary"
                  }`}
                >
                  {event.status}
                </span>
                <button
                  type="button"
                  disabled
                  title="Editing is available in the production console."
                  className="rounded-full border border-border px-3 py-1 text-textSecondary opacity-60 cursor-not-allowed"
                >
                  Edit live
                </button>
                <button
                  type="button"
                  className="rounded-full border border-primary px-3 py-1 text-primary transition hover:bg-primary/10"
                  onClick={() => toggleStatus(event.id)}
                >
                  {event.status === "Published" ? "Unpublish" : "Publish"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminEvents;
