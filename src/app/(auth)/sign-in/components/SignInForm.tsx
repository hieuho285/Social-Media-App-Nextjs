"use client";

import { signIn } from "@/actions/signIn";
import OAuthLogin from "@/app/(auth)/components/oauth-buttons";
import FormPasswordInputWithToggle from "@/app/(auth)/components/password-toggler";
import SignInButton from "@/app/(auth)/components/sign-in-button";
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
import { signInSchema, SignInType } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

export default function SignInForm() {
  const form = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? undefined;
  const oauthError = searchParams.get("oauthError");

  const onSubmit = async (values: SignInType) => {
    const result = await signIn(values, from);

    if (result?.error) {
    }
  };

  return (
    <div className="space-y-6">
      {oauthError && <div>{oauthError}</div>}
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
      <SignInButton variant="p" />
    </div>
  );
}
