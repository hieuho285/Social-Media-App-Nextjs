import HomeNavbar from "@/app/(home)/components/navbar";
import HomeSidebar from "@/app/(home)/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

type HomeLayoutProps = {
  categories: React.ReactNode;
};

export default function HomeLayout({ categories }: HomeLayoutProps) {
  return (
    <SidebarProvider>
      <HomeNavbar />
      <div className="flex min-h-screen w-full pt-16">
        <HomeSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="w-full max-w-7xl gap-y-6 px-4 pt-2.5">
            {categories}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
