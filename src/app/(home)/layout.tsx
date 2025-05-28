import HomeNavbar from "@/app/(home)/components/home-navbar";
import HomeSidebar from "@/app/(home)/components/home-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

type HomeLayoutProps = {
  children: React.ReactNode;
};

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <SidebarProvider>
      <HomeNavbar />
      <div className="flex min-h-screen w-full pt-[4rem]">
        <HomeSidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
