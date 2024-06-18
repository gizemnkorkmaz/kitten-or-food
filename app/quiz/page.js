"use client";

import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { QuizContext } from "@/context/QuizContext";

const images = [
  { src: "/images/fat-cat-1.webp", answer: "fat" },
  { src: "/images/fat-cat-2.webp", answer: "fat" },
  { src: "/images/fat-cat-3.webp", answer: "fat" },
  { src: "/images/fat-cat-4.webp", answer: "fat" },
  { src: "/images/fat-cat-5.webp", answer: "fat" },
  { src: "/images/pregnant-cat-1.webp", answer: "pregnant" },
  { src: "/images/pregnant-cat-2.webp", answer: "pregnant" },
  { src: "/images/pregnant-cat-3.webp", answer: "pregnant" },
  { src: "/images/pregnant-cat-4.webp", answer: "pregnant" },
  { src: "/images/pregnant-cat-5.webp", answer: "pregnant" },
];

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

export default function Quiz() {
  const [shuffledImages, setShuffledImages] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [answerFeedback, setAnswerFeedback] = useState(null);
  const [answered, setAnswered] = useState(false);

  const { setQuizData } = useContext(QuizContext);
  const router = useRouter();

  useEffect(() => {
    setShuffledImages(shuffleArray([...images]));
  }, []);

  const handleAnswer = (answer) => {
    const currentImage = shuffledImages[currentQuestionIndex];
    const isCorrect = answer === currentImage.answer;
    setScore(score + (isCorrect ? 1 : 0));
    setAnswerFeedback(isCorrect);
    setAnswered(true);

    setTimeout(() => {
      setAnswerFeedback(null);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswered(false);
      if (currentQuestionIndex === shuffledImages.length - 1) {
        router.push("/result");
        setQuizData({
          score,
          total: shuffledImages.length,
          details: JSON.stringify(answeredQuestions),
        });
      }
    }, 2000);

    setAnsweredQuestions([
      ...answeredQuestions,
      { ...currentImage, correct: isCorrect },
    ]);
  };

  if (!shuffledImages.length) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-800">
        Loading...
      </div>
    );
  }

  const currentImage = shuffledImages[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#E6E6FA] text-purple-600 px-8">
      <h1 className="text-xl md:text-3xl font-bold mb-8 text-center">
        Kitten 🐾 or Food 🍔
      </h1>
      <div
        className={`mb-8 w-full max-w-md border-4 ${
          answerFeedback === true
            ? "border-green-500 rounded"
            : answerFeedback === false
            ? "border-red-500 rounded"
            : ""
        }`}
      >
        {answerFeedback !== null && (
          <p className="text-center text-md py-4 text-purple-400 italic">
            {currentImage.answer === "fat"
              ? "It's not fat, it's 'fluffy-boned'! 🍔"
              : "This cat's expecting a litter of cuteness! 🐾"}
          </p>
        )}
        <Image src={currentImage?.src} width={500} height={500} alt="Cat" />
      </div>
      <div className="flex flex-col gap-4 w-full max-w-md">
        <button
          onClick={() => handleAnswer("fat")}
          className={`answer-button bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-md w-full ${
            answered && "opacity-50"
          }`}
          disabled={answered}
        >
          Chubby Cat Conundrum (Fat)
        </button>
        <button
          onClick={() => handleAnswer("pregnant")}
          className={`answer-button bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-md w-full ${
            answered && "opacity-50"
          }`}
          disabled={answered}
        >
          Soon-to-be-Mommy Meow Mayhem (Pregnant)
        </button>
      </div>
      <p className="mt-8 text-xl">
        Clawzical Inquiry {currentQuestionIndex + 1} of {shuffledImages.length}
      </p>
    </div>
  );
}
