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
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-6xl font-bold mb-8">Cat Quiz</h1>
      <div className="mb-8">
        <Image
          src={shuffledImages[currentQuestionIndex].src}
          width={500}
          height={500}
          alt="Cat"
        />
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => handleAnswer("fat")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
        >
          Fat
        </button>
        <button
          onClick={() => handleAnswer("pregnant")}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded"
        >
          Pregnant
        </button>
      </div>
      <p className="mt-8 text-xl">
        Question {currentQuestionIndex + 1} of {shuffledImages.length}
      </p>
    </div>
  );
}
