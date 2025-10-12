"use client";

import { useOptimistic } from "react";
import { deleteReservation } from "../_lib/actions";
import { bookingType } from "../types/types";
import ReservationCard from "./ReservationCard";

export default function ReservationList({
  bookings,
}: {
  bookings: bookingType[];
}) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    },
  );

  async function handleDelete(bookingId: number) {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
