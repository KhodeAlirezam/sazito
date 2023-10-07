"use client";

import { NextUIProvider as OriginalNextUIProvider } from "@nextui-org/react";

interface NextUIProviderProps {
  children: React.ReactNode;
  className: string;
}

export function NextUIProvider({ children, className }: NextUIProviderProps) {
  return (
    <OriginalNextUIProvider className={className}>
      {children}
    </OriginalNextUIProvider>
  );
}
