"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SignUpButton() {
  const searchParams = useSearchParams();
  const newParams = new URLSearchParams();

  if (searchParams.toString() !== "") {
    for (const [key, value] of searchParams.entries()) {
      newParams.set(key, value);
    }
  }

  return (
    <p className="text-muted-foreground px-8 text-center text-sm">
      Already have an account?{" "}
      <Link
        replace
        href={`/sign-in${!!newParams.toString() ? `?${newParams.toString()}` : ""}`}
        className="font-semibold underline underline-offset-4 transition hover:text-black"
      >
        Sign In
      </Link>
    </p>
  );
}
