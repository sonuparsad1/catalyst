import EventCard from "../components/EventCard.jsx";
import Seo from "../components/Seo.jsx";

const upcomingEvents = [
  {
    title: "Catalyst Launch Night",
    date: "September 12, 2024",
    category: "Community",
    fee: "Free",
    description: "Kick off the semester with lightning talks, demos, and networking.",
  },
  {
    title: "Innovation Sprint",
    date: "September 28, 2024",
    category: "Hackathon",
    fee: "$10",
    description: "A 12-hour ideation sprint focused on campus-impact projects.",
  },
  {
    title: "Leadership Lab",
    date: "October 8, 2024",
    category: "Workshop",
    fee: "Free",
    description: "Build leadership skills with mentors from industry and alumni network.",
  },
];

const Home = () => {
  return (
    <>
      <Seo title="Home" description="Catalyst Society is a luxury community for ambitious leaders and innovators." />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-12">
        <section className="grid gap-10 rounded-3xl border border-border bg-card-gradient p-10 shadow-card-ambient lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-primary">
            Ignite • Innovate • Lead
          </p>
          <h1 className="text-4xl font-semibold text-textPrimary sm:text-5xl">
            Catalyst Society
          </h1>
          <p className="text-base text-textSecondary">
            Catalyst Society is a student-led club accelerating innovation, leadership, and
            community impact through events, education, and hands-on experiences.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="rounded-full bg-gold-gradient px-6 py-3 text-sm font-semibold text-background shadow-accent-glow transition hover:brightness-105">
              View Events
            </button>
            <button className="rounded-full border border-primary/60 bg-surface px-6 py-3 text-sm font-semibold text-textPrimary transition hover:border-primary">
              Join Catalyst Society
            </button>
            <button className="rounded-full border border-primary/50 bg-surface px-6 py-3 text-sm font-semibold text-primary transition hover:border-primary">
              Become a Sponsor
            </button>
          </div>
        </div>
        <div className="space-y-6 rounded-2xl border border-border bg-card-gradient p-6 shadow-card-ambient">
          <h2 className="text-lg font-semibold text-textPrimary">Why Catalyst</h2>
          <ul className="space-y-4 text-sm text-textSecondary">
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
              Access mentorship, innovation labs, and leadership development programs.
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
              Collaborate on interdisciplinary projects with peers and industry partners.
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
              Build a portfolio through events, competitions, and community initiatives.
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold text-textPrimary">Upcoming Events</h2>
          <p className="text-sm text-textSecondary">
            Join our upcoming sessions and meet innovators across campus.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((event) => (
            <EventCard key={event.title} {...event} />
          ))}
        </div>
      </section>
      </main>
    </>
  );
};

export default Home;
