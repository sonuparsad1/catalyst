import EventCard from "../components/EventCard.jsx";
import CmsPage from "./CmsPage.jsx";

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

const fallbackContent = {
  title: "Catalyst Society",
  seoTitle: "Home",
  seoDescription:
    "Catalyst Society is a luxury community for ambitious leaders and innovators.",
  sections: [
    {
      type: "hero",
      order: 0,
      content: {
        eyebrow: "Ignite • Innovate • Lead",
        title: "Catalyst Society",
        subtitle:
          "Catalyst Society is a student-led club accelerating innovation, leadership, and community impact through events, education, and hands-on experiences.",
        ctaLabel: "View Events",
        ctaLink: "/events",
      },
    },
    {
      type: "grid",
      order: 1,
      content: {
        heading: "Why Catalyst",
        items: [
          {
            title: "Mentorship & leadership labs",
            description:
              "Access mentorship, innovation labs, and leadership development programs.",
          },
          {
            title: "Interdisciplinary collaboration",
            description:
              "Collaborate on interdisciplinary projects with peers and industry partners.",
          },
          {
            title: "Portfolio-building experiences",
            description:
              "Build a portfolio through events, competitions, and community initiatives.",
          },
        ],
      },
    },
    {
      type: "cta",
      order: 2,
      content: {
        heading: "Join Catalyst Society",
        body: "Become part of a community that accelerates innovation and leadership.",
        buttonLabel: "Join now",
        buttonLink: "/register",
      },
    },
    {
      type: "cta",
      order: 3,
      content: {
        heading: "Become a Sponsor",
        body: "Partner with Catalyst Society to elevate student innovation.",
        buttonLabel: "Sponsor Catalyst",
        buttonLink: "/sponsorship",
      },
    },
  ],
};

const Home = () => {
  return (
    <CmsPage pageKey="home" fallback={fallbackContent}>
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
    </CmsPage>
  );
};

export default Home;
