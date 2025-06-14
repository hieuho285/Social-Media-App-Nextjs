"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export function PaginationDemo() {
  const trpc = useTRPC();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || "1";

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,

  } = useSuspenseInfiniteQuery(
    trpc.studio.getMany.infiniteQueryOptions(
      {},
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        getPreviousPageParam: ()
      },
    ),
  );

  console.log("Current page:", currentPage);
  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {JSON.stringify(data.pages)}
    </div>
  );
}
