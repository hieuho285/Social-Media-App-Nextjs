import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | KooL",
    default: "KooL",
  },
  description: "KooL platform connects people",
};

export default function RootLayout({
  children,
  auth,
}: Readonly<{
  children: React.ReactNode;
  auth: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} overscroll-none antialiased`}>
        <ToastContainer stacked />
        <div>{auth}</div>
        {children}
      </body>
    </html>
  );
}
