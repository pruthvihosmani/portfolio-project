import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPortfolioContent } from "@/sanity/queries";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pruthvi Hosamani - Software Engineer",
  description:
    "Portfolio of Pruthvi Hosamani, a software engineer focused on Python, LLM systems, backend engineering, ML, full-stack projects, and client work.",
  keywords: ["Pruthvi Hosamani", "Software Engineer", "Python", "LLM Systems", "RAG", "Backend", "Machine Learning", "Sanity CMS"],
  openGraph: {
    title: "Pruthvi Hosamani - Software Engineer",
    description: "Interactive RAG-powered portfolio for Python, LLM systems, backend engineering, ML, and client work.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pruthvi Hosamani - Software Engineer",
    description: "Interactive RAG-powered portfolio for Python, LLM systems, backend engineering, ML, and client work.",
  },
};

export const revalidate = 60;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { profile, siteSettings } = await getPortfolioContent();

  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${manrope.variable} ${cormorant.variable} h-full scroll-smooth antialiased`}>
      <body className="pastel-page flex min-h-full flex-col text-slate-950">
        <SiteHeader settings={siteSettings} profile={profile} />
        <main className="flex-1">{children}</main>
        <SiteFooter settings={siteSettings} profile={profile} />
      </body>
    </html>
  );
}
