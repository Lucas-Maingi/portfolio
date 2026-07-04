import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lucas Maingi | AI Engineer — Agentic Systems & LLM Applications",
  description:
    "Portfolio of Lucas Maingi, an AI Engineer building production-shaped agents, LLM tooling, and machine learning systems: WhatsApp commerce agents with real M-Pesa payments, an LLM eval/regression-gate toolkit, a drop-in LLM security gateway, and more.",
  robots: "index, follow",
  openGraph: {
    title: "Lucas Maingi | AI Engineer — Agentic Systems & LLM Applications",
    description:
      "AI Engineer portfolio showcasing agentic AI systems, LLM evaluation tooling, fraud detection, LLM security, and real-world fintech/automation integrations.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#0a0a0a] text-white flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
