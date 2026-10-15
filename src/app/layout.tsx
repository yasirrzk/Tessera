import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BentoGrid Maker — Build your portfolio, beautifully.",
  description:
    "A no-code drag-and-drop canvas to create stunning bento-style portfolio pages instantly.",
  openGraph: {
    title: "BentoGrid Maker",
    description: "Build your modular portfolio page without code.",
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
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
    >
      <body className="noise-overlay min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
        {children}
      </body>
    </html>
  );
}
