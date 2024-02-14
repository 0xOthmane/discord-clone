"use client";

import { useEffect, useState } from "react";
import { CreateServerModal } from "@/components/molecules/CreateServerModal";
import { InviteModal } from "@/components/molecules/InviteModal";
import { EditServerModal } from "@/components/molecules/EditServerModal";
import { MembersModal } from "@/components/molecules/MembersModal";
import { CreateChannelModal } from "@/components/molecules/CreateChannelModal";
import { LeaveServerModal } from "@/components/molecules/LeaveServerModal";
import { DeleteServerModal } from "@/components/molecules/DeleteServerModal";
import { DeleteChannelModal } from "@/components/molecules/DeleteChannelModal";
import { EditChannelModal } from "@/components/molecules/EditChannelModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
    </>
  );
};
