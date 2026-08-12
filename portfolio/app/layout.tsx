import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "../src/lib/utils";
import SmoothScroll from "../src/components/layout/SmoothScroll";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "Pratik Maurya | AI & Full Stack Engineer",
  description: "Portfolio of Pratik Maurya — Building intelligent digital experiences and scalable products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Yahan se 'scroll-smooth' hata diya gaya hai
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background text-foreground antialiased selection:bg-accent selection:text-black",
          inter.variable,
          spaceGrotesk.variable
        )}
      >
        {/* Poori website ko SmoothScroll se wrap kar diya */}
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}