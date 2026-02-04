import EventCard from "../components/EventCard.jsx";

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
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-12">
      <section className="grid gap-10 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-10 shadow-xl shadow-slate-950/40 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">
            Ignite • Innovate • Lead
          </p>
          <h1 className="text-4xl font-semibold text-white sm:text-5xl">
            Catalyst Society
          </h1>
          <p className="text-base text-slate-300">
            Catalyst Society is a student-led club accelerating innovation, leadership, and
            community impact through events, education, and hands-on experiences.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
              View Events
            </button>
            <button className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-200">
              Join Catalyst Society
            </button>
            <button className="rounded-full border border-cyan-400/60 px-6 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500 hover:text-slate-950">
              Become a Sponsor
            </button>
          </div>
        </div>
        <div className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-lg font-semibold text-white">Why Catalyst</h2>
          <ul className="space-y-4 text-sm text-slate-300">
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-cyan-400" />
              Access mentorship, innovation labs, and leadership development programs.
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-cyan-400" />
              Collaborate on interdisciplinary projects with peers and industry partners.
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-cyan-400" />
              Build a portfolio through events, competitions, and community initiatives.
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold text-white">Upcoming Events</h2>
          <p className="text-sm text-slate-400">
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
  );
};

export default Home;
