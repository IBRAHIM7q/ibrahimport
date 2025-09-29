import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { HMRErrorSuppressor } from "@/components/HMRErrorSuppressor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IBRAHIM - Full Stack Developer & UI/UX Designer",
  description: "Creative developer crafting extraordinary digital experiences with cutting-edge technology and innovative design solutions for the modern web.",
  keywords: ["IBRAHIM", "Full Stack Developer", "UI/UX Designer", "React", "Next.js", "TypeScript", "Tailwind CSS", "Web Development"],
  authors: [{ name: "IBRAHIM" }],
  openGraph: {
    title: "IBRAHIM - Full Stack Developer & UI/UX Designer",
    description: "Creative developer crafting extraordinary digital experiences with cutting-edge technology",
    url: "https://ibrahim-portfolio.com",
    siteName: "IBRAHIM Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IBRAHIM - Full Stack Developer & UI/UX Designer",
    description: "Creative developer crafting extraordinary digital experiences",
  },
  icons: {
    icon: [
      { url: '/logo.jpg', sizes: '16x16', type: 'image/jpeg' },
      { url: '/logo.jpg', sizes: '32x32', type: 'image/jpeg' },
    ],
    apple: [
      { url: '/logo.jpg', sizes: '180x180', type: 'image/jpeg' },
    ],
    shortcut: '/logo.jpg',
    manifest: '/manifest.json',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ErrorBoundary>
          <HMRErrorSuppressor />
          {children}
          <Toaster />
        </ErrorBoundary>
      </body>
    </html>
  );
}
