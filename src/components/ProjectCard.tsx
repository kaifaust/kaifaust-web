import Link from "next/link";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export default function ProjectCard({
  project,
  featured = false,
}: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`block p-6 border rounded-lg hover:shadow-lg transition-all bg-white dark:bg-gray-900 ${
        featured
          ? "border-blue-500 dark:border-blue-600 bg-blue-50/50 dark:bg-blue-950/20"
          : "border-gray-200 dark:border-gray-800"
      }`}
    >
      {project.metadata.logo ? (
        <img
          src={project.metadata.logo}
          alt={project.metadata.title}
          className="h-6 mb-2"
        />
      ) : (
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{project.metadata.title}</h3>
      )}
      <p className="text-gray-600 dark:text-gray-400 mb-4">{project.metadata.description}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {project.metadata.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex gap-4 text-sm">
        {project.metadata.url && (
          <span className="text-blue-600 dark:text-blue-400 hover:underline">Live Site →</span>
        )}
        {project.metadata.github && (
          <span className="text-blue-600 dark:text-blue-400 hover:underline">GitHub →</span>
        )}
      </div>
    </Link>
  );
}
