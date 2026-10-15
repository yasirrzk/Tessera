import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BentoGrid Maker — Neo-Brutalist & Tech Grid",
  description:
    "A no-code canvas to create modular neo-brutalist bento portfolio pages.",
  openGraph: {
    title: "BentoGrid Maker",
    description: "Build your modular neo-brutalist portfolio page.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
        {children}
      </body>
    </html>
  );
}
