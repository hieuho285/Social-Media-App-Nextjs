"use client";
import SidebarHeaderSkeleton from "@/app/(studio)/components/sidebar-header-skeleton";
import { UserAvatar } from "@/components/ui/avatar";
import {
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Link from "next/link";

export default function StudioSidebarHeader() {
  const { data: user } = useCurrentUser();
  const { state } = useSidebar();
  if (!user) return <SidebarHeaderSkeleton />;

  if (state === "collapsed") {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton tooltip="Your profile" asChild>
          <Link href="users/current">
            <UserAvatar className="size-6" />
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarHeader className="flex items-center justify-center pb-4">
      <Link href="users/current">
        <UserAvatar className="size-30.5" />
      </Link>
      <div className="mt-2 flex flex-col items-center space-y-1">
        <p className="text-sm font-medium">Your profile</p>
        <p className="text-muted-foreground text-xs">{user.name}</p>
      </div>
    </SidebarHeader>
  );
}
