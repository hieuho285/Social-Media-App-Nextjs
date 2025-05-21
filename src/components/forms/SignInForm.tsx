"use client";

import { oauthSignIn, signIn } from "@/actions/auth";
import FormPasswordInputWithToggle from "@/components/forms/FormPasswordInputWithToggle";
import { Icons } from "@/components/icons";
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
import { cn } from "@/lib/utils";
import { signInSchema } from "@/zod/schemas/";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

type formValueType = z.infer<typeof signInSchema>;

type SignInFormTypes = React.HTMLAttributes<HTMLDivElement>;

export default function SignInForm({ className, ...props }: SignInFormTypes) {
  const router = useRouter();
  const form = useForm<formValueType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: formValueType) => {
    const result = await signIn(values);
    console.log(result);
    if (result.data) router.refresh();
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Username" {...field} />
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

          <Button type="submit">Submit</Button>
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
      <Button onClick={oauthSignIn} variant="outline" type="button">
        (
        <Icons.gitHub className="mr-2 h-4 w-4" />) GitHub
      </Button>
    </div>
  );
}
