import { currentProfile } from "@/lib/auth";
import { redirect } from "next/navigation";
import db from "@/lib/db";

interface ServerIdPageProps {
  params: {
    serverId: string;
  };
}
const ServerIdPage = async ({ params }: ServerIdPageProps) => {
  const profile = await currentProfile();
  if (!profile) return redirect("/login");
  const { serverId } = params;
  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });
  const initialChannel = server?.channels[0];
  if (initialChannel?.name !== "general") return null;
  return redirect(`/servers/${serverId}/channels/${initialChannel?.id}`);
};

export default ServerIdPage;
