import { isObject } from "lodash-es";

export type Nullable<T> = T | null;

export function isRecord(
  maybeRecord: unknown,
): maybeRecord is Record<string, unknown> {
  if (
    !maybeRecord ||
    !isObject(maybeRecord) ||
    typeof maybeRecord === "string" ||
    typeof maybeRecord === "number" ||
    typeof maybeRecord === "boolean" ||
    Array.isArray(maybeRecord)
  ) {
    console.warn("not a valid record");

    return false;
  }

  return true;
}
