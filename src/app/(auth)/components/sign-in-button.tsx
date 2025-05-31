"use client";

import { Button } from "@/components/ui/button";
import { UserCircleIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type SignInButtonProps = {
  variant?: "button" | "p";
};

export default function SignInButton({
  variant = "button",
}: SignInButtonProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const newParams = new URLSearchParams();

  if (searchParams.toString() !== "") {
    for (const [key, value] of searchParams.entries()) {
      newParams.set(key, value);
    }
  }

  if (variant === "p") {
    return (
      <p className="text-muted-foreground px-8 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          replace
          href={`/sign-up${!!newParams.toString() ? `?${newParams.toString()}` : ""}`}
          className="font-semibold underline underline-offset-4 transition hover:text-black"
        >
          Sign Up
        </Link>
      </p>
    );
  }

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
