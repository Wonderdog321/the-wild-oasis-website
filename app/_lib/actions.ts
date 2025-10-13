"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import { getBookings } from "./data-service";
import { supabase } from "./supabase";

interface bookingDataType {
  startDate: Date;
  endDate: Date;
  numNights: number;
  cabinPrice: number;
  cabinId: number;
}

export async function updateProfile(formData: FormData) {
  const nationalID = formData.get("nationalID");
  const nationalityRaw = formData.get("nationality");

  if (typeof nationalID !== "string" || typeof nationalityRaw !== "string")
    throw new Error("Invalid Form Data");
  const [nationality, countryFlag] = nationalityRaw.split("%");

  const session = await auth();
  if (!session) throw new Error("You must be logged in.");

  if (!/^[a-zA-z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID.");

  const updateData = { nationality, countryFlag, nationalID };

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}

export async function createBooking(
  bookingData: bookingDataType,
  formData: FormData,
) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in.");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")?.slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function deleteBooking(bookingId: number) {
  if (!bookingId) throw new Error("A valid booking ID is required.");

  const session = await auth();
  if (!session) throw new Error("You must be logged in.");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not authorized to delete this booking.");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

export async function updateBooking(formData: FormData) {
  const bookingId = Number(formData.get("bookingId"));
  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");
  if (!bookingId || !numGuests)
    throw new Error("Missing bookingId or number of guests.");

  const session = await auth();
  if (!session) throw new Error("You must be logged in.");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not authorized to update this booking.");

  const updateData = {
    numGuests: Number(numGuests),
    observations: observations?.slice(0, 1000),
  };
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    throw new Error("Booking could not be updated");
  }

  //Revalidating the edit page and the reservations page.
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);

  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
