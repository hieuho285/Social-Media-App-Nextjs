import SignInButton from "@/app/(auth)/components/sign-in-button";
import { getCurrentUser } from "@/auth/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { findUserById } from "@/data-access/user";
import { getInitialsFromName } from "@/lib/utils";
import { ClapperboardIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";

export default async function AuthButton() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <SignInButton />;
  }

  const user = await findUserById(currentUser?.id);

  return (
    <>
      {!user ? (
        <SignInButton />
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage
                src={user.avatarUrl ?? "https://github.com/shadcn.png"}
              />
              <AvatarFallback>{getInitialsFromName(user.name)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-74" align="end">
            <DropdownMenuLabel className="flex items-center gap-2 py-3">
              <div className="flex flex-1 justify-center">
                <Avatar className="size-10">
                  <AvatarImage
                    src={user.avatarUrl ?? "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback>
                    {getInitialsFromName(user.name)}
                  </AvatarFallback>
                </Avatar>
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

            <DropdownMenuItem className="cursor-pointer py-3">
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
