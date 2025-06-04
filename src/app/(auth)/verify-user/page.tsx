import { verifyUser } from "@/actions/verifyUser";

export default async function VerifyUserPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const token = (await searchParams).token;

  if (!token) {
    return (
      <div className="relative container flex h-[800px] items-center justify-center">
        Invalid verification token.
      </div>
    );
  }

  const result = await verifyUser(token);

  return (
    <div className="relative container flex h-[800px] items-center justify-center">
      {!result ? "Your account has been verified." : result.error}
    </div>
  );
}
