import { readFile } from "fs/promises";
import path from "path";

import isEmpty from "lodash-es/isEmpty";

import { parseJson } from "@/lib/utils/json";
import { DataBase, Product } from "@/typings/database";

import { createDB } from "../lib/helpers/database/createDB";

const jsonDBPath = path.join(process.cwd(), "src/database/db.json");

const db = createDB<DataBase>(jsonDBPath);

const seedJsonPath = path.join(process.cwd(), "src/database/seed.json");

export async function getDB() {
  const hasBeenInitialized = !isEmpty(await db.get("products"));

  if (!hasBeenInitialized) {
    const seedJson = (await readFile(seedJsonPath)).toString();

    const { result } = parseJson(seedJson);

    const { products }: { products: Product[] } = result;

    const categories: DataBase["categories"] = [];
    const productsMap: DataBase["productsMap"] = {};
    const categoryProductMap: DataBase["categoryProductMap"] = {};

    products.forEach((product) => {
      productsMap[product.id] = product;
      product.product_categories?.forEach((category) => {
        if (categoryProductMap[category.id]) {
          return categoryProductMap[category.id].push(product.id);
        }

        categoryProductMap[category.id] = [product.id];
        categories.push({ id: category.id, name: category.name });
      });
    });

    await db.setMany({
      products,
      categories,
      productsMap,
      categoryProductMap,
    });
  }

  return db;
}
