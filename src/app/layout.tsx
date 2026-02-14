import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mykhailo Kapustianyk | Portfolio",
  description:
    "Building Digital Solutions, One Rep at a Time. Full-stack developer from Poland specializing in fitness-focused applications.",
  keywords: [
    "developer",
    "portfolio",
    "React",
    "Next.js",
    "TypeScript",
    "full-stack",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${firaCode.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
