const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const { personalInfo, experiences } = require('./resume-data');

function generateResumePDF() {
  try {
    const outputDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, 'resume.pdf');
    const doc = new PDFDocument({
      size: 'Letter',
      margin: 50,
    });

    doc.pipe(fs.createWriteStream(outputPath));

    const pageWidth = doc.page.width - 100; // Subtract larger margins (50 on each side)

    // Header - Name with serif font and larger size
    doc.fontSize(22).font('Times-Roman').text(personalInfo.name.toUpperCase(), { align: 'center' });
    doc.moveDown(0.25);
    doc.fontSize(10).font('Times-Roman').text(`${personalInfo.location} • ${personalInfo.email} • ${personalInfo.phone}`, { align: 'center' });
    doc.moveDown(0.5);

    // Section title with serif font (slightly smaller)
    doc.fontSize(10).font('Times-Bold').text('WORK EXPERIENCE');
    doc.moveDown(0.2);

    // Section line below title
    doc.moveTo(50, doc.y).lineTo(doc.page.width - 50, doc.y).stroke();
    doc.moveDown(0.4);

    // Experiences
    experiences.forEach((exp, idx) => {
      // Company and location on same line (left/right aligned)
      const currentY = doc.y;
      doc.fontSize(10).font('Times-Bold').text(exp.company, 50, currentY, { width: pageWidth - 80, continued: false });
      doc.fontSize(9).font('Times-Roman').text(exp.location, 50, currentY, { width: pageWidth, align: 'right' });
      doc.moveDown(0.4);

      // Title (italicized) and duration on same line
      const titleY = doc.y;
      doc.fontSize(9).font('Times-Italic').text(exp.title, 50, titleY, { width: pageWidth - 80, continued: false });
      doc.fontSize(9).font('Times-Roman').text(exp.duration, 50, titleY, { width: pageWidth, align: 'right' });
      doc.moveDown(0.4);

      // Bullet points
      exp.description.forEach((bullet) => {
        const bulletY = doc.y;
        doc.fontSize(9).font('Times-Roman').text('•', 60, bulletY);
        doc.fontSize(9).font('Times-Roman').text(bullet, 72, bulletY, { width: pageWidth - 32, align: 'left', lineGap: 2 });
        doc.moveDown(0.35);
      });

      doc.moveDown(0.3);

      // Page break if needed
      if (idx < experiences.length - 1 && doc.y > doc.page.height - 100) {
        doc.addPage();
        doc.moveTo(50, doc.y).lineTo(doc.page.width - 50, doc.y).stroke();
        doc.moveDown(0.4);
      }
    });

    doc.end();

    console.log(`Resume PDF generated successfully at ${outputPath}`);
  } catch (error) {
    console.error('Error generating resume PDF:', error);
    process.exit(1);
  }
}

generateResumePDF();
