"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { LogOutIcon, VideoIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function StudioSidebarMenuItems() {
  const pathname = usePathname();

  return (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton
          isActive={pathname === "/studio"}
          tooltip="Studio"
          asChild
        >
          <Link href="/studio" className="gap-4">
            <VideoIcon className="size-5" />
            <span>Content</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <Separator />
      <SidebarMenuItem>
        <SidebarMenuButton tooltip="Exit studio" asChild>
          <Link href="/" className="gap-4">
            <LogOutIcon className="size-5" />
            <span>Exit studio</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </>
  );
}
