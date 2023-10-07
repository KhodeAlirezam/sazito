import { Nullable } from "./types";

export function stringifyJson(value: unknown): string {
  try {
    return JSON.stringify(value);
  } catch (error) {
    console.error(error);

    return undefined as never;
  }
}

export function parseJson(strigifiedJson: Nullable<string>) {
  if (!strigifiedJson) {
    return;
  }

  try {
    return JSON.parse(strigifiedJson);
  } catch (error) {
    console.error(error);
  }
}
