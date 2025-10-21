const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

// Resume data
const resumeData = {
  name: "Kai Faust",
  email: "kaifaust@gmail.com",
  phone: "(707) 508-6371",
  location: "San Francisco, CA",
  experiences: [
    {
      company: "3Branches",
      title: "Co-Founder, COO, CPO",
      duration: "Feb 2025 - Oct 2025",
      location: "San Francisco, California, United States",
      description: [
        "Led product, operations, and technical direction as Co-Founder. Built core web application using Next.js, React, and modern full-stack technologies, delivering product experience across all platforms.",
        "Architected and developed custom agentic workflows with sub-agents and prompt engineering, enabling intelligent automation and autonomous decision-making capabilities.",
        "Established design strategy and created cohesive user experiences, driving 3Branches' market positioning and user engagement.",
      ],
    },
    {
      company: "InfoPop",
      title: "CEO",
      duration: "Jul 2020 - Jul 2025",
      location: "San Francisco, California",
      description: [
        "Founded and developed InfoPop, a consumer app featuring mixed reality and spatial awareness capabilities with innovative 3D scanner technology for capturing and augmenting physical spaces with contextual data.",
        "Built and shipped product on the Apple App Store, implementing third-party API integrations and real-time collaboration features to enable efficient spatial data sharing and exploration.",
        "Led product development through prototype phase, conducting user research and iterating on core features to explore product-market fit in the mixed reality space.",
      ],
    },
    {
      company: "Foundation Labs",
      title: "CEO",
      duration: "Apr 2019 - Mar 2021",
      location: "San Francisco",
      description: [
        "Led Foundation Labs as an award-winning product development agency, establishing market reputation in performance, reliability, usability, and security-focused solutions.",
        "Drove revenue growth and delivered complex product development projects for venture-backed companies and enterprises, converting strategic vision into actionable technical objectives.",
        "Established company culture and recruited engineering talent, building a team of high-performing developers while maintaining open source software contributions and community engagement.",
      ],
    },
    {
      company: "October",
      title: "Chief Product Officer",
      duration: "Apr 2017 - Apr 2019",
      location: "Menlo Park, CA",
      description: [
        "Led product strategy and execution for a venture-backed social network that achieved significant market traction and recognition at the end of 2018, reaching Product Hunt featured status.",
        "Drove rapid iteration and agile development cycles, conducting intensive design sessions that resulted in innovative user experience improvements and early user adoption.",
        "Managed end-to-end product development lifecycle from ideation through launch, establishing cross-functional consensus on priorities and driving product execution across engineering, design, and operations teams.",
      ],
    },
    {
      company: "FullStack Labs",
      title: "Head of Design",
      duration: "Nov 2015 - Mar 2017",
      location: "Sacramento, California",
      description: [
        "Joined as first employee and built design function at Sacramento's leading software consultancy, establishing design-driven development practices and culture.",
        "Authored and open-sourced an advanced MIT-licensed SCSS framework for fast and scalable UI development, achieving adoption across 5+ enterprise client projects and contributing to broader developer community.",
        "Supported 12+ engineers as design lead, conducting design sessions and establishing UI/UX standards that improved project delivery and client satisfaction.",
        "Refactored complex CSS codebase into simplified, maintainable patterns for Uber's uChat project, reducing technical debt and accelerating onboarding time for new developers by 40%.",
      ],
    },
  ],
};

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
    doc.fontSize(22).font('Times-Roman').text(resumeData.name.toUpperCase(), { align: 'center' });
    doc.moveDown(0.25);
    doc.fontSize(10).font('Times-Roman').text(`${resumeData.location} • ${resumeData.email} • ${resumeData.phone}`, { align: 'center' });
    doc.moveDown(0.5);

    // Section title with serif font (slightly smaller)
    doc.fontSize(10).font('Times-Bold').text('WORK EXPERIENCE');
    doc.moveDown(0.2);

    // Section line below title
    doc.moveTo(50, doc.y).lineTo(doc.page.width - 50, doc.y).stroke();
    doc.moveDown(0.4);

    // Experiences
    resumeData.experiences.forEach((exp, idx) => {
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
      if (idx < resumeData.experiences.length - 1 && doc.y > doc.page.height - 100) {
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
