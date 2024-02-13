import { initProfile } from "@/lib/initProfile";
import Link from "next/link";
import { InitialModal } from "@/components/molecules/InitialModal";
import { redirect } from "next/navigation";
import db from "@/lib/db";

const Home = async () => {
  // const session = await getServerSession(options);
  const profile = await initProfile();
  if (profile) {
    const profileWithServers = await db.profile.findUnique({
      where: {
        id: profile.id,
      },
      include: {
        servers: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
    if (profileWithServers?.servers.length === 0) return <InitialModal />;
    redirect(`/servers/${profileWithServers?.servers[0].id}`);
  }
  return (
    <h2>
      Please <Link href="/login">login</Link> to see this admin page.
    </h2>
  );
};

export default Home;
