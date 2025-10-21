import { getAllProjects } from "@/lib/projects";
import MasonryGrid from "@/components/MasonryGrid";
import ProjectCard from "@/components/ProjectCard";
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

  return (
    <div className="min-h-screen">
      <header className="text-center pt-24 pb-16 md:pt-32 lg:pt-40 px-8">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">Product Development Leadership that Ships</h1>
        <p className="text-md md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          I blend craft and business acumen to build exceptional products.
        </p>
      </header>

      <MasonryGrid>
        {allProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </MasonryGrid>
    </div>
  );
}
