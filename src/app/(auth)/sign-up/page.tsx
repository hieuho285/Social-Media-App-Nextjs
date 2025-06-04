import { Metadata } from "next";

import SignUpForm from "@/app/(auth)/sign-up/components/sign-up-form";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignUpPage() {
  return (
    <div className="bg-card rounded-xl p-5 shadow-2xl lg:p-8">
      <div className="lg:p-8">
        <div className="space-y-6 sm:w-[350px]">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight capitalize">
              Sign Up
            </h1>
            <p className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-sm text-transparent italic">
              Sign up and begin your journey with us!
            </p>
          </div>
          <SignUpForm redirectType="hard" />
        </div>
      </div>
    </div>
  );
}
