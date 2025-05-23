"use client";

import { Button } from "@/components/ui/button";
import { resendUserVerificationMail } from "@/lib/sendMail";

export default function ResendVerificationButton({ token }: { token: string }) {
  return (
    <Button onClick={() => resendUserVerificationMail(token)}>
      Resend Verification Email
    </Button>
  );
}
