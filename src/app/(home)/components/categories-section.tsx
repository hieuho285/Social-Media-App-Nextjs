"use client";

import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type props = {
  categories: {
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

export default function CategoriesSection({ categories }: props) {
  const [api, setApi] = useState<CarouselApi>();
  const [head, setHead] = useState(true);
  const [tail, setTail] = useState(false);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("slidesInView", () => {
      if (api.slidesInView().includes(0)) setHead(true);
      else setHead(false);
      if (api.slidesInView().includes(categories.length)) setTail(true);
      else setTail(false);
    });
  }, [api, categories.length]);

  return (
    <Carousel setApi={setApi} className="w-full px-10">
      <CarouselContent className="-ml-1">
        <CarouselItem className="basis-auto pr-3 pl-1">
          <Badge
            variant={false ? "default" : "secondary"}
            // TODO
            className="cursor-pointer rounded-full px-3 py-1 text-sm whitespace-nowrap"
          >
            All
          </Badge>
        </CarouselItem>
        {categories.map((category) => (
          <CarouselItem className="basis-auto pr-3 pl-1" key={category.id}>
            <Badge
              variant={category.name === "Comedy" ? "default" : "secondary"} // TODO: implement this
              className="cursor-pointer rounded-full px-3 py-1 text-sm whitespace-nowrap"
            >
              {category.name}
            </Badge>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0 cursor-pointer" />
      <CarouselNext className="right-0 cursor-pointer" />
      <div
        className={cn(
          "pointer-events-none absolute top-0 bottom-0 left-10 w-12 bg-gradient-to-r from-white to-transparent opacity-100 transition duration-1000",
          head && "opacity-0",
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute top-0 right-10 bottom-0 w-12 bg-gradient-to-l from-white to-transparent opacity-100 transition duration-1000",
          tail && "opacity-0",
        )}
      />
    </Carousel>
  );
}
