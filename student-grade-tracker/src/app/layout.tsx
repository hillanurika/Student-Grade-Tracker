import type { Metadata } from "next";
import "./globals.css";
import { GradeProvider } from "@/context/GradeContext";

export const metadata: Metadata = {
  title: "Student Grade Tracker",
  description: "Professional student result management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased">
        <GradeProvider>{children}</GradeProvider>
      </body>
    </html>
  );
}
