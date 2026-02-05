import CmsPage from "./CmsPage.jsx";

const teamMembers = [
  { name: "Ariana Patel", role: "President" },
  { name: "Jordan Lee", role: "Vice President" },
  { name: "Camila Gomez", role: "Head of Events" },
  { name: "Noah Brooks", role: "Education Lead" },
  { name: "Priya Singh", role: "Sponsorship Lead" },
  { name: "Ethan Park", role: "Community Lead" },
];

const fallbackContent = {
  title: "Team",
  seoTitle: "Team",
  seoDescription: "Meet the Catalyst Society leadership team.",
  sections: [
    {
      type: "hero",
      order: 0,
      content: {
        eyebrow: "Team",
        title: "Meet the Catalyst Team",
        subtitle: "Our leadership team drives every program, event, and partnership.",
      },
    },
  ],
};

const Team = () => {
  return (
    <CmsPage pageKey="team" fallback={fallbackContent}>
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <article
            key={member.name}
            className="rounded-2xl border border-border bg-card-gradient p-6 shadow-card-ambient"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-surface text-lg font-semibold text-primary">
              {member.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </div>
            <h2 className="mt-4 text-lg font-semibold text-textPrimary">{member.name}</h2>
            <p className="text-sm text-textSecondary">{member.role}</p>
          </article>
        ))}
      </section>
    </CmsPage>
  );
};

export default Team;
