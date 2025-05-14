/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type fieldType = {
  onChange: (...event: any[]) => void;
  onBlur: () => void;
  value: string;
  disabled?: boolean;
  name: "password" | "confirmPassword";
  ref: (instance: any) => void;
};

export default function FormPasswordInputWithToggle({
  field,
  type = "password",
}: {
  field: fieldType;
  type?: "password" | "confirmPassword";
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input
        type={show ? "text" : "password"}
        placeholder={
          type === "confirmPassword" ? "Confirm Password" : "Password"
        }
        {...field}
      />
      <Button
        type="button"
        className="absolute top-0 right-0 bg-transparent text-black"
        onClick={() => setShow(!show)}
      >
        {show ? <Eye /> : <EyeOff />}
      </Button>
    </div>
  );
}
