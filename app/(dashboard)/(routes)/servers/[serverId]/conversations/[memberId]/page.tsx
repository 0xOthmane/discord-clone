import { currentProfile } from "@/lib/auth";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { getOrCreateConversation } from "@/lib/conversation";
import ChatHeader from "@/components/atoms/ChatHeader";

interface MemberIdPageProps {
  params: {
    memberId: string;
    serverId: string;
  };
}

const MemberIdPage = async ({ params }: MemberIdPageProps) => {
  const profile = await currentProfile();
  if (!profile) redirect("/login");
  const currentMember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
    include: { profile: true },
  });
  if (!currentMember) redirect("/");
  const conversation = await getOrCreateConversation(
    currentMember.id,
    params.memberId
  );
  if (!conversation) redirect(`/servers/${params.serverId}`);
  const { memberOne, memberTwo } = conversation;
  const otherMember =
    memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-ful">
      <ChatHeader
        imageUrl={otherMember.profile.imageUrl}
        name={otherMember.profile.name}
        serverId={params.serverId}
        type="conversation"
      />
    </div>
  );
};

export default MemberIdPage;
