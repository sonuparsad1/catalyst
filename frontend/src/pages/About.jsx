import CmsPage from "./CmsPage.jsx";

const fallbackContent = {
  title: "Catalyst Society",
  seoTitle: "About",
  seoDescription: "Learn about Catalyst Society's mission and leadership.",
  sections: [
    {
      type: "hero",
      order: 0,
      content: {
        eyebrow: "About Us",
        title: "Catalyst Society",
        subtitle:
          "Catalyst Society empowers students to ignite ideas, innovate boldly, and lead transformational change across campus communities.",
      },
    },
    {
      type: "grid",
      order: 1,
      content: {
        heading: "Our pillars",
        items: [
          {
            title: "Vision",
            description:
              "A campus culture where every student is equipped to create, collaborate, and lead meaningful impact.",
          },
          {
            title: "Mission",
            description:
              "Deliver experiential programs, mentorship, and events that spark innovation and elevate student leadership.",
          },
          {
            title: "About",
            description:
              "From hackathons to community initiatives, we curate high-impact experiences that connect students with industry, alumni, and peers.",
          },
        ],
      },
    },
    {
      type: "text",
      order: 2,
      content: {
        heading: "What we value",
        body: [
          "Collaborative learning and shared leadership across disciplines.",
          "Innovation driven by community needs and sustainable outcomes.",
          "Inclusive spaces that empower new voices and fresh ideas.",
          "Growth-focused mentorship and professional development opportunities.",
        ].join(" "),
      },
    },
  ],
};

const About = () => {
  return <CmsPage pageKey="about" fallback={fallbackContent} />;
};

export default About;
