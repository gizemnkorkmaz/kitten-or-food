"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type CatGifProps = {
  position: string;
};

const CatGif = ({ position }: CatGifProps) => (
  <div className={`cat-gif ${position}`}>
    <Image src="/images/cat-party.gif" alt="Cat GIF" width={100} height={100} />
  </div>
);

export default function Home() {
  const router = useRouter();

  const startQuiz = () => {
    router.push("/quiz");
  };

  return (
    <main className="flex flex-col items-center justify-center rounded-md p-4 sm:p-8 text-center h-[100vh]">
      {[
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right",
        "top-center",
      ].map((position) => (
        <CatGif key={position} position={position} />
      ))}
      <div className="bg-pink-100 p-8 rounded-md shadow-lg max-w-[450px]">
        <Header />
        <p className="text-[14px] sm:text-md mb-8 text-gray-700">
          Welcome to the Cat Quiz! You will be shown 5 images of cats, and your
          task is to guess if each cat is fat or pregnant.
        </p>
        <Button onClick={startQuiz} variant="primary" >
        Paws up, begin!
        </Button>
      </div>
      <Footer />
    </main>
  );
}
