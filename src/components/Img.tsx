"use client";
import { SyntheticEvent, useCallback, useState } from "react";

import Image, { ImageProps } from "next/image";

import { cn } from "@/lib/utils/cn";

export default function Img({
  src,
  alt,
  className,
  loading = "lazy",
  onError,
  onLoad,
  ...props
}: ImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const isLoading = !isLoaded && !isFailed;
  const imageSrc = src || "imageNotAvailableSrc";

  const handleLoad = useCallback<
    (event: SyntheticEvent<HTMLImageElement, Event>) => void
  >(
    (event) => {
      setIsLoaded(true);
      typeof onLoad === "function" && onLoad(event);
    },
    [onLoad],
  );

  const handleError = useCallback<
    (event: SyntheticEvent<HTMLImageElement, Event>) => void
  >(
    (event) => {
      setIsFailed(true);
      typeof onError === "function" && onError(event);
    },
    [onError],
  );

  return (
    <>
      <div
        className={cn(
          className,
          "absolute h-full bg-slate-400  w-full inset-0 transition-opacity duration-500 ease-linear",
          {
            "animate-pulse": isLoading,
            "opacity-0": !isLoading,
          },
        )}
      ></div>
      <Image
        {...props}
        alt={alt}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          className,
          {
            "opacity-0": !isLoaded,
            "opacity-100": isLoaded,
          },
          "transition-opacity duration-500 ease-linear",
        )}
        src={isFailed ? "imageNotAvailableSrc" : imageSrc}
      />
    </>
  );
}
