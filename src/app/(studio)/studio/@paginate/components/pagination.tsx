"use client";
import { PaginationWithLinks } from "@/app/(studio)/components/pagination-with-links";
import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export function Pagination() {
  const trpc = useTRPC();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || "1";

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
    <div>
      <PaginationWithLinks page={+currentPage} totalCount={10} pageSize={10} />

      <div>{JSON.stringify(data.pages)}</div>
    </div>
  );
}
