"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type CatGifProps = {
  position: string;
};

const CatGif = ({ position }: CatGifProps) => (
  <div className={`cat-gif ${position}`}>
    <Image
      src="/images/cat-party.gif" 
      alt="Cat GIF"
      width={100}
      height={100}
    />
  </div>
);

export default function Home() {
  const router = useRouter();

  const startQuiz = () => {
    router.push("/quiz");
  };

  return (
    <main className="flex flex-col items-center justify-center rounded-md p-4 sm:p-8 text-center h-[100vh] text-white">
      {["top-left", "top-right", "bottom-left", "bottom-right"].map((position) => (
        <CatGif key={position} position={position} />
      ))}
      <div className="bg-neutral-800 p-8 sm:p-16 rounded-md">
        <h1 className="text-3xl sm:text-6xl font-bold mb-4">
          Cat Quiz: Are those cats pregnant or just fat? 🙀
        </h1>
        <p className="text-base sm:text-xl mb-8">
          Welcome to the Cat Quiz! You will be shown 5 images of cats, and your
          task is to guess if each cat is fat or pregnant.
        </p>
        <button
          onClick={startQuiz}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded"
        >
          Start
        </button>
      </div>
    </main>
  );
}
