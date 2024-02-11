import db from "@/lib/db";
import { getUserAuth } from "./auth";
import { redirect } from "next/navigation";

export const initProfile = async () => {
  const user = await getUserAuth();
  if (!user) return redirect('/login');
  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });
  if (profile) return profile;
  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: user.username,
      imageUrl: user.image!,
      email: user.email!,
    },
  });
  return newProfile;
};
