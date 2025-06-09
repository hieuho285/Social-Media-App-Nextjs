import StudioNavbar from "@/app/(studio)/components/navbar";
import StudioSidebar from "@/app/(studio)/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

type StudioLayoutProps = {
  categories: React.ReactNode;
};

export default async function StudioLayout({ categories }: StudioLayoutProps) {
  return (
    <SidebarProvider>
      <StudioNavbar />
      <div className="flex min-h-screen w-full pt-16">
        <StudioSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="w-full max-w-7xl gap-y-6 px-4 pt-2.5">
            {categories}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
