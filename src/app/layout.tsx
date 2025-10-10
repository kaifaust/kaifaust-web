import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "highlight.js/styles/github-dark.css";
import Navigation from "@/components/Navigation";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kaifaust.com"),
  title: {
    default: "Kai Faust - Portfolio",
    template: "%s | Kai Faust",
  },
  description: "Developer building web applications. Portfolio of projects by Kai Faust, including 3branches.org and more.",
  keywords: ["Kai Faust", "Developer", "Portfolio", "Web Development", "Next.js", "React", "TypeScript"],
  authors: [{ name: "Kai Faust" }],
  creator: "Kai Faust",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kaifaust.com",
    title: "Kai Faust - Portfolio",
    description: "Developer building web applications. Portfolio of projects by Kai Faust.",
    siteName: "Kai Faust Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kai Faust - Portfolio",
    description: "Developer building web applications. Portfolio of projects by Kai Faust.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        <main className="md:ml-48">
          <div className="md:hidden px-6 pt-8 text-center">
            <SiteHeader />
          </div>
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
