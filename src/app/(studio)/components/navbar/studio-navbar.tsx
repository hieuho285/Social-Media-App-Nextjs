import AuthButton from "@/app/(studio)/components/navbar/auth-button";
import { ModeToggle } from "@/components/theme-toggler";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getCurrentUser } from "@/services/session";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export default async function StudioNavbar() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex h-16 items-center border-b bg-white px-2 pr-5 shadow-md">
      <div className="flex w-full items-center gap-4">
        {/* Menu and logo */}
        <div className="flex shrink-0 items-center">
          <SidebarTrigger />
          <Link href="/" className="flex items-center gap-1 p-4">
            <Image src="/logo.svg" alt="logo" height={32} width={32} />
            <span className="text-xl font-semibold tracking-tight">Studio</span>
          </Link>
        </div>

        {/* Search bar */}

        {/* User profile and notifications */}
        <div className="ml-auto flex shrink-0 items-center gap-4">
          <ModeToggle />
          <HydrationBoundary state={dehydrate(queryClient)}>
            <AuthButton />
          </HydrationBoundary>
        </div>
      </div>
    </div>
  );
}
