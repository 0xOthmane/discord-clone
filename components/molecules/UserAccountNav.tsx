"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const UserAccountNav = () => {
  return <Button onClick={() => signOut()}>Logout</Button>;
};

export default UserAccountNav;
