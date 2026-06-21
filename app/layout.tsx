import type { Metadata } from "next";
import {
  Raleway,
  Russo_One,
  Syne,
  Geist_Mono,
} from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const russo = Russo_One({
  variable: "--font-russo",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MEGA.TALK — MEGATHON Voice Revenue Demo",
  description:
    "Dark, stage-ready voice training demo for outbound teams: VAPI call simulation, AI scoring, script adherence, and post-call analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${russo.variable} ${raleway.variable} ${syne.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-background text-foreground font-body antialiased">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
