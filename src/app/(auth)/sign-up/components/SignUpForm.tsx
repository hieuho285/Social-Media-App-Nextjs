"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signUp } from "@/actions/signUp";
import OAuthLogin from "@/app/(auth)/components/oauth-buttons";
import FormPasswordInputWithToggle from "@/app/(auth)/components/password-toggler";
import SignUpButton from "@/app/(auth)/components/sign-up-button";
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
import { signUpSchema, SignUpType } from "@/lib/validations";
import { useSearchParams } from "next/navigation";

export default function SignUpForm() {
  const form = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? undefined;

  const onSubmit = async (values: SignUpType) => {
    await signUp(values);

    // if (result.success) {
    //   if (result.sent)
    //     return toast.success(result.message, { position: "top-center" });
    //   else
    //     toast.error(<ToastWithLink token={result.token} />, {
    //       position: "top-center",
    //     });
    // }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
          <FormField
            control={form.control}
            name="displayName"
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
                  <FormPasswordInputWithToggle field={field} type="password" />
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
                  <FormPasswordInputWithToggle
                    field={field}
                    type="confirmPassword"
                  />
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
      <SignUpButton />
    </div>
  );
}
