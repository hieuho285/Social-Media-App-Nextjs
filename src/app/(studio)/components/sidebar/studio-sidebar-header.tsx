import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarHeader } from "@/components/ui/sidebar";
import Link from "next/link";

export default function StudioSidebarHeader() {
  return (
    <SidebarHeader className="flex items-center justify-center pb-4">
      <Link href="users/current">
        <Avatar className="cursor-pointer">
          <AvatarImage src={"https://github.com/shadcn.png"} />
          <AvatarFallback>"sh"</AvatarFallback>
        </Avatar>
      </Link>
    </SidebarHeader>
  );
}
