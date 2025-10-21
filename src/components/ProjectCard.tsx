import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const hasImage = !!project.metadata.image;
  const hasLogo = !!project.metadata.logo;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block border border-gray-200 dark:border-neutral-800 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white dark:bg-neutral-900"
    >
      {/* Project Image */}
      {hasImage && project.metadata.image && (
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image
            src={project.metadata.image}
            alt={project.metadata.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}

      <div className="p-6">
        {/* Logo or Title */}
        {hasLogo && project.metadata.logo ? (
          <div className="mb-4 h-8 flex items-center">
            <Image
              src={project.metadata.logo}
              alt={project.metadata.title}
              width={200}
              height={32}
              className="h-8 w-auto object-contain dark:hidden"
              loading="lazy"
            />
            {project.metadata.logoDark && (
              <Image
                src={project.metadata.logoDark}
                alt={project.metadata.title}
                width={200}
                height={32}
                className="h-8 w-auto object-contain hidden dark:block"
                loading="lazy"
              />
            )}
          </div>
        ) : (
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {project.metadata.title}
          </h3>
        )}

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {project.metadata.description}
        </p>

        {/* Tags */}
        {project.metadata.tags && project.metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.metadata.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
            {project.metadata.tags.length > 3 && (
              <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                +{project.metadata.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Date */}
        <time className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(project.metadata.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
          })}
        </time>
      </div>
    </Link>
  );
}
