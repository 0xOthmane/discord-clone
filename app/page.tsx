import { InitialModal } from "@/components/molecules/InitialModal";
import { ModeToggle } from "./../components/atoms/ModeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { options } from "@/lib/auth";
import { getServerSession } from "next-auth";
import UserAccountNav from "@/components/molecules/UserAccountNav";

export default async function Home() {
  const session = await getServerSession(options);
  return (
    <div className="">
      <h1 className="text-3xl font-bold text-indigo-500">Discord clone</h1>
      <ModeToggle />
      <InitialModal />
      {session?.user ? (
        // <div>
          //* {session.user.username} */
          <UserAccountNav />
        // </div>
      ) : (
        <Button>
          <Link href="/login">Login</Link>
        </Button>
      )}
    </div>
  );
}
