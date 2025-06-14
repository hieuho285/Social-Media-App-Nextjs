"use client";

import { PaginationDemo } from "@/app/(studio)/components/pagination";
import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

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
      <PaginationDemo />
      {/* {JSON.stringify(data.pages)} */}

      {/* {isFetchingNextPage && (
        <div className="flex justify-center gap-1">
          <Loader2Icon className="animate-spin" /> <span>Loading...</span>
        </div>
      )}
      {!hasNextPage && <p>End here</p>}

      <InfiniteScroll fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} /> */}
    </div>
  );
}
