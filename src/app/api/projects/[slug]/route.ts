import { NextResponse } from "next/server";
import { getProjectBySlug } from "@/lib/projects";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json({
    title: project.metadata.title,
    slug: project.slug,
  });
}
