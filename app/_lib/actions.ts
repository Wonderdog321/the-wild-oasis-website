"use server";

import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

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
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
