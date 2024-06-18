"use client";

import { useContext } from "react";
import { QuizContext } from "@/context/QuizContext";

export default function Result() {
  const { quizData } = useContext(QuizContext);

  return (
    quizData && (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-6xl font-bold mb-8">Quiz Results</h1>
        <p className="text-2xl mb-4">
          Your Score: {score} / {total}
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
        >
          Back to Home
        </button>
      </div>
    )
  );
}
