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

  const { setQuizData } = useContext(QuizContext);

  const router = useRouter();

  useEffect(() => {
    setShuffledImages(shuffleArray([...images]));
  }, []);

  const handleAnswer = (answer) => {
    const currentImage = shuffledImages[currentQuestionIndex];
    if (answer === currentImage.answer) {
      setScore(score + 1);
      setAnsweredQuestions([
        ...answeredQuestions,
        { ...currentImage, correct: true },
      ]);
    } else {
      setAnsweredQuestions([
        ...answeredQuestions,
        { ...currentImage, correct: false },
      ]);
    }

    if (currentQuestionIndex < shuffledImages.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      router.push("/result");
      setQuizData({
        score,
        total: shuffledImages.length,
        details: JSON.stringify(answeredQuestions),
      });
    }
  };

  if (!shuffledImages.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-800">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-[#E6E6FA] text-purple-600">
      <h1 className="text-3xl md:text-6xl font-bold mb-8 text-center">
        Cat Quiz
      </h1>
      <div className="mb-8 w-full max-w-md">
        <Image
          src={shuffledImages[currentQuestionIndex].src}
          width={500}
          height={500}
          alt="Cat"
        />
      </div>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full max-w-md">
        <button
          onClick={() => handleAnswer("fat")}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded w-full"
        >
          Fat
        </button>
        <button
          onClick={() => handleAnswer("pregnant")}
          className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded w-full"
        >
          Pregnant
        </button>
      </div>
      <p className="mt-8 text-xl">
        Question {currentQuestionIndex + 1} of {shuffledImages.length}
      </p>
      <button
        onClick={() => router.push("/")}
        className="mt-8 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded"
      >
        Back Home
      </button>
    </div>
  );
}
