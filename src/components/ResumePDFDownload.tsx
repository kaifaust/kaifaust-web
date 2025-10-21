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
      // Fetch PDF data from API
      const response = await fetch('/api/resume/pdf?format=json');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch resume data');
      }

      // Import jsPDF only when needed
      const { jsPDF } = await import('jspdf');

      // Create PDF document
      const doc = new jsPDF({
        unit: 'mm',
        format: 'letter',
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 12.7; // 0.5 inch
      const contentWidth = pageWidth - margin * 2;

      let yPosition = margin;

      // Set font for header
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text(data.personalInfo.name.toUpperCase(), pageWidth / 2, yPosition, {
        align: 'center',
      });
      yPosition += 8;

      // Contact info
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      const contactInfo = `${data.personalInfo.location} • ${data.personalInfo.email} • ${data.personalInfo.phone}`;
      doc.text(contactInfo, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 6;

      // Horizontal line
      doc.setDrawColor(0);
      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 4;

      // Section title
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text('WORK EXPERIENCE', margin, yPosition);
      yPosition += 3;

      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 3;

      // Experiences
      doc.setFontSize(9);
      data.experiences.forEach((exp: { company: string; duration: string; location?: string; title: string; description: string | string[] }) => {
        if (yPosition > pageHeight - margin - 15) {
          doc.addPage();
          yPosition = margin;
        }

        // Company name (bold) and duration (right aligned)
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        const companyText = doc.splitTextToSize(exp.company, contentWidth * 0.6);
        doc.text(companyText[0], margin, yPosition);

        // Duration on right side
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.text(exp.duration, pageWidth - margin, yPosition, { align: 'right' });
        yPosition += 4;

        // Location (smaller, below company)
        if (exp.location) {
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.text(exp.location, margin, yPosition);
          yPosition += 3;
        }

        // Title (italic)
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(9);
        doc.text(exp.title, margin, yPosition);
        yPosition += 4;

        // Description (bullet points)
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        const descriptions = Array.isArray(exp.description)
          ? exp.description
          : [exp.description];

        descriptions.forEach((desc: string) => {
          if (yPosition > pageHeight - margin - 5) {
            doc.addPage();
            yPosition = margin;
          }
          const bulletWidth = contentWidth - 4;
          const splitText = doc.splitTextToSize(desc, bulletWidth);

          // First line with bullet
          doc.text('• ' + splitText[0], margin + 2, yPosition);
          yPosition += 3.5;

          // Subsequent lines (indented)
          for (let i = 1; i < splitText.length; i++) {
            if (yPosition > pageHeight - margin - 5) {
              doc.addPage();
              yPosition = margin;
            }
            doc.text(splitText[i], margin + 4, yPosition);
            yPosition += 3.5;
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
