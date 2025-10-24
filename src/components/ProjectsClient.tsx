"use client";

import { useState } from "react";
import type { Project } from "@/lib/projects";
import TagFilter from "@/components/TagFilter";
import MasonryGrid from "@/components/MasonryGrid";
import ProjectCard from "@/components/ProjectCard";

interface ProjectsClientProps {
  projects: Project[];
  tags: string[];
}

export default function ProjectsClient({ projects, tags }: ProjectsClientProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredProjects = selectedTags.length === 0
    ? projects
    : projects.filter((project) =>
        selectedTags.some((tag) => project.metadata.tags.includes(tag))
      );

  return (
    <>
      <TagFilter
        tags={tags}
        selectedTags={selectedTags}
        onTagsChange={setSelectedTags}
      />
      <MasonryGrid>
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </MasonryGrid>
    </>
  );
}
