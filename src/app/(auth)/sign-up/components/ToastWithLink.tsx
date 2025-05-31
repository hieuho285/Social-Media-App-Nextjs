"use client";

import { resendUserVerificationMail } from "@/actions/resendMail";

export default function ToastWithLink({ token }: { token: string }) {
  return (
    <div>
      <div>Error during sending email verification.</div>
      Click{" "}
      <span
        className="cursor-pointer rounded bg-slate-950 p-1 text-white hover:bg-slate-800"
        onClick={() => resendUserVerificationMail(token)}
      >
        here
      </span>{" "}
      to resend verification email.
    </div>
  );
}
