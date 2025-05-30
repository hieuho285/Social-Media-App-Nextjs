import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
export default function loading() {
  return (
    <Carousel className="w-full px-10">
      <CarouselContent className="-ml-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <CarouselItem className="basis-auto pr-3 pl-1" key={i}>
            <Skeleton className="h-full w-30 cursor-pointer rounded-full px-3 py-1 text-sm">
              &nbsp;
            </Skeleton>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
