import { getAllProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import FeaturedProjectCard from "@/components/FeaturedProjectCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
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
  const projectsWithFeatures = allProjects.filter(
    (p) => p.metadata.features && p.metadata.features.length > 0
  );
  const projectsWithoutFeatures = allProjects.filter(
    (p) => !p.metadata.features || p.metadata.features.length === 0
  );

  return (
    <div className="min-h-screen">
      <header className="text-center pt-24 pb-16 md:pt-32 lg:pt-40 px-8">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">Design Leadership that Ships</h1>
        <p className="text-md md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          I blend craft and first-principles thinking to build exceptional products.
        </p>
      </header>

      {projectsWithFeatures.map((project) => (
        <FeaturedProjectCard key={project.slug} project={project} />
      ))}

      {projectsWithoutFeatures.length > 0 && (
        <section className="max-w-6xl mx-auto px-8 py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            {projectsWithoutFeatures.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
