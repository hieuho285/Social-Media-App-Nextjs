"use client";

import { resendVerificationMail } from "@/actions/resendMail";
import { UnverifiedUserType } from "@/lib/validations";
import { toast } from "react-toastify";

export default function ToastWithLink(user: UnverifiedUserType) {
  const onClick = async () => {
    const result = await resendVerificationMail(user);
    if (!result)
      toast.success("Verification link has been sent to your email!", {
        position: "top-center",
      });
    else
      toast.error("Unexpected error. Please try to sign up later.", {
        position: "top-center",
      });
  };

  return (
    <div>
      <div>Error during sending email verification.</div>
      Click{" "}
      <span
        className="cursor-pointer rounded bg-slate-950 p-1 text-white hover:bg-slate-800"
        onClick={onClick}
      >
        here
      </span>{" "}
      to resend verification email.
    </div>
  );
}
