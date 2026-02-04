import EventCard from "../components/EventCard.jsx";

const educationEvents = [
  {
    title: "Product Design Workshop",
    date: "September 14, 2024",
    category: "Workshop",
    fee: "$8",
    description: "Learn rapid prototyping and user research with our design mentors.",
  },
  {
    title: "Campus Hackathon",
    date: "September 30, 2024",
    category: "Hackathon",
    fee: "$12",
    description: "Form teams, build solutions, and demo in front of industry judges.",
  },
  {
    title: "AI for Social Good",
    date: "October 11, 2024",
    category: "Seminar",
    fee: "Free",
    description: "Explore how AI can drive positive change with real-world case studies.",
  },
  {
    title: "Leadership Accelerator",
    date: "October 25, 2024",
    category: "Workshop",
    fee: "$10",
    description: "Develop communication and strategy skills for future leaders.",
  },
  {
    title: "Data Storytelling",
    date: "November 6, 2024",
    category: "Seminar",
    fee: "Free",
    description: "Transform complex data into compelling narratives and insights.",
  },
  {
    title: "Innovation Studio",
    date: "November 18, 2024",
    category: "Hackathon",
    fee: "$15",
    description: "Deep dive into building MVPs with guidance from industry coaches.",
  },
];

const Education = () => {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-primary">Education</p>
        <h1 className="text-3xl font-semibold text-textPrimary sm:text-4xl">
          Workshops & Learning Labs
        </h1>
        <p className="text-base text-textSecondary">
          Engage in practical learning experiences with workshops, hackathons, and seminars.
        </p>
      </header>
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {educationEvents.map((event) => (
          <EventCard key={event.title} {...event} />
        ))}
      </section>
    </main>
  );
};

export default Education;
