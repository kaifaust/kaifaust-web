import { getAllProjects, getAllUniqueTags } from "@/lib/projects";
import ProjectsClient from "@/components/ProjectsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kai Faust - Portfolio",
  description: "Developer building web applications. Featured work includes 3branches.org.",
  openGraph: {
    title: "Kai Faust - Portfolio",
    description: "Developer building web applications. Featured work includes 3branches.org.",
    url: "https://kaifaust.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kai Faust - Portfolio",
    description: "Developer building web applications. Featured work includes 3branches.org.",
  },
};

export default function Home() {
  const allProjects = getAllProjects();
  const allTags = getAllUniqueTags();

  return (
    <div className="min-h-screen">
      <header className="text-center md:pt-24 pb-8 md:pb-16 md:pt-32 lg:pt-40 px-8">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">Case Studies</h1>
        <p className="text-md md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          I blend craft and business acumen to build exceptional products.
        </p>
      </header>

      <div className="px-8 max-w-7xl mx-auto">
        <ProjectsClient projects={allProjects} tags={allTags} />
      </div>
    </div>
  );
}
