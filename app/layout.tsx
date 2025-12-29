import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FreelancePolish – Professional English Messages for Freelancers",
    template: "%s | FreelancePolish",
  },
  description:
    "Never lose clients due to poor English tone. Get ready-to-use, polite, and professional message templates instantly. Built especially for freelancers in Asia.",
  keywords: [
    "freelance communication",
    "professional English messages",
    "freelancer templates",
    "client communication",
    "polite replies",
    "Asian freelancers",
    "Upwork messages",
    "Fiverr communication",
  ],
  authors: [{ name: "FreelancePolish" }],
  creator: "FreelancePolish",
  publisher: "FreelancePolish",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`min-h-screen ${geistSans.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
