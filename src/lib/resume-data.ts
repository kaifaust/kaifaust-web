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

export interface Skill {
  category: string;
  description: string;
}

export const personalInfo = {
  name: "Kai Faust",
  email: "kaifaust@gmail.com",
  phone: "(707) 508-6371",
  location: "San Francisco, CA",
  linkedin: "https://www.linkedin.com/in/kaifaust/",
};

export const skills: Skill[] = [
  {
    category: "AI Agents:",
    description: "Prompt engineering, agentic search, orchestration, workflows",
  },
  {
    category: "Software:",
    description: "TypeScript, Python, Next.js, Docker, Google Cloud, AWS",
  },
  {
    category: "Design:",
    description: "UI, UX, Sketch, Figma, Illustrator",
  },
];

export const experiences: Experience[] = [
  {
    company: "3Branches",
    logo: "/3branches-logo.svg",
    title: "Co-Founder, COO, CPO",
    type: "Full-time",
    duration: "Feb 2025 - Oct 2025",
    location: "San Francisco, CA",
    description: [
      "Led product, operations, and technical direction. Built core web application using Next.js, React, and modern full-stack technologies, delivering product experience across all platforms.",
      "Architected and deployed agentic search that connects legal information from thousands of documents in under 60 seconds.",
      "Established design strategy and created cohesive user experiences, driving 3Branches' user engagement.",
    ],
  },
  {
    company: "InfoPop",
    logo: "/infopop-logo.svg",
    title: "CEO",
    type: "Full-time",
    duration: "Jul 2020 - Jul 2025",
    location: "San Francisco, CA",
    description: [
      "Founded and developed InfoPop, a consumer app featuring mixed reality and spatial awareness capabilities with innovative 3D scanner technology for capturing and augmenting physical spaces with contextual data, achieving 10M+ online impressions through viral content.",
      "Built and shipped product on the Apple App Store.",
      "Led product development, conducting user research and iterating on core features to explore product-market fit in the mixed reality space.",
    ],
  },
  {
    company: "Foundation Labs",
    title: "CEO",
    type: "Full-time",
    duration: "Apr 2019 - Mar 2021",
    location: "Los Angeles, CA",
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
      "Led product strategy and execution for a venture-backed social network.",
      "Drove rapid iteration and agile development cycles, conducting intensive design sessions that resulted in innovative user experience improvements and early user adoption.",
      "Managed end-to-end product development lifecycle from ideation through launch, establishing cross-functional consensus on priorities and driving product execution across engineering, design, and operations.",
    ],
    url: "https://www.producthunt.com/posts/october-2",
  },
  {
    company: "FullStack Labs",
    logo: "/fullstack-labs-logo.svg",
    title: "Head of Design",
    type: "Full-time",
    duration: "Nov 2015 - Mar 2017",
    location: "Sacramento, CA",
    description: [
      "Joined as first employee and built design function at Sacramento's leading software consultancy, establishing design-driven development practices and culture.",
      "Authored and open-sourced an advanced MIT-licensed SCSS framework for fast and scalable UI development, achieving adoption across 5+ enterprise client projects.",
      "Supported 12+ engineers as design lead, establishing UI/UX standards that improved project delivery and client satisfaction.",
      "Refactored legacy CSS codebase into simplified, maintainable patterns for Uber's uChat project, reducing technical debt and accelerating onboarding time for new developers by 40%.",
    ],
    url: "https://fullstacklabs.co",
  },
];
