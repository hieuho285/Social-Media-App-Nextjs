"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signUp } from "@/actions/auth";
import FormPasswordInputWithToggle from "@/components/forms/FormPasswordInputWithToggle";
import ToastWithLink from "@/components/ToastWithLink";
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
import { signUpSchema, SignUpTypes } from "@/lib/validations";
import { toast } from "react-toastify";

export default function SignUpForm() {
  const form = useForm<SignUpTypes>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: SignUpTypes) => {
    const result = await signUp(values);

    if (result.success) {
      if (result.sent)
        return toast.success(result.message, { position: "top-center" });
      else
        toast.error(<ToastWithLink token={result.token} />, {
          position: "top-center",
        });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>DisplayName</FormLabel>
              <FormControl>
                <Input type="text" placeholder="DisplayName" {...field} />
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
