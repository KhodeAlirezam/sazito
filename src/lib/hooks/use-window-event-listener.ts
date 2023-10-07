import { useEffect } from "react";

export default function useWindowEventListener<T extends keyof WindowEventMap>(
  eventType: T,
  callback: (event: WindowEventMap[T]) => void,
): void {
  useEffect(() => {
    window.addEventListener(eventType, callback);

    return () => window.removeEventListener(eventType, callback);
  }, [callback, eventType]);
}
