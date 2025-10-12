import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import { auth } from "../_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { cabinType, settingsType } from "../types/types";
import LoginMessage from "./LoginMessage";

export default async function Reservation({ cabin }: { cabin: cabinType }) {
  const [settings, bookedDates] = (await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ])) as [settingsType, Date[]];

  const session = await auth();

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px] mb-10 text-accent-400">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}
