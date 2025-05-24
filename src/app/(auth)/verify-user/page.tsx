import {
  deleteUnverifiedUserInCache,
  getUnverifiedUserInCache,
} from "@/cache/unverifiedUser";
import { createUser } from "@/data-access/user";

export default async function VerifyUserPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  try {
    const token = (await searchParams).token;

    if (!token) {
      throw new Error("Invalid verification token");
    }

    const cacheUser = await getUnverifiedUserInCache(token);
    if (!cacheUser) {
      throw new Error("Invalid verification token");
    }
    await createUser(cacheUser);
    await deleteUnverifiedUserInCache(token);
    return (
      <div className="relative container flex h-[800px] items-center justify-center">
        Your account has been verified.
      </div>
    );
  } catch (error) {
    console.log(error);
    return (
      <div className="relative container flex h-[800px] items-center justify-center">
        Invalid verification token
      </div>
    );
  }
}
