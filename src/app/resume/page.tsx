import type { Metadata } from "next";
import { experiences } from "@/lib/resume-data";
import { Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Resume",
  description: "Kai Faust's professional resume and experience",
};

export default function Resume() {
  return (
    <div className="min-h-screen">
      <div className="px-8 py-8 md:px-12 md:py-12 lg:px-16 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
              Resume
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Professional experience and background
            </p>
          </div>
          <a
            href="/resume.pdf"
            download="Kai-Faust-Resume.pdf"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors whitespace-nowrap"
          >
            <Download size={18} />
            <span>Download PDF</span>
          </a>
        </div>

        {/* Experience Section */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="border-l-2 border-gray-200 dark:border-gray-800 pl-6 pb-6 last:pb-0"
            >
              {/* Company and Title */}
              <div className="mb-4">
                {/* Title and Duration - Two Column on md+ */}
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-1">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {exp.title}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-500 md:text-right whitespace-nowrap">
                    {exp.duration}
                  </p>
                </div>

                {/* Company and Location - Two Column on md+ */}
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                  <p className="text-gray-600 dark:text-gray-400">
                    {exp.company} · {exp.type}
                  </p>
                  {exp.location && (
                    <p className="text-sm text-gray-500 dark:text-gray-500 md:text-right whitespace-nowrap">
                      {exp.location}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="text-gray-700 dark:text-gray-300 space-y-3">
                {typeof exp.description === "string" ? (
                  exp.description && <p>{exp.description}</p>
                ) : (
                  exp.description.map((paragraph, pIndex) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
