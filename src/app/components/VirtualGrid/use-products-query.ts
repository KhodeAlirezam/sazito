import { useInfiniteQuery } from "@tanstack/react-query";

import { Request } from "@/lib/helpers/api";
import { Nullable } from "@/lib/utils/types";
import { Product } from "@/typings/database";

type ProductQueryArgs = {
  pageSize?: number;
  activeFilters: Nullable<string[]>;
  activeSortings: Nullable<string[]>;
};

export function useProductsQuery({
  pageSize = 6,
  activeFilters,
  activeSortings,
}: ProductQueryArgs) {
  return useInfiniteQuery<{ products: Product[]; total: number }>({
    queryKey: ["products", activeFilters, activeSortings],
    queryFn: ({
      pageParam = 0,
    }): Promise<{ products: Product[]; total: number }> =>
      Request.getProducts({
        params: {
          page: pageParam,
          page_size: pageSize,
          filters: activeFilters,
          sortings: activeSortings,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = lastPage?.total ? Math.ceil(lastPage.total / 6) : 0;

      if (allPages.length >= totalPages) {
        return;
      }

      return allPages.length;
    },
  });
}
