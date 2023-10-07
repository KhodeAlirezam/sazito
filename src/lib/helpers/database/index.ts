import { cache } from "react";

import { getDB } from "@/database";
import { Nullable } from "@/lib/utils/types";
import { Product } from "@/typings/database";

const availableSortings: Record<string, string> = {
  New: "new",
};

//This can be break down into more maintainable pieces
export const getProducts = cache(
  async ({
    page,
    filters,
    sortings,
    pageSize,
  }: {
    page?: Nullable<string>;
    pageSize?: Nullable<string>;
    filters?: Nullable<string[]>;
    sortings?: Nullable<string[]>;
  } = {}) => {
    const db = await getDB();

    let products: Product[] = [];

    if (filters?.length) {
      const categoryProductMap = await db.get("categoryProductMap");

      if (!categoryProductMap) {
        return;
      }

      const requestedCategoriesProductIds = new Set(
        filters.flatMap((id) => categoryProductMap?.[Number(id)]),
      );

      const productsMap = await db.get("productsMap");

      if (!productsMap) {
        return;
      }

      products = Array.from(requestedCategoriesProductIds).map(
        (id) => productsMap[id],
      );
    }

    if (!products?.length) {
      const allProducts = await db.get("products");

      products = allProducts?.length ? allProducts : [];
    }

    if (
      sortings?.length &&
      sortings.filter((sorting) => availableSortings?.[sorting])
    ) {
      products = products.sort((a, b) => {
        const aDate = new Date(a.created_at);
        const bDate = new Date(b.created_at);

        return aDate.getTime() - bDate.getTime();
      });
    }

    if (!page || !pageSize) {
      return {
        products,
        total: products?.length,
      };
    }

    return {
      products: [...products].splice(
        Number(page) * Number(pageSize),
        Number(pageSize),
      ),
      total: products?.length,
    };
  },
);

export const getProduct = cache(async (id: string) => {
  const db = await getDB();
  const productsMap = await db.get("productsMap");

  if (!productsMap) {
    return;
  }

  return productsMap[id];
});
