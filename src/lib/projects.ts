import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";

export interface ProjectFeature {
  icon: string;
  title: string;
  description: string;
  image: string;
  imageDark?: string;
}

export interface ProjectMetadata {
  title: string;
  description: string;
  date: string;
  tags: string[];
  featured?: boolean;
  image?: string;
  url?: string;
  github?: string;
  logo?: string;
  logoDark?: string;
  features?: ProjectFeature[];
  featuredImage?: string;
}

export interface Project {
  slug: string;
  metadata: ProjectMetadata;
  content: string;
}

const projectsDirectory = path.join(process.cwd(), "content/projects");

function ensureProjectsDirectory() {
  if (!fs.existsSync(projectsDirectory)) {
    throw new Error(
      `Projects directory not found at ${projectsDirectory}. Please create the directory and add project MDX files.`
    );
  }
}

export const getAllProjects = cache((): Project[] => {
  ensureProjectsDirectory();

  const fileNames = fs.readdirSync(projectsDirectory);
  const projects = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        metadata: data as ProjectMetadata,
        content,
      };
    });

  // Sort by date (newest first)
  return projects.sort((a, b) => {
    return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
  });
});

export const getProjectBySlug = cache((slug: string): Project | null => {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      metadata: data as ProjectMetadata,
      content,
    };
  } catch (error) {
    console.error(`Error reading project ${slug}:`, error);
    return null;
  }
});

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((project) => project.metadata.featured);
}

export function getProjectSlugs(): string[] {
  ensureProjectsDirectory();
  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => fileName.replace(/\.mdx$/, ""));
}

export function getAllUniqueTags(): string[] {
  const projects = getAllProjects();
  const tagsSet = new Set<string>();

  projects.forEach((project) => {
    project.metadata.tags.forEach((tag) => {
      tagsSet.add(tag);
    });
  });

  return Array.from(tagsSet).sort();
}

export function filterProjectsByTags(projects: Project[], selectedTags: string[]): Project[] {
  if (selectedTags.length === 0) {
    return projects;
  }

  return projects.filter((project) => {
    // Project must have at least one of the selected tags
    return selectedTags.some((tag) => project.metadata.tags.includes(tag));
  });
}
