'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import SiteHeader from "./SiteHeader";

const navigationItems = [
  { name: "Case Studies", href: "/" },
  { name: "Contact", href: "/contact" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentProjectTitle, setCurrentProjectTitle] = useState<string | undefined>(undefined);

  const isProjectPage = pathname.startsWith('/projects/');

  useEffect(() => {
    if (isProjectPage) {
      const slug = pathname.split('/projects/')[1]?.split('/')[0];
      if (slug) {
        fetch(`/api/projects/${slug}`)
          .then(res => res.json())
          .then(data => {
            if (data.title) {
              setCurrentProjectTitle(data.title);
            }
          })
          .catch(err => {
            console.error('Failed to fetch project:', err);
            setCurrentProjectTitle(undefined);
          });
      }
    } else {
      setCurrentProjectTitle(undefined);
    }
  }, [pathname, isProjectPage]);

  return (
    <>
      {/* Desktop Navigation - Left Sidebar */}
      <nav className="hidden md:flex fixed left-0 top-0 h-screen w-48 flex-col px-6 py-8 z-50">
        <SiteHeader />
        <div className="flex flex-col gap-3">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href || (item.href === "/" && isProjectPage);
            const isCaseStudies = item.name === "Case Studies";

            return (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className={`text-gray-900 dark:text-white text-sm py-2 px-4 rounded-lg transition-colors block ${
                    isActive ? "bg-gray-200 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {item.name}
                </Link>

                {/* Sub-navigation for active project */}
                {isCaseStudies && isProjectPage && currentProjectTitle && (
                  <div className="mt-2 ml-4">
                    <div className="flex min-h-8">
                      <div className="flex flex-col self-stretch mr-px">
                        {/* Top half - vertical line */}
                        <div className="flex-1 w-px bg-gray-300 dark:bg-gray-600" />
                        {/* Horizontal line */}
                        <div className="w-3 h-px bg-gray-300 dark:bg-gray-600" />
                        {/* Bottom half - empty space */}
                        <div className="flex-1" />
                      </div>

                      {/* Text */}
                      <div className="py-2 px-4 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
                        {currentProjectTitle}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Mobile Menu Button - Bottom */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md text-gray-900 dark:text-white px-6 py-3 rounded-full z-40 flex items-center gap-2 border border-white/20 dark:border-gray-700/50 shadow-lg"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        Menu
      </button>

      {/* Mobile Menu - Full Screen Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white dark:bg-black z-50 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-6">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href || (item.href === "/" && isProjectPage);
              const isCaseStudies = item.name === "Case Studies";

              return (
                <div key={item.name} className="flex flex-col items-center">
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-gray-900 dark:text-white text-xl py-3 px-6 rounded-lg transition-colors ${
                      isActive ? "bg-gray-200 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {item.name}
                  </Link>

                  {/* Sub-navigation for active project on mobile */}
                  {isCaseStudies && isProjectPage && currentProjectTitle && (
                    <div className="mt-3 ml-4">
                      <div className="flex min-h-12">
                        <div className="flex flex-col self-stretch mr-px">
                          {/* Top half - vertical line */}
                          <div className="flex-1 w-px bg-gray-300 dark:bg-gray-600" />
                          {/* Horizontal line */}
                          <div className="w-4 h-px bg-gray-300 dark:bg-gray-600" />
                          {/* Bottom half - empty space */}
                          <div className="flex-1" />
                        </div>

                        {/* Text */}
                        <div className="py-3 px-6 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white text-lg">
                          {currentProjectTitle}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="absolute bottom-32 text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Kai Faust. All rights reserved.
          </div>

          {/* Close Button */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute bottom-12 bg-gray-200 dark:bg-gray-700 rounded-full p-4 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
