import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  IBM_Plex_Sans,
  Geist_Mono,
} from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ibmPlex = IBM_Plex_Sans({
  variable: "--font-ibm-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MEGA.TALK — Observability Layer für Outbound-Engines",
  description:
    "GDPR-natives Call-Intelligence-System. One-Sided Recording, AI-Scoring, Script Adherence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${cormorant.variable} ${ibmPlex.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-background text-foreground font-body antialiased">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
