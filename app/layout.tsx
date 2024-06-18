import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { QuizProvider } from "@/context/QuizContext"

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "Kitten or Food? 🙀",
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
      <body className={poppins.className}>{children}</body>
    </html>
    </QuizProvider>
  );
}
