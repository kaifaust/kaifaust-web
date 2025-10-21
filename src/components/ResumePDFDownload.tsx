'use client';

import { Download } from 'lucide-react';
import { useRef, useCallback } from 'react';

export function ResumePDFDownload() {
  const loadingRef = useRef(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleDownload = useCallback(async () => {
    if (loadingRef.current) return;

    loadingRef.current = true;
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
    }

    try {
      // Fetch resume data
      const dataResponse = await fetch('/api/resume/pdf?format=json');
      const data = await dataResponse.json();

      // Fetch fonts as base64 from server
      const fontResponse = await fetch('/api/resume/pdf?font=computer-modern-roman.ttf');
      const fontDataNormal = await fontResponse.json();

      const fontResponseBold = await fetch('/api/resume/pdf?font=computer-modern-roman-bold.ttf');
      const fontDataBold = await fontResponseBold.json();

      const fontResponseItalic = await fetch('/api/resume/pdf?font=computer-modern-roman-italic.ttf');
      const fontDataItalic = await fontResponseItalic.json();

      // Import jsPDF
      const { jsPDF } = await import('jspdf');

      // Create PDF document
      const doc = new jsPDF({
        unit: 'mm',
        format: 'letter',
      });

      // Add fonts using base64 data
      doc.addFont('data:application/octet-stream;base64,' + fontDataNormal.base64, 'ComputerModern', 'normal');
      doc.addFont('data:application/octet-stream;base64,' + fontDataBold.base64, 'ComputerModern', 'bold');
      doc.addFont('data:application/octet-stream;base64,' + fontDataItalic.base64, 'ComputerModern', 'italic');

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 24; // 50% more side margins
      const verticalMargin = 18; // Reduced top/bottom margins
      const contentWidth = pageWidth - margin * 2;

      let yPosition = verticalMargin;

      // Header - Name - Small caps style
      const name = data.personalInfo.name.toUpperCase();
      const nameWords = name.split(' ');
      let xPos = 0;

      nameWords.forEach((word, wordIndex) => {
        // First letter at 24pt
        doc.setFontSize(24);
        doc.setFont('ComputerModern', 'normal');
        doc.text(word[0], pageWidth / 2 + xPos - (nameWords.length > 1 ? 10 : 0), yPosition);

        // Remaining letters at 14pt
        doc.setFontSize(14);
        const remainingLetters = word.substring(1);
        const spacing = wordIndex === 0 ? 6.5 : 4.5; // More space after K, less after F
        doc.text(remainingLetters, pageWidth / 2 + xPos - (nameWords.length > 1 ? 10 : 0) + spacing, yPosition);

        xPos += doc.getStringUnitWidth(word) * 14 / 1000 + 14;
      });

      yPosition += 8;

      // Contact info
      doc.setFontSize(9);
      doc.setFont('ComputerModern', 'normal');
      const contactInfo = `${data.personalInfo.location} • ${data.personalInfo.email} • ${data.personalInfo.phone} • linkedin.com/in/kaifaust`;
      doc.text(contactInfo, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 5;

      // Skills section
      const skillsIndent = 8; // Indentation for skills content
      doc.setFontSize(10);
      doc.setFont('ComputerModern', 'normal');
      // Small caps effect: larger first letter + smaller uppercase rest
      doc.setFontSize(12);
      doc.text('S', margin, yPosition);
      doc.setFontSize(8);
      doc.text('KILLS', margin + 2.5, yPosition);
      yPosition += 2;

      // Line under SKILLS label
      doc.setDrawColor(0);
      doc.setLineWidth(0.15);
      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 4.5;

      // Render skills in 2-column format (category | description)
      doc.setFontSize(9);
      doc.setFont('ComputerModern', 'normal');

      const leftColumnWidth = 35; // Width for category column
      const rightColumnWidth = contentWidth - skillsIndent - leftColumnWidth; // Width for description column
      const columnGap = 0;

      // Render each skill row
      data.skills.forEach((skill: { category: string; description: string }) => {
        // Category (left column) - normal
        doc.setFont('ComputerModern', 'normal');
        doc.setFontSize(9);
        doc.text(skill.category, margin + skillsIndent, yPosition);

        // Description (right column) - normal, with text wrapping
        doc.setFont('ComputerModern', 'normal');
        doc.setFontSize(9);
        const descriptionLines = doc.splitTextToSize(
          skill.description,
          rightColumnWidth
        );

        // Draw description starting from right column
        doc.text(
          descriptionLines,
          margin + skillsIndent + leftColumnWidth + columnGap,
          yPosition
        );

        // Move down by the height of description (in case it wraps)
        const rowHeight = Math.max(
          4.2,
          descriptionLines.length * 3 + 2
        );
        yPosition += rowHeight;
      });

      yPosition += 3;

      // Work Experience section
      doc.setFontSize(10);
      doc.setFont('ComputerModern', 'normal');
      // Small caps effect: larger first letter + smaller uppercase rest
      doc.setFontSize(12);
      doc.text('W', margin, yPosition);
      doc.setFontSize(8);
      doc.text('ORK ', margin + 3.9, yPosition);
      doc.setFontSize(12);
      doc.text('E', margin + 11, yPosition);
      doc.setFontSize(8);
      doc.text('XPERIENCE', margin + 13.8, yPosition);
      yPosition += 2;

      // Line under WORK EXPERIENCE label
      doc.setDrawColor(0);
      doc.setLineWidth(0.15);
      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 5;

      // Experiences
      const experienceIndent = 8; // Indentation for work experience items
      data.experiences.forEach((exp: { company: string; duration: string; location?: string; title: string; description: string | string[] }) => {
        if (yPosition > pageHeight - verticalMargin - 10) {
          doc.addPage();
          yPosition = verticalMargin;
        }

        // Company name on left, Location (City, State) on right - INDENTED
        doc.setFont('ComputerModern', 'bold');
        doc.setFontSize(10);
        doc.text(exp.company, margin + experienceIndent, yPosition);

        // Display location on right side
        if (exp.location) {
          doc.setFont('ComputerModern', 'normal');
          doc.setFontSize(9);
          doc.text(exp.location, pageWidth - margin, yPosition, { align: 'right' });
        }
        yPosition += 4;

        // Title (italic) and Duration on right side - INDENTED
        doc.setFont('ComputerModern', 'italic');
        doc.setFontSize(9.5);
        doc.text(exp.title, margin + experienceIndent, yPosition);

        // Duration on right side (same line as title)
        doc.setFont('ComputerModern', 'normal');
        doc.setFontSize(9);
        doc.text(exp.duration, pageWidth - margin, yPosition, { align: 'right' });
        yPosition += 4;

        // Description (bullet points)
        doc.setFont('ComputerModern', 'normal');
        doc.setFontSize(9);
        const descriptions = Array.isArray(exp.description) ? exp.description : [exp.description];

        descriptions.forEach((desc: string, index: number) => {
          if (yPosition > pageHeight - verticalMargin - 5) {
            doc.addPage();
            yPosition = verticalMargin;
          }

          // Add spacing above the first bullet item
          if (index === 0) {
            yPosition += 1;
          }

          const bulletWidth = contentWidth - experienceIndent - 6;
          const splitText = doc.splitTextToSize(desc, bulletWidth);

          // First line with bullet (with spacing after bullet) - INDENTED
          doc.text('•  ' + splitText[0], margin + experienceIndent + 4, yPosition);
          yPosition += 4.2;

          // Subsequent lines (indented)
          for (let i = 1; i < splitText.length; i++) {
            if (yPosition > pageHeight - verticalMargin - 5) {
              doc.addPage();
              yPosition = verticalMargin;
            }
            doc.text(splitText[i], margin + experienceIndent + 7.5, yPosition);
            yPosition += 4.2;
          }

          // Add spacing between bullet items
          if (index < descriptions.length - 1) {
            yPosition += 1;
          }
        });

        yPosition += 3;
      });

      // Save the PDF
      doc.save('Kai-Faust-Resume.pdf');
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Failed to download resume. Please try again.');
    } finally {
      loadingRef.current = false;
      if (buttonRef.current) {
        buttonRef.current.disabled = false;
      }
    }
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={handleDownload}
      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Download size={18} />
      <span>Download PDF</span>
    </button>
  );
}
