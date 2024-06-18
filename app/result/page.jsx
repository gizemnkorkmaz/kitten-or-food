"use client";
import { useContext, useEffect, useState } from "react";
import { QuizContext } from "@/context/QuizContext";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

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

  const goHome = () => {
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-pink-[#E6E6FA] text-purple-900">
        <h1 className="text-md font-bold">Loading...</h1>
        <Button onClick={() => goHome()} variant="primary">
          Start Again
        </Button>
      </div>
    );
  }

  const { score, total } = quizData;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#E6E6FA] text-purple-900 max-w-[350px] m-auto">
      <h1 className="text-xl font-bold mb-4">The cat-culation shows:</h1>
      <p className="text-xl mb-4">
        {score} out of {total}
      </p>
      <p className="text-sm mb-8 max-w-[300px] text-center text-purple-700 italic">
        {scoreText}
      </p>
      <Button onClick={() => goHome()} variant="ghost">
        Fur-ward, replay!
      </Button>
    </div>
  );
}
