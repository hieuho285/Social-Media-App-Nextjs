import { useCallback, useEffect, useRef, useState } from "react";

const defaultOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: "0px",
  threshold: 0.8,
};

export const useIntersectionObserver = (
  options: IntersectionObserverInit = defaultOptions,
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  // const targetRef = useRef<HTMLElement | null>(null);

  const observerRef = useRef<IntersectionObserver | null>(null);

  const elementRef = useCallback(
    (node: Element | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (node) {
        observerRef.current = new IntersectionObserver(([entry]) => {
          setIsIntersecting(entry.isIntersecting);
        }, options);
        observerRef.current.observe(node);
      }
    },
    [options],
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return { elementRef, isIntersecting };

  // example usage:
  // const { elementRef, isIntersecting } = useIntersectionObserver({
  //   root: null,
  //   rootMargin: "0px",
  //   threshold: 0.1,
  // });
  // return (
  //   <div ref={elementRef}>
  //     {isIntersecting ? "Element is in view" : "Element is out of view"}
  //   </div>
  // );

  // const [isIntersecting, setIsIntersecting] = useState(false);
  // const observerRef = useRef<IntersectionObserver | null>(null);
  // const elementRef = useCallback(
  //   (node: Element | null) => {
  //     if (observerRef.current) {
  //       observerRef.current.disconnect();
  //     }
  //     if (node) {
  //       observerRef.current = new IntersectionObserver(([entry]) => {
  //         setIsIntersecting(entry.isIntersecting);
  //       }, options);
  //       observerRef.current.observe(node);
  //     }
  //   },
  //   [options],
  // );
  // return { targetRef, isIntersecting, elementRef };
  // const targetRef = useRef<HTMLElement | null>(null);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(([entry]) => {
  //     setIsIntersecting(entry.isIntersecting);
  //   }, options);

  //   if (targetRef.current) {
  //     observer.observe(targetRef.current);
  //   }

  //   return () => observer.disconnect();
  // }, [options]);

  // return { targetRef, isIntersecting };
};
