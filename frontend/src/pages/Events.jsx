import EventCard from "../components/EventCard.jsx";
import Seo from "../components/Seo.jsx";

const events = [
  {
    title: "Catalyst Welcome Mixer",
    date: "September 5, 2024",
    category: "Networking",
    fee: "Free",
    description: "Meet new members, alumni, and partners to kick off the year.",
  },
  {
    title: "Innovation Showcase",
    date: "September 21, 2024",
    category: "Showcase",
    fee: "$5",
    description: "Pitch your projects and celebrate student innovation on campus.",
  },
  {
    title: "Community Impact Day",
    date: "October 2, 2024",
    category: "Service",
    fee: "Free",
    description: "Collaborate with local nonprofits on high-impact initiatives.",
  },
  {
    title: "Design Thinking Sprint",
    date: "October 19, 2024",
    category: "Workshop",
    fee: "$15",
    description: "Hands-on workshop focused on human-centered design practices.",
  },
  {
    title: "Entrepreneurship Panel",
    date: "November 3, 2024",
    category: "Panel",
    fee: "Free",
    description: "Hear founders share lessons learned from real startup journeys.",
  },
  {
    title: "Catalyst Awards Gala",
    date: "November 22, 2024",
    category: "Celebration",
    fee: "$20",
    description: "Celebrate the leaders and innovators of the year.",
  },
];

const Events = () => {
  return (
    <>
      <Seo title="Events" description="Explore Catalyst Society's upcoming luxury events." />
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
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.title} {...event} />
        ))}
      </section>
      </main>
    </>
  );
};

export default Events;
