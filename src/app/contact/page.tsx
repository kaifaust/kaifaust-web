'use client';

import { useState } from 'react';

export default function Contact() {
  const [emailRevealed, setEmailRevealed] = useState(false);

  return (
    <div className="min-h-screen">
      <header className="text-center pt-24 pb-16 md:pt-32 lg:pt-40 px-8">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">Let&apos;s Connect</h1>
        <p className="text-md md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          I&apos;m always open to discussing new projects, creative ideas, or opportunities to collaborate.
        </p>
      </header>

      <section className="max-w-4xl mx-auto px-8 pb-24">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Email Column */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Email</h2>
            <div className="space-y-3">
              {!emailRevealed ? (
                <button
                  onClick={() => setEmailRevealed(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Click to reveal email
                </button>
              ) : (
                <div className="space-y-2">
                  <a
                    href="mailto:kaifaust@gmail.com"
                    className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors inline-block"
                  >
                    kaifaust@gmail.com
                  </a>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    I typically respond within 24-48 hours.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Additional Info Column */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Get in Touch</h2>
            <div className="space-y-3 text-gray-600 dark:text-gray-400">
              <p>
                Whether you have a question about my work, want to discuss a potential collaboration, or just want to say hello, I&apos;d love to hear from you.
              </p>
              <p className="text-sm">
                Feel free to reach out via email and I&apos;ll get back to you as soon as possible.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
