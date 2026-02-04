import EventCard from "../components/EventCard.jsx";
import Seo from "../components/Seo.jsx";

const sportsEvents = [
  {
    title: "Catalyst Futsal Tournament",
    date: "September 16, 2024",
    category: "Tournament",
    fee: "$5",
    description: "Teams compete for the Catalyst Cup and campus bragging rights.",
  },
  {
    title: "Esports Showdown",
    date: "September 29, 2024",
    category: "Match",
    fee: "$3",
    description: "Join our friendly competitive gaming night with prizes.",
  },
  {
    title: "Basketball Skills Night",
    date: "October 13, 2024",
    category: "Clinic",
    fee: "Free",
    description: "Skill-building drills and scrimmages led by team captains.",
  },
  {
    title: "Catalyst Run Club",
    date: "October 27, 2024",
    category: "Match",
    fee: "Free",
    description: "Community run with wellness check-ins and hydration stations.",
  },
  {
    title: "Volleyball Friendly",
    date: "November 9, 2024",
    category: "Match",
    fee: "$4",
    description: "Co-ed teams welcome for an evening of fun and teamwork.",
  },
  {
    title: "Champion's Cup Finals",
    date: "November 23, 2024",
    category: "Tournament",
    fee: "$7",
    description: "Finals for the season's top teams with awards ceremony.",
  },
];

const Sports = () => {
  return (
    <>
      <Seo title="Sports" description="Catalyst Society sports and wellness events." />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-primary">Sports</p>
        <h1 className="text-3xl font-semibold text-textPrimary sm:text-4xl">
          Sports & Wellness Activities
        </h1>
        <p className="text-base text-textSecondary">
          Stay active with tournaments, matches, and community wellness events.
        </p>
      </header>
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sportsEvents.map((event) => (
          <EventCard key={event.title} {...event} />
        ))}
      </section>
      </main>
    </>
  );
};

export default Sports;
