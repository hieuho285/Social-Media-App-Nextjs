"use client";

import { signOut } from "@/actions/signUp";
import { Button } from "@/components/ui/button";

export default function SignOutButton() {
  return <Button onClick={() => signOut()}>Sign Out </Button>;
}
