"use client";

import { forgotPassword } from "@/actions/forgotPassword";
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
import { Input } from "@/components/ui/input";
import { SendMailError } from "@/lib/error";
import { forgotPasswordSchema, ForgotPasswordType } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const onSubmit = async (values: ForgotPasswordType) => {
    const result = await forgotPassword(values.email);

    if (result && result.error === new SendMailError().message) {
      return toast.error(result.error, { position: "top-center" });
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Email" {...field} />
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
