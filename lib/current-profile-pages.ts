import { getServerSession } from "next-auth";
import { options } from "./auth";
import { NextApiRequest } from "next";
import { NextApiResponseServerIo } from "@/types/types";
import db from "@/lib/db";

export const currentProfilePages = async (
  req: NextApiRequest,
  res: NextApiResponseServerIo
) => {
  const session = await getServerSession(req, res, options);
  if (!session?.user) return null;
  const user = await db.user.findUnique({
    where: {
      username: session?.user.username,
    },
    include: { profile: true },
  });
  return user?.profile;
};
