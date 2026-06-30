import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lucas Maingi | ML Engineer & Full Stack Developer",
  description:
    "Portfolio of Lucas Maingi, an ML Engineer and Full Stack Developer specializing in high-performance intelligent applications, real-time data pipelines, and robust web solutions.",
  robots: "index, follow",
  openGraph: {
    title: "Lucas Maingi | ML Engineer & Full Stack Developer",
    description:
      "ML Engineer & Full Stack Developer portfolio showcasing real-world threat intelligence, real-time fraud detection, and SaaS churn prediction applications.",
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
