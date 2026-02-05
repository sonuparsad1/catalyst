import { useEffect, useState } from "react";
import EventCard from "../components/EventCard.jsx";
import CmsPage from "./CmsPage.jsx";
import { listEvents } from "../api/events.js";

const fallbackContent = {
  title: "Events",
  seoTitle: "Events",
  seoDescription: "Explore Catalyst Society's upcoming luxury events.",
  sections: [
    {
      type: "hero",
      order: 0,
      content: {
        eyebrow: "Events",
        title: "Upcoming Events",
        subtitle:
          "Discover flagship events designed to inspire innovation, leadership, and community impact.",
      },
    },
  ],
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await listEvents();
        setEvents(data || []);
      } catch (err) {
        setError(err?.message || "Unable to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <CmsPage pageKey="events" fallback={fallbackContent}>
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
    </CmsPage>
  );
};

export default Events;
