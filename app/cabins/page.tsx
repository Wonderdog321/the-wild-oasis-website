import { Suspense } from "react";
import { Metadata } from "next";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";
import { filterType } from "../types/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Cabins",
};

type searchParamsProps = { searchParams: { capacity: filterType | null } };

export default function Page({ searchParams }: searchParamsProps) {
  const filter = searchParams.capacity ?? "all";
  return (
    <div>
      <h1 className="text-accent-400 mb-5 text-4xl font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 mb-10 text-lg">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <Suspense fallback={<Spinner />}>
        <CabinList filter={filter} />
      </Suspense>
    </div>
  );
}
