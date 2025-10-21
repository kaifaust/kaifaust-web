export interface Experience {
  company: string;
  logo?: string;
  title: string;
  type: string;
  duration: string;
  location?: string;
  description: string | string[];
  url?: string;
}

export const experiences: Experience[] = [
  {
    company: "3Branches",
    logo: "/3branches-logo.svg",
    title: "Co-Founder, COO, CPO",
    type: "Full-time",
    duration: "Feb 2025 - Oct 2025",
    location: "San Francisco, California, United States",
    description: [
      "Led product, operations, and technical direction as Co-Founder. Built core web application using Next.js, React, and modern full-stack technologies, delivering product experience across all platforms.",
      "Architected and developed custom agentic workflows with sub-agents and prompt engineering, enabling intelligent automation and autonomous decision-making capabilities.",
      "Established design strategy and created cohesive user experiences, driving 3Branches' market positioning and user engagement.",
    ],
  },
  {
    company: "InfoPop",
    logo: "/infopop-logo.svg",
    title: "CEO",
    type: "Full-time",
    duration: "Jul 2020 - Jul 2025",
    location: "San Francisco, California",
    description: [
      "Founded and developed InfoPop, a consumer app featuring mixed reality and spatial awareness capabilities with innovative 3D scanner technology for capturing and augmenting physical spaces with contextual data.",
      "Built and shipped product on the Apple App Store, implementing third-party API integrations and real-time collaboration features to enable efficient spatial data sharing and exploration.",
      "Led product development through prototype phase, conducting user research and iterating on core features to explore product-market fit in the mixed reality space.",
    ],
    url: "https://apps.apple.com/us/app/infopop/id1530246692",
  },
  {
    company: "Foundation Labs",
    title: "CEO",
    type: "Full-time",
    duration: "Apr 2019 - Mar 2021",
    location: "San Francisco",
    description: [
      "Led Foundation Labs as an award-winning product development agency, establishing market reputation in performance, reliability, usability, and security-focused solutions.",
      "Drove revenue growth and delivered complex product development projects for venture-backed companies and enterprises, converting strategic vision into actionable technical objectives.",
      "Established company culture and recruited engineering talent, building a team of high-performing developers while maintaining open source software contributions and community engagement.",
    ],
  },
  {
    company: "October",
    logo: "/october-logo.svg",
    title: "Chief Product Officer",
    type: "Full-time",
    duration: "Apr 2017 - Apr 2019",
    location: "Menlo Park, CA",
    description: [
      "Led product strategy and execution for a venture-backed social network that achieved significant market traction and recognition at the end of 2018, reaching Product Hunt featured status.",
      "Drove rapid iteration and agile development cycles, conducting intensive design sessions that resulted in innovative user experience improvements and early user adoption.",
      "Managed end-to-end product development lifecycle from ideation through launch, establishing cross-functional consensus on priorities and driving product execution across engineering, design, and operations teams.",
    ],
    url: "https://www.producthunt.com/posts/october-2",
  },
  {
    company: "FullStack Labs",
    logo: "/fullstack-labs-logo.svg",
    title: "Head of Design",
    type: "Full-time",
    duration: "Nov 2015 - Mar 2017",
    location: "Sacramento, California",
    description: [
      "Joined as first employee and built design function at Sacramento's leading software consultancy, establishing design-driven development practices and culture.",
      "Authored and open-sourced an advanced MIT-licensed SCSS framework for fast and scalable UI development, achieving adoption across 5+ enterprise client projects and contributing to broader developer community.",
      "Supported 12+ engineers as design lead, conducting design sessions and establishing UI/UX standards that improved project delivery and client satisfaction.",
      "Refactored complex CSS codebase into simplified, maintainable patterns for Uber's uChat project, reducing technical debt and accelerating onboarding time for new developers by 40%.",
    ],
    url: "https://fullstacklabs.co",
  },
];
