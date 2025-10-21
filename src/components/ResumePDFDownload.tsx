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
      const margin = 12.7; // 0.5 inch
      const contentWidth = pageWidth - margin * 2;

      let yPosition = margin;

      // Header - Name
      doc.setFontSize(20);
      doc.setFont('ComputerModern', 'bold');
      doc.text(data.personalInfo.name.toUpperCase(), pageWidth / 2, yPosition, {
        align: 'center',
      });
      yPosition += 6;

      // Contact info
      doc.setFontSize(8);
      doc.setFont('ComputerModern', 'normal');
      const contactInfo = `${data.personalInfo.location} • ${data.personalInfo.email} • ${data.personalInfo.phone}`;
      doc.text(contactInfo, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 5;

      // Horizontal line
      doc.setDrawColor(0);
      doc.setLineWidth(0.3);
      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 4;

      // Skills section
      doc.setFontSize(9);
      doc.setFont('ComputerModern', 'bold');
      doc.text('SKILLS', margin, yPosition);
      yPosition += 3;

      doc.setFontSize(8);
      doc.setFont('ComputerModern', 'normal');
      const skillsText = 'Efficient Computer for AI • Running spatial networks in tight spaces • Product Engineering, Product Management • Linux, Docker, Nodejs frameworks & directly sourced framework knowledge • Excellent coding from an architectural and support';
      const skillsLines = doc.splitTextToSize(skillsText, contentWidth);
      doc.text(skillsLines, margin, yPosition);
      yPosition += skillsLines.length * 2.5 + 3;

      // Work Experience section
      doc.setFontSize(9);
      doc.setFont('ComputerModern', 'bold');
      doc.text('WORK EXPERIENCE', margin, yPosition);
      yPosition += 3;

      doc.setLineWidth(0.2);
      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 3;

      // Experiences
      data.experiences.forEach((exp: { company: string; duration: string; location?: string; title: string; description: string | string[] }) => {
        if (yPosition > pageHeight - margin - 10) {
          doc.addPage();
          yPosition = margin;
        }

        // Company name and duration on same line
        doc.setFont('ComputerModern', 'bold');
        doc.setFontSize(9);
        doc.text(exp.company, margin, yPosition);

        // Duration on right side
        doc.setFont('ComputerModern', 'normal');
        doc.setFontSize(8);
        doc.text(exp.duration, pageWidth - margin, yPosition, { align: 'right' });
        yPosition += 3.5;

        // Location
        if (exp.location) {
          doc.setFont('ComputerModern', 'normal');
          doc.setFontSize(8);
          doc.text(exp.location, margin, yPosition);
          yPosition += 3;
        }

        // Title (italic)
        doc.setFont('ComputerModern', 'italic');
        doc.setFontSize(8.5);
        doc.text(exp.title, margin, yPosition);
        yPosition += 3;

        // Description (bullet points)
        doc.setFont('ComputerModern', 'normal');
        doc.setFontSize(8);
        const descriptions = Array.isArray(exp.description) ? exp.description : [exp.description];

        descriptions.forEach((desc: string) => {
          if (yPosition > pageHeight - margin - 5) {
            doc.addPage();
            yPosition = margin;
          }
          const bulletWidth = contentWidth - 4;
          const splitText = doc.splitTextToSize(desc, bulletWidth);

          // First line with bullet
          doc.text('• ' + splitText[0], margin + 2, yPosition);
          yPosition += 2.8;

          // Subsequent lines (indented)
          for (let i = 1; i < splitText.length; i++) {
            if (yPosition > pageHeight - margin - 5) {
              doc.addPage();
              yPosition = margin;
            }
            doc.text(splitText[i], margin + 4, yPosition);
            yPosition += 2.8;
          }
        });

        yPosition += 2;
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
