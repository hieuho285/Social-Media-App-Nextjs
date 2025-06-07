"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signUp } from "@/actions/signUp";
import OAuthLogin from "@/app/(auth)/components/oauth-login";
import ToastWithLink from "@/app/(auth)/sign-up/components/toast-with-link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, PasswordInput } from "@/components/ui/input";
import { signUpSchema, SignUpType } from "@/lib/validations";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

type SignUpFormProps = {
  redirectType?: "soft" | "hard";
};

export default function SignUpForm({ redirectType = "soft" }: SignUpFormProps) {
  const form = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const onSubmit = async (values: SignUpType) => {
    const result = await signUp(values);

    if (!result)
      toast.success("Verification link has been sent to your email!", {
        position: "top-center",
      });
    else
      toast.error(
        <ToastWithLink
          email={values.email}
          name={values.name}
          password={values.password}
        />,
        {
          position: "top-center",
        },
      );
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Display Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                  <PasswordInput placeholder="confirmPassword" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full rounded-full">
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
        Already have an account?{" "}
        {redirectType === "soft" ? (
          <Link
            replace
            href={`/sign-in${!!searchParams.toString() ? `?${searchParams.toString()}` : ""}`}
            className="font-semibold underline underline-offset-4 transition hover:text-black"
          >
            Sign In
          </Link>
        ) : (
          <a
            href={`/sign-in${!!searchParams.toString() ? `?${searchParams.toString()}` : ""}`}
            className="font-semibold underline underline-offset-4 transition hover:text-black"
          >
            Sign In
          </a>
        )}
      </p>
      <p className="text-muted-foreground px-8 text-center text-sm">
        Forgot password?{" "}
        <a
          href="/forgot-password"
          className="font-semibold underline underline-offset-4 transition hover:text-black"
        >
          Reset now
        </a>
      </p>
    </div>
  );
}
