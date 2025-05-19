import { getCurrentUser } from "@/auth/user";
import { Button } from "@/components/ui/button";
import SignOutButton from "@/components/user/SignOutButton";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentUser();

  if (user === null) {
    return redirect("/sign-in");
  }

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      {user === null ? (
        <div className="flex items-center justify-center gap-4">
          <Button asChild>
            <Link href={"/sign-in"}>Sign In</Link>
          </Button>
          <Button asChild>
            <Link href={"/sign-up"}>Sign Up</Link>
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-4">
          <Button asChild>
            <Link href={"/dashboard"}>Dashboard</Link>
          </Button>
          <p>{JSON.stringify(user)}</p>
          <SignOutButton />
        </div>
      )}
    </div>
  );
}
