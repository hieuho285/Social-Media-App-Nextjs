import { Metadata } from "next";

import SignInForm from "@/app/(auth)/sign-in/components/sign-in-form";

export const metadata: Metadata = {
  title: "Sign In",
};

export default async function SignInPage() {
  return (
    <div className="bg-card rounded-xl p-5 shadow-2xl lg:p-8">
      <div className="lg:p-8">
        <div className="space-y-6 sm:w-[350px]">
          <h1 className="text-center text-3xl font-bold tracking-tight capitalize">
            Login
          </h1>
          <SignInForm redirectType="hard" />
        </div>
      </div>
    </div>
  );
}
