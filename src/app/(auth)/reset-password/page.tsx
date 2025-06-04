import ResetPasswordForm from "@/app/(auth)/reset-password/components/reset-password-form";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default async function ResetPasswordPage() {
  return (
    <div className="bg-card rounded-xl p-5 shadow-2xl lg:p-8">
      <div className="lg:p-8">
        <div className="space-y-6 sm:w-[350px]">
          <h1 className="text-center text-3xl font-bold tracking-tight capitalize">
            Reset your password
          </h1>
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
}
