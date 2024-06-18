"use client";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { QuizContext } from "@/context/QuizContext";
import Button from "@/components/Button";
import InfoPage from "@/components/InfoPage";
import { images } from "@/data/images";
import { hints } from "@/data/hints";
import shuffleArray from "@/utils/shuffleArray";

export default function Quiz() {
  const [shuffledImages, setShuffledImages] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [answerFeedback, setAnswerFeedback] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [infoCount, setInfoCount] = useState(0);
  const [currentHint, setCurrentHint] = useState(0);
  const [randomInfoImage, setRandomInfoImage] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const { setQuizData } = useContext(QuizContext);
  const router = useRouter();

  useEffect(() => {
    setShuffledImages(shuffleArray([...images]));
  }, []);

  const handleAnswer = (answer) => {
    const currentImage = shuffledImages[currentQuestionIndex];
    const isCorrect = answer === currentImage.answer;
    setScore((prevScore) => prevScore + (isCorrect ? 1 : 0));
    setAnswerFeedback(isCorrect);
    setAnswered(true);
    setSelectedAnswer(answer);

    setTimeout(() => {
      setAnswerFeedback(null);
      setSelectedAnswer(null);
      if (currentQuestionIndex === shuffledImages.length - 1) {
        setQuizData({
          score,
          total: shuffledImages.length,
          details: JSON.stringify(answeredQuestions),
        });
        router.push("/result");
      } else {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setAnswered(false);
        setInfoCount((prevCount) => prevCount + 1);
        if (infoCount < 3 && (currentQuestionIndex + 1) % 3 === 0) {
          setShowInfo(true);
          setRandomInfoImage(shuffledImages[Math.floor(Math.random() * shuffledImages.length)]);
          setCurrentHint((prevHint) => (prevHint === 0 ? 0 : prevHint + 1));
        } else {
          setShowInfo(false);
        }
      }
    }, 1000);

    setAnsweredQuestions((prevQuestions) => [
      ...prevQuestions,
      { ...currentImage, correct: isCorrect },
    ]);
  };

  const handleContinue = () => {
    setShowInfo(false);
    setInfoCount(0);
  };

  if (!shuffledImages.length) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-800">
        Loading...
      </div>
    );
  }

  const currentImage = shuffledImages[currentQuestionIndex];

  if (showInfo && randomInfoImage) {
    const hint = hints[currentHint];
    return (
      <InfoPage imageSrc={randomInfoImage.src} onContinue={handleContinue}>
        {hint}
      </InfoPage>
    );
  }

  const getButtonWrapperClass = (answer) => {
    if (!answered) return "";
    if (selectedAnswer === answer) {
      return answerFeedback ? "rounded-lg border-4 border-green-500" : "rounded-md border-4 border-red-500";
    }
    if (currentImage.answer === answer) {
      return "rounded-lg border-4 border-green-500";
    }
    return "";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#E6E6FA] text-purple-600 px-8">
      <div className="nyan-cat"></div>
      <h1 className="text-xl md:text-3xl font-bold mb-2 text-center">
        Kitten 🐾 or Food 🍔
      </h1>
      <div className="mb-8 w-full max-w-md">
        <div className={`feedback-container ${answerFeedback === null ? "hidden" : ""}`}>
          {answerFeedback !== null && (
            <p className="text-center pb-1 text-md text-purple-400 italic">
              {currentImage.answer === "fat" ? "It's not fat, it's 'fluffy-boned!" : "This cat's expecting a litter of cuteness!"}
              {answerFeedback ? " Nice job! ✅" : " Sorry! 🚨"}
            </p>
          )}
        </div>
        {currentImage.src && (
          <Image
            src={currentImage.src}
            width={500}
            height={500}
            alt="Cat"
            className="rounded"
          />
        )}
      </div>
      <div className="flex flex-col gap-4 w-full max-w-md">
          <Button
            onClick={() => handleAnswer("fat")}
            variant="primary"
            disabled={answered}
            className={getButtonWrapperClass("fat")}
          >
            Food Inside
          </Button>
          <Button
            onClick={() => handleAnswer("pregnant")}
            variant="secondary"
            disabled={answered}
            className={getButtonWrapperClass("pregnant")}
          >
            Kitten Inside
          </Button>
      </div>
      <p className="mt-8 text-xl">
        Clawzical Inquiry {currentQuestionIndex + 1} of {shuffledImages.length}
      </p>
    </div>
  );
}
