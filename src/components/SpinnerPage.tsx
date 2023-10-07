"use client";

import { Spinner } from "@nextui-org/react";

import { cn } from "@/lib/utils/cn";

interface SpinnerPageProps {
  className?: string;
}

export function SpinnerPage({ className }: SpinnerPageProps) {
  return (
    <div
      className={cn(
        "relative flex h-screen w-screen flex-col items-center justify-center",
        className,
      )}
    >
      <Spinner />
    </div>
  );
}
