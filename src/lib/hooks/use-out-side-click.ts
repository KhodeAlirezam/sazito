import { RefObject } from "react";

import useWindowEventListener from "./use-window-event-listener";

export default function useOutsideClick<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  callback: (event: MouseEvent) => void,
): void {
  useWindowEventListener("mousedown", (event) => {
    const el = ref?.current;

    if (!el || el.contains(event.target as Node)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    callback(event);
  });
}
