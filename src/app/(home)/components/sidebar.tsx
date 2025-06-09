import SidebarMainSection from "@/app/(home)/components/sidebar-main-section";
import SidebarPersonalSection from "@/app/(home)/components/sidebar-personal-section";
import { Separator } from "@/components/ui/separator";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

export default function HomeSidebar() {
  return (
    <Sidebar collapsible="icon" className="border-none pt-16">
      <SidebarContent>
        <SidebarMainSection />
        <Separator />
        <SidebarPersonalSection />
      </SidebarContent>
    </Sidebar>
  );
}
