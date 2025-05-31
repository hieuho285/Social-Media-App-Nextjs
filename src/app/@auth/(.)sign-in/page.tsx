"use client";

import SignInForm from "@/app/(auth)/sign-in/components/SignInForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function SignInModal() {
  const router = useRouter();

  const onOpenChange = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  return (
    <Dialog onOpenChange={onOpenChange} defaultOpen>
      <DialogContent className="gap-8">
        <DialogHeader>
          <DialogTitle className="text-center">Sign In</DialogTitle>
        </DialogHeader>
        <SignInForm />
      </DialogContent>
    </Dialog>
  );
}
