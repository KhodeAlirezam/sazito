"use client";

import { ReactNode } from "react";

import {
  QueryClient,
  QueryClientProvider as OriginalQueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

type QueryClientProviderProps = { children: ReactNode };

export function QueryClientProvider({ children }: QueryClientProviderProps) {
  return (
    <OriginalQueryClientProvider client={queryClient}>
      {children}
    </OriginalQueryClientProvider>
  );
}
