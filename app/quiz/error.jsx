"use client";

import { useEffect } from "react";
import Button from "@/components/Button";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100 text-red-800 p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <Button
        onClick={() => reset()}
        variant="secondary"
        className="bg-red-200 text-red-800 hover:bg-red-300 py-2 px-4 rounded"
      >
        Try again
      </Button>
    </div>
  );
}
