"use client";

import SignUpForm from "@/app/(auth)/sign-up/components/SignUpForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function SignUpModal() {
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
          <DialogTitle className="text-center">Sign Up</DialogTitle>
        </DialogHeader>
        <SignUpForm />
      </DialogContent>
    </Dialog>
  );
}
