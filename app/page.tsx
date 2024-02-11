import { InitialModal } from "@/components/molecules/InitialModal";
import { ModeToggle } from "./../components/atoms/ModeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUserAuth, options } from "@/lib/auth";
import { getServerSession } from "next-auth";
import UserAccountNav from "@/components/molecules/UserAccountNav";

export default async function Home() {
  const user = await getUserAuth();
  return (
    <div className="">
      <h1 className="text-3xl font-bold text-indigo-500">Discord clone</h1>
      <ModeToggle />
      {/* <InitialModal /> */}
      {user ? (
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
