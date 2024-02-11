import { initProfile } from "@/lib/initProfile";
import Link from "next/link";

const Home = async () => {
  // const session = await getServerSession(options);
  const profile = await initProfile()
  if (profile)
    return <h2>Admin page - welcome back {profile.name}</h2>;
  return (
    <h2>
      Please <Link href="/login">login</Link> to see this admin page.
    </h2>
  );
};

export default Home;
