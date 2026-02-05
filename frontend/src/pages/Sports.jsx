import EventCard from "../components/EventCard.jsx";
import CmsPage from "./CmsPage.jsx";

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

const fallbackContent = {
  title: "Sports",
  seoTitle: "Sports",
  seoDescription: "Catalyst Society sports and wellness events.",
  sections: [
    {
      type: "hero",
      order: 0,
      content: {
        eyebrow: "Sports",
        title: "Sports & Wellness Activities",
        subtitle: "Stay active with tournaments, matches, and community wellness events.",
      },
    },
  ],
};

const Sports = () => {
  return (
    <CmsPage pageKey="sports" fallback={fallbackContent}>
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sportsEvents.map((event) => (
          <EventCard key={event.title} {...event} />
        ))}
      </section>
    </CmsPage>
  );
};

export default Sports;
