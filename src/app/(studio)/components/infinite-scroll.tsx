import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useEffect } from "react";

export default function InfiniteScroll({
  hasNextPage,
  fetchNextPage,
}: {
  hasNextPage: boolean;
  fetchNextPage: () => void;
}) {
  const { elementRef, isIntersecting } = useIntersectionObserver();

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      console.log("Fetching next page");
      fetchNextPage();
    }
    console.log("Intersection observer state:", isIntersecting, hasNextPage);
  }, [fetchNextPage, hasNextPage, isIntersecting]);

  return <div ref={elementRef} className="absolute top-[90%]" />;
}
