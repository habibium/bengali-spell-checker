import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const bengaliFont = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: "variable",
  variable: "--font-bengali",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bengali Spell Checker",
  description: "A web application for checking Bengali spelling",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${bengaliFont.variable}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
