import { env } from "@/lib/env";
import { SendMailError } from "@/lib/error";
import nodemailer from "nodemailer";
import "server-only";

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: env.SMTP_SERVER_USERNAME,
    pass: env.SMTP_SERVER_PASSWORD,
  },
});

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
      text: `Please verify your account by visiting: ${env.NEXT_PUBLIC_APP_URL}/verify-user?token=${token}`,
    });
  } catch (error) {
    console.error("Failed to send verification mail:", error);
    throw new SendMailError();
  }
};

export const sendForgotPasswordMail = async ({
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
      subject: "Reset your password",
      html: `Please click <a href="${env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}">here</a> to verify your account.`,
      text: `Please verify your account by visiting: ${env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`,
    });
  } catch (error) {
    console.error("Failed to send reset password mail:", error);
    throw new SendMailError();
  }
};
