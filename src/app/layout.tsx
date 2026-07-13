import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lucasmaingi.vercel.app"),
  title: "Lucas Maingi | AI/ML Engineer & Full-Stack Developer",
  description:
    "Portfolio of Lucas Maingi, an AI/ML engineer and full-stack developer building complete products: machine learning services, Python/FastAPI backends, React/Next.js frontends, and LLM integrations — fraud detection, churn prediction, a WhatsApp commerce agent with M-Pesa payments, and more.",
  robots: "index, follow",
  openGraph: {
    title: "Lucas Maingi | AI/ML Engineer & Full-Stack Developer",
    description:
      "AI/ML engineer and full-stack developer: machine learning services, web applications, and LLM integrations with real payments, messaging, and security features.",
    type: "website",
    locale: "en_US",
    url: "https://lucasmaingi.vercel.app",
    siteName: "Lucas Maingi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucas Maingi | AI/ML Engineer & Full-Stack Developer",
    description:
      "AI/ML engineer and full-stack developer. Machine learning, web applications, and LLM integrations — fraud detection, churn prediction, payments, and messaging.",
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
