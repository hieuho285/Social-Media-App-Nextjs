import StudioSidebarHeader from "@/app/(studio)/components/sidebar-header";
import StudioSidebarMenuItems from "@/app/(studio)/components/sidebar-menu-items";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";

export default function StudioSidebar() {
  return (
    <Sidebar collapsible="icon" className="border-none pt-16">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <StudioSidebarHeader />
              <StudioSidebarMenuItems />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
