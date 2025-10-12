import { NextRequest } from "next/server";
import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(
  request: NextRequest,
  { params }: { params: { cabinId: string } },
) {
  const { cabinId } = await params;
  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin not found." }, { status: 404 });
  }
}
