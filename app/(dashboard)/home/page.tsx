import { options } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

const Home = async () => {
  const session = await getServerSession(options);
  //   console.log(session);
  if (session?.user)
    return <h2>Admin page - welcome back {session?.user.username}</h2>;
  return (
    <h2>
      Please <Link href="/login">login</Link> to see this admin page.
    </h2>
  );
};

export default Home;
