"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { cn } from "@/lib/utils";

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className,
      )}
      {...props}
    />
  );
}

function UserAvatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  const {data: user} = useCurrentUser();

  if (!user) return null;

  return (
    <Avatar
      className={cn(
        "cursor-pointer transition-opacity hover:opacity-80",
        className,
      )}
      {...props}
    >
      <AvatarImage
        src={user?.avatarUrl || "https://github.com/shadcn.png"}
        alt={user.name}
      />
      <AvatarFallback>{getInitialsFromName(user.name)}</AvatarFallback>
    </Avatar>
  );
}

const getInitialsFromName = (name: string) => {
  const nameArr = name.split(" ");
  const first = nameArr[0]?.at(0) ?? "";
  const last = nameArr[nameArr.length - 1]?.at(0) ?? "";
  return (first + last).toUpperCase();
};

export { Avatar, AvatarFallback, AvatarImage, UserAvatar };
