"use client";

import { useRouter } from "next/navigation";

function NotFound() {
  const router = useRouter();
  const handleGoBack = () => {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push("/"); // fallback route
    }
  };
  return (
    <main className="mt-4 space-y-6 text-center">
      <h1 className="text-3xl font-semibold">
        This cabin could not be found :(
      </h1>
      <button
        className="bg-accent-500 hover:bg-accent-600 text-primary-800 inline-block cursor-pointer rounded-md px-6 py-3 text-lg transition duration-400 ease-in-out hover:scale-105"
        onClick={handleGoBack}
      >
        Go Back
      </button>
    </main>
  );
}

export default NotFound;
