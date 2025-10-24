import { MetadataRoute } from 'next'
import { getAllProjects } from '@/lib/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects()

  const projectUrls = projects.map((project) => ({
    url: `https://www.kaifaust.com/projects/${project.slug}`,
    lastModified: new Date(project.metadata.date),
    changeFrequency: 'monthly' as const,
    priority: project.metadata.featured ? 0.9 : 0.7,
  }))

  return [
    {
      url: 'https://www.kaifaust.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.kaifaust.com/projects',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...projectUrls,
  ]
}
