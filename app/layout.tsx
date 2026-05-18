import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TaskNest — Work From Home & Earn Daily",
  description:
    "TaskNest connects you with flexible, well-paying online tasks you can complete from anywhere. Sign up free, upgrade to start earning.",
  keywords: ["remote work", "work from home", "earn online", "micro tasks", "TaskNest"],
  openGraph: {
    title: "TaskNest — Work From Home & Earn Daily",
    description: "Flexible, well-paying tasks. Earn $300+ a day from home.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f8fafc] text-[#1e293b]">
        {children}
      </body>
    </html>
  );
}