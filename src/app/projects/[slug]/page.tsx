import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import type { Metadata } from "next";
import ProjectFeatures from "@/components/ProjectFeatures";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const ogImage = project.metadata.image || "/og-image.png";

  return {
    title: project.metadata.title,
    description: project.metadata.description,
    keywords: project.metadata.tags,
    openGraph: {
      title: project.metadata.title,
      description: project.metadata.description,
      type: "article",
      url: `https://kaifaust.com/projects/${slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: project.metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.metadata.title,
      description: project.metadata.description,
      images: [ogImage],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="p-8 max-w-4xl mx-auto">
        <article className="max-w-none dark:prose-invert">
          <div className="my-8">
            {project.metadata.logo ? (
              <div className="h-10 mb-4">
                <img
                  src={project.metadata.logo}
                  alt={project.metadata.title}
                  className="h-10 dark:hidden"
                />
                {project.metadata.logoDark && (
                  <img
                    src={project.metadata.logoDark}
                    alt={project.metadata.title}
                    className="h-10 hidden dark:block"
                  />
                )}
              </div>
            ) : (
              <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{project.metadata.title}</h1>
            )}
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              {project.metadata.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.metadata.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              {project.metadata.url && (
                <a
                  href={project.metadata.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-full transition-colors shadow-md hover:shadow-lg no-underline"
                >
                  View Live Site ↗
                </a>
              )}
              {project.metadata.github && (
                <a
                  href={project.metadata.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md text-gray-900 dark:text-white font-semibold rounded-full border border-gray-300/50 dark:border-gray-700/50 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-colors shadow-md hover:shadow-lg no-underline"
                >
                  View on GitHub ↗
                </a>
              )}
            </div>
          </div>
        </article>
      </div>

      {project.metadata.features && project.metadata.features.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-900 py-16">
          <ProjectFeatures features={project.metadata.features} />
        </div>
      )}

      <div className="p-8 max-w-4xl mx-auto">
        <article className="prose prose-lg max-w-none dark:prose-invert prose-img:max-h-[calc(100vh-2rem)] prose-img:w-auto prose-img:object-contain prose-video:max-h-[calc(100vh-2rem)] prose-video:w-auto">
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
            <MDXRemote
              source={project.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeHighlight],
                },
              }}
            />
          </div>
        </article>
      </div>
    </div>
  );
}
