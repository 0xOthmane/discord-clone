import db from "@/lib/db";
import { getUserAuth } from "./auth";
import { redirect } from "next/navigation";

export const initProfile = async () => {
  const user = await getUserAuth();
  if (!user) return redirect('/login');
  const userDb = await db.user.findUnique({
    where:{
      username: user.username
    }
  })
  const profile = await db.profile.findUnique({
    where: {
      userId: userDb?.id ,
    },
  });
  if (profile) return profile;
  const newProfile = await db.profile.create({
    data: {
      userId: userDb?.id,
      name: userDb?.username!,
      imageUrl: "",
      email: userDb?.email!,
    },
  });
  return newProfile;
};
