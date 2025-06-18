import Section from "@/app/(studio)/studio/@infinite/components/section";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";

export default async function InfinitePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const mode = (await searchParams).mode;

  if (mode === "pagination") return null;

  prefetch(trpc.studio.getMany.infiniteQueryOptions({}));

  return (
    <HydrateClient>
      <div className="relative">
        <Section />
      </div>
    </HydrateClient>
  );
}
