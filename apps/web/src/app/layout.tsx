import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased">{children}</body>
    </html>
  );
}
