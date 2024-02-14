import { currentProfile } from "@/lib/auth";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { ModeToggle } from "../atoms/ModeToggle";
import NavigationAction from "../atoms/NavigationAction";
import NavigationItem from "../atoms/NavigationItem";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

const NavBar = async () => {
  const profile = await currentProfile();
  if (!profile) return redirect("/");
  const servers = await db.server.findMany({
    where: {
      members: {
        some: { profileId: profile.id },
      },
    },
  });
  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3">
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300 dak:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle/>
        {/* TODO: User button */}
      </div>
    </div>
  );
};

export default NavBar;
