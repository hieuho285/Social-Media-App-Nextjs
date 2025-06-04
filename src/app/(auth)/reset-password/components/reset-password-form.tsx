"use client";

import { resetPassword } from "@/actions/resetPassword";
import OAuthLogin from "@/app/(auth)/components/oauth-login";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/input";
import { UnableToSendMailError } from "@/lib/error";
import { resetPasswordSchema, ResetPasswordType } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ResetPasswordForm() {
  const form = useForm<ResetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? undefined;

  const onSubmit = async (values: ResetPasswordType) => {
    const result = await resetPassword(values);

    if (result && result.error === new UnableToSendMailError().message) {
      return toast.error(
        "Unable to send mail to reset your password. Please try again.",
        { position: "top-center" },
      );
    }

    toast.success("Reset password link has been sent to your mail.", {
      position: "top-center",
    });
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Confirm Password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="w-full cursor-pointer bg-blue-700 hover:bg-blue-600"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2">
            Or continue with
          </span>
        </div>
      </div>
      <OAuthLogin from={from} />

      <p className="text-muted-foreground px-8 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href={`/sign-up${!!searchParams.toString() ? `?${searchParams.toString()}` : ""}`}
          className="font-semibold underline underline-offset-4 transition hover:text-black"
        >
          Sign Up
        </Link>
      </p>

      <p className="text-muted-foreground px-8 text-center text-sm">
        Already have an account?{" "}
        <Link
          href={`/sign-in${!!searchParams.toString() ? `?${searchParams.toString()}` : ""}`}
          className="font-semibold underline underline-offset-4 transition hover:text-black"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
