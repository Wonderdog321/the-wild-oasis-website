"use client";

type ErrorProps = {
  error: { message: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main className="flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>
      <button
        className="bg-accent-500 hover:bg-accent-600 text-primary-800 inline-block cursor-pointer rounded-md px-6 py-3 text-lg transition duration-400 ease-in-out hover:scale-105"
        onClick={() => reset()}
      >
        Try again
      </button>
    </main>
  );
}
