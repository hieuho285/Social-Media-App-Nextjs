"use server";

import { env } from "@/lib/env";
import { UnableToSendMailError } from "@/lib/errors";
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
  try {
    await transporter.sendMail({
      from: env.SMTP_SERVER_USERNAME,
      to: sendTo,
      subject: "Verify Your Account",
      html: `Please click <a href="${env.BASE_URL}/verify-user?token=${token}">here</a> to verify your account.`,
      text: `Please verify your account by visiting: ${env.BASE_URL}/verify-user/${token}`,
    });
  } catch {
    throw new UnableToSendMailError();
  }
};
