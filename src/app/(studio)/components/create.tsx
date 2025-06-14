"use client";
import { create } from "@/app/(studio)/action/create";
import { Button } from "@/components/ui/button";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Create() {
  const [isPending, setIsPending] = useState(false);

  const onClick = async () => {
    setIsPending(true);
    const result = await create();
    setIsPending(false);
    if (!result) {
      toast.success("Video created successfully!");
    } else {
      toast.error(result.error);
    }
  };

  return (
    <Button
      disabled={isPending}
      className="cursor-pointer"
      onClick={onClick}
      variant="secondary"
    >
      {isPending ? <Loader2Icon className="animate-spin" /> : <PlusIcon />}
      Create
    </Button>
  );
}
