import "./globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MotionLayer } from "@/components/motion-layer";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans"
});

const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display"
});

export const metadata: Metadata = {
  title: "Beyond Expertise — Formations data, IA, gestion de projet & agile",
  description: "Organisme de formation premium : catalogue data, BI, IA, gestion de projet, agile et business analysis. Inter, intra et parcours entreprise."
};

// Render every page on demand at request time, never at build time.
// Several pages fetch the API (beyond-api) which is NOT reachable during
// `next build` inside Docker — static prerendering would hang and fail the
// production build. Dynamic rendering hits the API at runtime instead.
export const dynamic = "force-dynamic";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fontSans.variable} ${fontDisplay.variable}`}>
      <body>
        <MotionLayer />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
