import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="grid min-h-screen place-items-center">{children}</div>;
}
