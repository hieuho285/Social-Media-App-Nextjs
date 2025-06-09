"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FlameIcon, HomeIcon, PlaySquareIcon } from "lucide-react";
import Link from "next/link";

const items = [
  { title: "Home", href: "/", icon: HomeIcon },
  {
    title: "Subscriptions",
    href: "/feed/subscriptions",
    icon: PlaySquareIcon,
    auth: true,
  },
  { title: "Trending", href: "/trending", icon: FlameIcon },
];

export default function SidebarMainSection() {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
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
