"use client";

import { oauthSignIn } from "@/actions/oauthSignIn";
import { Button } from "@/components/ui/button";

type OAuthLoginProps = {
  from?: string;
};

export default function OAuthLogin({ from }: OAuthLoginProps) {
  return (
    <div className="flex flex-col gap-3">
      <Button
        onClick={() => oauthSignIn("discord", from)}
        variant="outline"
        type="button"
        className="cursor-pointer"
      >
        Discord
      </Button>
      <Button
        onClick={() => oauthSignIn("github", from)}
        variant="outline"
        type="button"
        className="cursor-pointer"
      >
        GitHub
      </Button>
    </div>
  );
}
