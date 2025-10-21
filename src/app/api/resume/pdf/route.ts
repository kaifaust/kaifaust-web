import { NextResponse } from 'next/server';
import { personalInfo, experiences } from '@/lib/resume-data';

export async function GET() {
  try {
    // Return structured data for client-side PDF generation
    return NextResponse.json({
      personalInfo,
      experiences,
    });
  } catch (error) {
    console.error('Error generating resume data:', error);
    return NextResponse.json(
      { error: 'Failed to generate resume data' },
      { status: 500 }
    );
  }
}
