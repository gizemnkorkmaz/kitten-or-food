"use client";
import { useContext, useEffect, useState } from "react";
import { QuizContext } from "@/context/QuizContext";
import { useRouter } from "next/navigation";

export default function Result() {
  const router = useRouter();
  const { quizData } = useContext(QuizContext);
  const [loading, setLoading] = useState(true);
  const [scoreText, setScoreText] = useState("");

  useEffect(() => {
    if (quizData) {
      setLoading(false);
      const scorePercentage = (quizData.score / quizData.total) * 100;
      if (scorePercentage <= 30) {
        setScoreText(
          "Oops! Looks like you're feline a bit off today. Keep purr-acticing!"
        );
      } else if (scorePercentage <= 60) {
        setScoreText(
          "Not bad, but remember, even cats have nine lives! Keep chasing those correct answers."
        );
      } else if (scorePercentage <= 90) {
        setScoreText(
          "Great job! You've earned your whiskers today. Meow-velous!"
        );
      } else {
        setScoreText(
          "Purr-fect score! You're the cat's whiskers when it comes to cat trivia!"
        );
      }
    }
  }, [quizData]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-pink-[#E6E6FA] text-purple-900">
        <h1 className="text-md font-bold">Loading...</h1>
        <button
          onClick={() => router.push("/")}
          className="underline text-purple-700 hover:text-purple-900 font-bold py-3 px-6 rounded text-[14px]"
        >
          Start Again
        </button>
      </div>
    );
  }

  const { score, total } = quizData;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#E6E6FA] text-purple-900">
      <h1 className="text-3xl font-bold mb-8">Cat-tastic Results!</h1>
      <p className="text-xl mb-4">
        Your Score: {score} / {total}
      </p>
      <p className="text-sm mb-8 max-w-[300px] text-center text-purple-700 italic">
        {scoreText}
      </p>
      <button
        onClick={() => router.push("/")}
        className="underline text-purple-700 hover:text-purple-900 font-bold py-3 px-6 rounded text-[14px]"
      >
        Pawsome, Play Again! 🧶
      </button>
    </div>
  );
}
