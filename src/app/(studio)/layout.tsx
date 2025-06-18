import StudioNavbar from "@/app/(studio)/components/navbar";
import StudioSidebar from "@/app/(studio)/components/sidebar";
import Switch from "@/app/(studio)/components/switch";
import { SidebarProvider } from "@/components/ui/sidebar";

type StudioLayoutProps = {
  children: React.ReactNode;
};

export default async function StudioLayout({ children }: StudioLayoutProps) {
  return (
    <SidebarProvider>
      <StudioNavbar />
      <div className="flex min-h-screen w-full pt-16">
        <StudioSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="w-full max-w-7xl gap-y-6 px-4 pt-2.5">
            <div className="flex items-center justify-between">
              <h1 className="text-xl">Studio</h1>
              <Switch />
            </div>
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
