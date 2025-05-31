import AuthButton from "@/app/(home)/components/navbar/auth-button";
import SearchInput from "@/app/(home)/components/navbar/search-input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

export default function HomeNavbar() {
  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex h-16 items-center bg-white px-2 pr-5">
      <div className="flex w-full items-center gap-4">
        {/* Menu and logo */}
        <div className="flex shrink-0 items-center">
          <SidebarTrigger />
          <Link href="/" className="flex items-center gap-1 p-4">
            <Image src="/logo.svg" alt="logo" height={32} width={32} />
            <span className="text-xl font-semibold tracking-tight">KooL</span>
          </Link>
        </div>

        {/* Search bar */}
        <div className="mx-auto flex max-w-[720px] flex-1 justify-center">
          <SearchInput />
        </div>

        {/* User profile and notifications */}
        <div className="flex shrink-0 items-center gap-4">
          <AuthButton />
        </div>
      </div>
    </div>
  );
}
