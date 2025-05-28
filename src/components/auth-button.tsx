import { Button } from "@/components/ui/button";
import { UserCircleIcon } from "lucide-react";

export default function AuthButton() {
  // TODO: Add authentication logic
  return (
    <Button
      variant="outline"
      className="rounded-full cursor-pointer border-blue-500/2 px-4 py-2 text-sm font-medium text-blue-600 shadow-none hover:text-blue-500"
    >
      <UserCircleIcon className="size-5" />
      Sign In
    </Button>
  );
}
