const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');

// Resume data
const resumeData = {
  name: "Kai Faust",
  title: "CEO, Product Developer & Engineer",
  experiences: [
    {
      company: "3Branches",
      title: "Co-Founder, COO, CPO",
      type: "Full-time",
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
      type: "Full-time",
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
      type: "Full-time",
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
      type: "Full-time",
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
      type: "Full-time",
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
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  let yPosition = margin;

  // Set up fonts
  doc.setFont('helvetica', 'normal');

  // Header with name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.text(resumeData.name, margin, yPosition);
  yPosition += 10;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(80, 80, 80);
  doc.text(resumeData.title, margin, yPosition);
  yPosition += 8;

  // Add some spacing
  yPosition += 2;

  // Experience section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Professional Experience', margin, yPosition);
  yPosition += 6;

  // Add experiences
  resumeData.experiences.forEach((exp, index) => {
    // Check if we need a new page
    if (yPosition > pageHeight - 30) {
      doc.addPage();
      yPosition = margin;
    }

    // Company and Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(exp.title, margin, yPosition);
    yPosition += 5;

    // Company info
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    const companyText = `${exp.company} · ${exp.type}`;
    doc.text(companyText, margin, yPosition);
    yPosition += 4;

    // Duration and Location
    doc.setFontSize(9);
    doc.text(exp.duration, margin, yPosition);
    yPosition += 3;
    if (exp.location) {
      doc.text(exp.location, margin, yPosition);
      yPosition += 3;
    }

    // Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);

    const descriptions = Array.isArray(exp.description) ? exp.description : [exp.description];
    descriptions.forEach((desc) => {
      const lines = doc.splitTextToSize(desc, contentWidth - 5);
      lines.forEach((line) => {
        if (yPosition > pageHeight - 20) {
          doc.addPage();
          yPosition = margin;
        }
        doc.text(line, margin + 3, yPosition);
        yPosition += 3.5;
      });
      yPosition += 1;
    });

    yPosition += 3;
  });

  // Save the PDF
  const outputDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'resume.pdf');
  const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
  fs.writeFileSync(outputPath, pdfBuffer);

  console.log(`Resume PDF generated successfully at ${outputPath}`);
}

generateResumePDF();
