import { Metadata } from "next";
import Link from "next/link";

import SignUpForm from "@/app/(auth)/sign-up/SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignUpPage() {
  return (
    <div className="bg-card rounded-xl p-5 shadow-2xl lg:p-8">
      {/* <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute top-4 right-4 md:top-8 md:right-8",
        )}
      >
        Login
      </Link> */}

      <div className="lg:p-8">
        <div className="space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight capitalize">
              Sign Up
            </h1>
            <p className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-sm text-transparent italic">
              Sign up and begin your journey with us!
            </p>
          </div>
          <SignUpForm />
          <p className="text-muted-foreground px-8 text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="underline font-semibold underline-offset-4 transition hover:text-black"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
