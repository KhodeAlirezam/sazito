import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { parseJson, stringifyJson } from "../utils/json";

export function useQueryParams<T>(key: string) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const { get: getParam } = useSearchParams();

  function get(): T | undefined {
    const param = getParam(key);

    if (!param || !key) {
      return;
    }

    //In a bigger project validation libraries like zod, yup... is preferred
    try {
      return parseJson(param);
    } catch (error) {
      console.error(error);
    }
  }
  function set(value: T): void {
    if (!key) {
      console.error("provide a valid key");

      return;
    }

    const newParams = new URLSearchParams(params.toString());

    try {
      newParams.set(key, stringifyJson(value));
    } catch (error) {
      console.error(error);
    }

    router.push(`${pathname}?${newParams.toString()}`);
  }

  return { get, set };
}
