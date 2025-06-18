"use client";

import InfiniteScroll from "@/app/(studio)/studio/@infinite/components/infinite-scroll";
import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";

export default function Section() {
  const trpc = useTRPC();
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(
      trpc.studio.getMany.infiniteQueryOptions(
        {},
        {
          getNextPageParam: (lastPage) => lastPage.nextCursor,
        },
      ),
    );

  return (
    <div className="relative">
      {JSON.stringify(data.pages)}

      {isFetchingNextPage && (
        <div className="flex justify-center gap-1">
          <Loader2Icon className="animate-spin" /> <span>Loading...</span>
        </div>
      )}
      {!hasNextPage && <p>End here</p>}

      <InfiniteScroll fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} />
    </div>
  );
}
