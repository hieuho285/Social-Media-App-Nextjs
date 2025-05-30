"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { HistoryIcon, ListVideo, ThumbsUpIcon } from "lucide-react";
import Link from "next/link";

const items = [
  {
    title: "History",
    href: "/playlists/history",
    icon: HistoryIcon,
    auth: true,
  },
  {
    title: "Liked Videos",
    href: "/playlists/liked",
    icon: ThumbsUpIcon,
    auth: true,
  },
  {
    title: "Playlists",
    href: "/playlists",
    icon: ListVideo,
    auth: true,
  },
];

export default function SidebarPersonalSection() {
  return (
    <SidebarGroup >
      <SidebarGroupLabel>You</SidebarGroupLabel>
      <SidebarGroupContent >
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                isActive={false} // TODO: Determine active state
                tooltip={item.title}
                onClick={() => {}} //TODO: Handle click
                asChild
              >
                <Link href={item.href} className="gap-4">
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
