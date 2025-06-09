"use client";

import { Button } from "@/components/ui/button";
import { UserCircleIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function SignInButton() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const newParams = new URLSearchParams(searchParams.toString());

  if (pathname !== "/") {
    newParams.set("from", pathname);
  }

  return (
    <Button
      asChild
      variant="outline"
      className="cursor-pointer rounded-full border-blue-500/2 px-4 py-2 text-sm font-medium text-blue-600 shadow-none hover:text-blue-500"
    >
      <Link
        href={`/sign-in${!!newParams.toString() ? `?${newParams.toString()}` : ""}`}
      >
        <UserCircleIcon className="size-5" />
        Sign In
      </Link>
    </Button>
  );
}
