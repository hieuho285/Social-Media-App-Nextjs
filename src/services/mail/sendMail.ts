import { env } from "@/lib/env";
import { UnableToSendMailError } from "@/lib/error";
import { transporter } from "@/services/mail/helpers";
import "server-only";

export const sendVerificationMail = async ({
  sendTo,
  token,
}: {
  sendTo: string;
  token: string;
}) => {
  try {
    await transporter.sendMail({
      from: env.SMTP_SERVER_USERNAME,
      to: sendTo,
      subject: "Verify Your Account",
      html: `Please click <a href="${env.NEXT_PUBLIC_APP_URL}/verify-user?token=${token}">here</a> to verify your account.`,
      text: `Please verify your account by visiting: ${env.NEXT_PUBLIC_APP_URL}/verify-user/${token}`,
    });
  } catch (error) {
    console.error("Failed to send verification email:", error);
    throw new UnableToSendMailError();
  }
};
