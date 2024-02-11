"use client";

import { useEffect, useState } from "react";
import { CreateServerModal } from "../molecules/CreateServerModal";
import { InviteModal } from "../molecules/InviteModal";
import { EditServerModal } from "../molecules/EditServerModal";

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
    </>
  );
};
