import { existsSync, writeFileSync } from "fs";
import { readFile, writeFile } from "fs/promises";

import { parseJson, stringifyJson } from "@/lib/utils/json";
import { isRecord } from "@/lib/utils/types";
import { Json } from "@/typings";

export function createDB<T extends Record<string, unknown>>(
  jsonDBPath: string,
) {
  try {
    if (!existsSync(jsonDBPath)) {
      writeFileSync(jsonDBPath, stringifyJson({}));
    }
  } catch {}

  async function read(): Promise<Json | undefined> {
    try {
      const jsonDB = await readFile(jsonDBPath);

      return await parseJson(jsonDB.toString());
    } catch (error) {
      console.error(error);
    }
  }

  async function write(data: Json): Promise<void> {
    try {
      await writeFile(jsonDBPath, stringifyJson(data));
    } catch (error) {
      console.error(error);
    }
  }

  let dbInstance;

  if (dbInstance) {
    return dbInstance;
  }

  return (dbInstance = {
    async set(key: string, data: Json): Promise<void> {
      if (!data || !key) {
        return;
      }

      const db = await read();

      if (!isRecord(db)) {
        return;
      }

      db[key] = data;

      write(db);
    },

    async setMany<T>(data: Record<string, T>) {
      const db = await read();

      if (!isRecord(db)) {
        return;
      }

      Object.keys(data).forEach((key) => {
        db[key] = data[key] as Json;
      });

      await write(db);
    },
    async get<K extends string>(key: K): Promise<T[K] | undefined> {
      const db = await read();

      if (!isRecord(db) || !db.hasOwnProperty(key)) {
        return;
      }

      return db[key] as T[K];
    },
  });
}
