"use client"
import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { QuizContext } from '@/context/QuizContext';
import Button from '@/components/Button';
import InfoPage from '@/components/InfoPage'; 

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

const hints = [
  "A pregnant cat's abdomen gradually enlarges and feels firm due to developing kittens, often accompanied by enlarged and prominent nipples.",
  "In contrast, a fat cat's abdomen tends to be soft and saggy, lacking the firmness associated with pregnancy, with nipples that may also be larger but without the same prominence or sudden change.",
  "Behaviorally, a pregnant cat may exhibit nesting behavior and become more affectionate or protective, whereas a fat cat typically does not show nesting behaviors and may be less active due to excess weight.",
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
  const [showInfo, setShowInfo] = useState(false);
  const [infoCount, setInfoCount] = useState(0); 

  const { setQuizData } = useContext(QuizContext);

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
      if (currentQuestionIndex === shuffledImages.length - 1) {
        setQuizData({
          score,
          total: shuffledImages.length,
          details: JSON.stringify(answeredQuestions),
        });
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setAnswered(false);
        setInfoCount(infoCount + 1);
        if (infoCount < 3 && (currentQuestionIndex + 1) % 3 === 0) {
          setShowInfo(true);
        } else {
          setShowInfo(false);
        }
      }
    }, 1000);

    setAnsweredQuestions([
      ...answeredQuestions,
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

  if (showInfo) {
    const hint = hints[infoCount/3];
    console.log(infoCount, hint);
    return (
      <InfoPage
        imageSrc={currentImage.src}
        hint={hints[hint]}
        onContinue={handleContinue}
      >{hint}</InfoPage>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#E6E6FA] text-purple-600 px-8">
      <div className="nyan-cat"></div>
      <h1 className="text-xl md:text-3xl font-bold mb-2 text-center">
        Kitten 🐾 or Food 🍔
      </h1>
      <div className={`mb-8 w-full max-w-md border-4`}>
        <div
          className={`feedback-container ${
            answerFeedback === null ? 'hidden' : ''
          }`}
        >
          {answerFeedback !== null && (
            <p
              className={`text-center pb-1 text-md text-purple-400 italic ${
                answerFeedback
                  ? 'border-2 border-green-400 rounded p-2'
                  : 'border-2 border-red-500 p-2'
              }`}
            >
              {currentImage.answer === 'fat'
                ? "It's not fat, it's 'fluffy-boned!"
                : "This cat's expecting a litter of cuteness!"}
              {answerFeedback ? ' Nice job! ✅' : ' Sorry! 🚨'}
            </p>
          )}
        </div>
        <Image
          src={currentImage?.src}
          width={500}
          height={500}
          alt="Cat"
          className="rounded"
        />
      </div>
      <div className="flex flex-col gap-4 w-full max-w-md">
        <Button
          onClick={() => handleAnswer('fat')}
          variant="primary"
          disabled={answered}
        >
          Food Inside
        </Button>
        <Button
          onClick={() => handleAnswer('pregnant')}
          variant="secondary"
          disabled={answered}
        >
          Kitten Inside
        </Button>
      </div>
      <p className="mt-8 text-xl">
        Clawzical Inquiry {currentQuestionIndex + 1} of{' '}
        {shuffledImages.length}
      </p>
    </div>
  );
}
