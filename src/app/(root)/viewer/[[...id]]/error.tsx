"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-screen w-full items-center justify-center bg-gray-100 text-gray-800">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Oops! Something went wrong!</h2>
        <p className="mb-4">An unexpected error has occurred.</p>
        <button
          onClick={() => reset()}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Try Again
        </button>
        {error.digest && (
          <p className="mt-4 text-sm text-gray-600">Error ID: {error.digest}</p>
        )}
      </div>
    </main>
  );
}
