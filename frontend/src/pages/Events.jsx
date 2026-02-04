import { useEffect, useState } from "react";
import EventCard from "../components/EventCard.jsx";
import { listEvents } from "../api/events.js";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await listEvents();
        setEvents(data);
      } catch (err) {
        setError(err?.message || "Unable to load events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-primary">Events</p>
        <h1 className="text-3xl font-semibold text-textPrimary sm:text-4xl">
          Upcoming Events
        </h1>
        <p className="text-base text-textSecondary">
          Discover flagship events designed to inspire innovation, leadership, and community
          impact.
        </p>
      </header>
      {loading ? (
        <div className="rounded-2xl border border-border bg-card-gradient p-10 text-center text-sm text-muted">
          Loading events...
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-border bg-card-gradient p-10 text-center text-sm text-error">
          {error}
        </div>
      ) : (
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </section>
      )}
    </main>
  );
};

export default Events;
