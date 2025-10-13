import { Suspense } from "react";
import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { cabinType } from "@/app/types/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cabinId: string }>;
}) {
  const resolvedParams = await params;
  const cabinId = Number(resolvedParams.cabinId);
  const { name } = await getCabin(cabinId);

  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins: cabinType[] = await getCabins();

  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));

  return ids;
}

export default async function Page({
  params,
}: {
  params: Promise<{ cabinId: string }>;
}) {
  const resolvedParams = await params;
  const cabinId = Number(resolvedParams.cabinId);
  const cabin: cabinType = await getCabin(cabinId);

  if (!cabin)
    throw new Error(
      "This cabin page does not exist. Please go back and try again.",
    );

  return (
    <div className="mx-auto mt-8 max-w-6xl">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-center text-5xl font-semibold">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
