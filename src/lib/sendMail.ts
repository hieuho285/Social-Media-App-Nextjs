"use server";

import { getUnverifiedUserInCache } from "@/cache/unverifiedUser";
import { env } from "@/lib/env";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: env.SMTP_SERVER_USERNAME,
    pass: env.SMTP_SERVER_PASSWORD,
  },
});

export const sendUserVerificationMail = async ({
  sendTo,
  token,
}: {
  sendTo: string;
  token: string;
}) => {
  await transporter.sendMail({
    from: env.SMTP_SERVER_USERNAME,
    to: sendTo,
    subject: "Verify Your Account",
    html: `Please click the link below to verify your account:<br/><a href="${env.BASE_URL}/verify-user/${token}">${env.BASE_URL}/verify-user/${token}</a>`,
    text: `Please verify your account by visiting: ${env.BASE_URL}/verify-user/${token}`,
  });
};

export const resendUserVerificationMail = async (token: string) => {
  const unverifiedUser = await getUnverifiedUserInCache(token);

  if (!unverifiedUser) throw new Error("Unable to resend verification mail.");

  await sendUserVerificationMail({ sendTo: unverifiedUser.email, token });
};
