import { env } from "@/lib/env";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: env.SMTP_SERVER_USERNAME,
    pass: env.SMTP_SERVER_PASSWORD,
  },
});
