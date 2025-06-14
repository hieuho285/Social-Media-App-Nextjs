import Section from "@/app/(studio)/studio/components/section";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default async function Page() {
  prefetch(trpc.studio.getMany.infiniteQueryOptions({}));

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <Section />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
