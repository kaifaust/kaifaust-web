import { NextResponse } from 'next/server';
import { personalInfo, experiences, skills } from '@/lib/resume-data';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format');
  const fontName = searchParams.get('font');

  try {
    // Return JSON data
    if (format === 'json') {
      return NextResponse.json({
        personalInfo,
        experiences,
        skills,
      });
    }

    // Return font file as base64
    if (fontName) {
      const fontDir = path.join(process.cwd(), 'public');
      const fontPath = path.join(fontDir, fontName);
      const fontBuffer = await readFile(fontPath);
      const base64 = fontBuffer.toString('base64');
      return NextResponse.json({ base64 });
    }

    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  } catch (error) {
    console.error('Error generating resume:', error);
    return NextResponse.json({ error: 'Failed to generate resume' }, { status: 500 });
  }
}
