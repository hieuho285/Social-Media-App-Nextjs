"use client";

import { signOut } from "@/actions/signOut";
import SignInButton from "@/components/auth/sign-in-button";
import { UserAvatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { redirectUrl } from "@/lib/utils";
import { ClapperboardIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function AuthButton() {
  const { data: user, isLoading } = useCurrentUser();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const signOutHandler = async () => {
    await signOut();
    window.location.assign(redirectUrl(pathname, searchParams.toString()));
  };

  if (isLoading) {
    return <Skeleton className="size-8 rounded-full"></Skeleton>;
  }

  return (
    <>
      {!user ? (
        <SignInButton />
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <UserAvatar />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-74" align="end">
            <DropdownMenuLabel className="flex items-center gap-2 py-3">
              <div className="flex flex-1 justify-center">
                <UserAvatar className="size-10" />
              </div>
              <div className="flex-5">
                <p className="font-semibold">{user.name}</p>
                <p>{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem asChild className="cursor-pointer py-3">
                <Link href={"/studio"}>
                  <div className="flex flex-1 justify-center">
                    <ClapperboardIcon className="size-4" />
                  </div>
                  <span className="flex-5">Studio</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={signOutHandler}
              className="cursor-pointer py-3"
            >
              <div className="flex flex-1 justify-center">
                <LogOutIcon />
              </div>
              <span className="flex-5">Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
