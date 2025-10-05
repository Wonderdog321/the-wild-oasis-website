import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Account",
};

export default function page() {
  return (
    <h2 className="text-accent-400 mb-7 text-2xl font-semibold">
      Welcome, David
    </h2>
  );
}
