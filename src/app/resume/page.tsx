import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: "Kai Faust's professional resume and experience",
};

interface Experience {
  company: string;
  logo?: string;
  title: string;
  type: string;
  duration: string;
  location?: string;
  description: string | string[];
  url?: string;
}

const experiences: Experience[] = [
  {
    company: "3Branches",
    logo: "/3branches-logo.svg",
    title: "Co-Founder, COO, CPO",
    type: "Full-time",
    duration: "Feb 2025 - Oct 2025",
    location: "San Francisco, California, United States",
    description: [
      "Leading product, operations, and technical direction as Co-Founder. Building the core web application with modern full-stack technologies and designing the product experience.",
      "Architecting and developing runtime agents that power intelligent automation and decision-making capabilities.",
      "Driving design strategy and creating cohesive user experiences across all platforms.",
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
      "Infopop augments your reality with meaningful data. We give our users the power to think, collaborate and be more efficient with mixed reality, spatial awareness, and third-party API integrations.",
    ],
    url: "https://apps.apple.com/us/app/infopop/id1530246692",
  },
  {
    company: "Foundation Labs",
    title: "CEO",
    type: "Full-time",
    duration: "Apr 2019 - Mar 2021",
    location: "San Francisco",
    description:
      "Foundation Labs is an award-winning product development agency and avid open source software contributor. They specialize in performance, reliability, usability, and security. Their CEO, Kai Faust, is a digital product expert with a 9-year history in product development. He works with stakeholders to convert broad vision into actionable objectives. He is a developer who builds company-defining products, an operator who recruits and manages good people, and a long-term strategic thinker.",
  },
  {
    company: "October",
    logo: "/october-logo.svg",
    title: "Chief Product Officer",
    type: "Full-time",
    duration: "Apr 2017 - Apr 2019",
    location: "Menlo Park, CA",
    description: [
      "I worked on an ambitious venture-backed social network that made a big splash at the end of 2018.",
      "It was a classic startup story. We were agile and iterated rapidly. It was an intense environment. We would spend hours in design sessions working on innovations in the user experience. We conceptualized, designed, and built a product that was incredibly well-received by its users.",
      "I led the ideation, design, technical development, and launch of innovative products, and I established shared vision across the company by building consensus on priorities leading to product execution.",
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
      "Joined as the first employee at Sacramento's most successful software consultancy.",
      "Authored an advanced MIT-licensed SCSS framework for fast and scalable UI development, successfully integrated into over 5 client projects: https://github.com/kaifaust/fullstack-ui",
      "Supported over 12 engineers as the design lead.",
      "Refactored complex CSS into simpler, easier to understand code that made onboarding new developers faster at Uber uChat: https://eng.uber.com/uchat/",
    ],
    url: "https://fullstacklabs.co",
  },
];

export default function Resume() {
  return (
    <div className="min-h-screen">
      <div className="px-8 py-8 md:px-12 md:py-12 lg:px-16 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            Resume
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Professional experience and background
          </p>
        </div>

        {/* Experience Section */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="border-l-2 border-gray-200 dark:border-gray-800 pl-6 pb-6 last:pb-0"
            >
              {/* Company and Title */}
              <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {exp.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {exp.company} · {exp.type}
                  </p>
                </div>
              </div>

              {/* Duration and Location */}
              <div className="flex flex-col gap-1 mb-4 text-sm text-gray-500 dark:text-gray-500">
                <p>{exp.duration}</p>
                {exp.location && <p>{exp.location}</p>}
              </div>

              {/* Description */}
              <div className="text-gray-700 dark:text-gray-300 space-y-3">
                {typeof exp.description === "string" ? (
                  exp.description && <p>{exp.description}</p>
                ) : (
                  exp.description.map((paragraph, pIndex) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
