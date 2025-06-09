import { SidebarHeader } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export default function SidebarHeaderSkeleton() {
  return (
    <SidebarHeader className="flex items-center justify-center pb-4">
      <Skeleton className="size-30.5 rounded-full" />
      <div className="mt-2 flex flex-col items-center space-y-1">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-25" />
      </div>
    </SidebarHeader>
  );
}
