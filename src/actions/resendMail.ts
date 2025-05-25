import { asyncActionErrorHandler } from "@/actions/helpers";
import { getUnverifiedUserInCache } from "@/cache/unverifiedUser";
import { sendUserVerificationMail } from "@/lib/sendMail";

export const resendUserVerificationMail = asyncActionErrorHandler(
  async (token: string) => {
    const unverifiedUser = await getUnverifiedUserInCache(token);

    if (!unverifiedUser) throw new Error("Unable to resend verification mail.");
    try {
      await sendUserVerificationMail({ sendTo: unverifiedUser.email, token });
      return {
        success: true,
        sent: true,
        message: "Verification email has been sent to your email." as string,
      } as const;
    } catch {
      return {
        success: true,
        sent: false,
        token,
      } as const;
    }
  },
);
