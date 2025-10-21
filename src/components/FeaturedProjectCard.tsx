"use client";

import Link from "next/link";
import Image from "next/image";
import ProjectFeatures from "./ProjectFeatures";
import type { Project } from "@/lib/projects";

interface FeaturedProjectCardProps {
  project: Project;
}

export default function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-8">
        <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-8">
          <div className="text-center">
            {project.metadata.logo ? (
              <div className="h-16 mx-auto mb-4">
                <Image
                  src={project.metadata.logo}
                  alt={project.metadata.title}
                  width={200}
                  height={64}
                  className="h-16 mx-auto dark:hidden object-contain"
                />
                {project.metadata.logoDark && (
                  <Image
                    src={project.metadata.logoDark}
                    alt={project.metadata.title}
                    width={200}
                    height={64}
                    className="h-16 mx-auto hidden dark:block object-contain"
                  />
                )}
              </div>
            ) : (
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                {project.metadata.title}
              </h2>
            )}
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              {project.metadata.description}
            </p>
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {project.metadata.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-full transition-colors shadow-md hover:shadow-lg"
              >
                Project Details →
              </Link>
              {project.metadata.url && (
                <a
                  href={project.metadata.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md text-gray-900 dark:text-white font-semibold rounded-full border border-gray-300/50 dark:border-gray-700/50 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-colors shadow-md hover:shadow-lg"
                >
                  View Live Site ↗
                </a>
              )}
            </div>
            {project.metadata.image && (
              <div className="mt-8 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={project.metadata.image}
                  alt={project.metadata.title}
                  width={800}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            )}
          </div>
          <ProjectFeatures features={project.metadata.features || []} />
        </div>
      </div>
    </section>
  );
}
