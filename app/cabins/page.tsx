import { Suspense } from "react";
import { Metadata } from "next";
import CabinList from "../_components/CabinList";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";
import Spinner from "../_components/Spinner";
import { filterType } from "../types/types";

export const metadata: Metadata = {
  title: "Cabins",
};

type searchParamsProps = {
  searchParams: Promise<{ capacity: filterType | null }>;
};

export default async function Page({ searchParams }: searchParamsProps) {
  const params = await searchParams;
  const filter = params.capacity ?? "all";
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

      <div className="mb-8 flex justify-end">
        <Filter
          filterName="capacity"
          defaultValue="all"
          filters={[
            { text: "All Cabins", filterValue: "all" },
            { text: "1—3 Guests", filterValue: "small" },
            { text: "4—7 Guests", filterValue: "medium" },
            { text: "8—12 Guests", filterValue: "large" },
          ]}
        />
      </div>

      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
