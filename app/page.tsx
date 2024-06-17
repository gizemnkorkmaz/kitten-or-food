"use client"

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const startQuiz = () => {
    router.push('/quiz');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-48">
    <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
      <h1 className="text-6xl font-bold mb-4">Cat Quiz: Are those cats pregnant or just fat? 🙀</h1>
      <p className="text-xl mb-8">
        Welcome to the Cat Quiz! You will be shown 5 images of cats, and your task is to guess if each cat is fat or pregnant.
      </p>
      <button
        onClick={startQuiz}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
      >
        Start
      </button>
    </main>
  </div>
  );
}
