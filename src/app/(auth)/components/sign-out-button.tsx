"use client";

import { signOut } from "@/actions/signOut";
import { Button } from "@/components/ui/button";

export default function SignOutButton() {
  return <Button onClick={() => signOut()}>Sign Out </Button>;
}
