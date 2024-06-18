import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QuizProvider } from "@/context/QuizContext"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fat or Pregnant? 🙀",
  description: "Welcome to the Cat Quiz! You will be shown 5 images of cats, and your task is to guess if each cat is fat or pregnant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QuizProvider>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </QuizProvider>
  );
}
