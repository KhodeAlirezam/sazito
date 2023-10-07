"use client";

import {
  ErrorBoundaryProps,
  ErrorBoundary as OriginalErrorBoundary,
} from "react-error-boundary";

export function ErrorBoundary({ children }: Partial<ErrorBoundaryProps>) {
  return (
    <OriginalErrorBoundary
      fallback={
        <div className="flex h-screen w-full flex-col items-center justify-center">
          <h1 className="font-bold text-red-500">Somthing Went Wrong!</h1>
        </div>
      }
    >
      {children}
    </OriginalErrorBoundary>
  );
}
