import SignInForm from "@/app/(auth)/sign-in/SignInForm";
import Link from "next/link";

export default async function SignInPage() {
  return (
    <div className="rounded-lg bg-white p-10 shadow-2xl">
      <div className="relative flex items-center justify-center">
        {/* <Button
          variant="ghost"
          className="absolute top-4 right-4 md:top-8 md:right-8"
          asChild
        >
          <Link href="/">Home</Link>
        </Button> */}

        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign In
              </h1>
            </div>
            <SignInForm />

            <p className="text-muted-foreground px-8 text-center text-sm">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="hover:text-primary underline underline-offset-4"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="hover:text-primary underline underline-offset-4"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
