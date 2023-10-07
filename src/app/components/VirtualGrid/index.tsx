"use client";

import { useCallback, useLayoutEffect, useMemo, useState } from "react";

import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid, FixedSizeGrid as Grid } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

import { Nullable } from "@/lib/utils/types";

import { GridCell } from "./GridCell";
import { useProductsQuery } from "./use-products-query";

function getItemKey({
  columnIndex,
  rowIndex,
}: {
  columnIndex: number;
  rowIndex: number;
}) {
  return `${columnIndex} + ${rowIndex}`;
}

let scrollOffset = 0;
const itemSize = 300;
const cardRatio = 2.5 / 2;
const minimumColumnCount = 2;

interface ProductGridProps {
  activeFilters: Nullable<string[]>;
  activeSortings: Nullable<string[]>;
}

export default function ProductGrid({
  activeFilters,
  activeSortings,
}: ProductGridProps) {
  const { data, isLoading, isFetching, fetchNextPage } = useProductsQuery({
    activeFilters,
    activeSortings,
  });

  const products = useMemo(() => {
    if (isLoading || !data) {
      return [];
    }

    return data.pages.flatMap((page) => page.products);
  }, [data, isLoading]);

  const loadMoreItems = useCallback(() => {
    if (isLoading || isFetching) {
      return;
    }

    fetchNextPage();
  }, [fetchNextPage, isFetching, isLoading]);

  const isItemLoaded = useCallback(
    (index: number) => {
      if (index >= products.length - 1) {
        return true;
      }

      return false;
    },
    [products.length],
  );

  //scroll restoration
  const [gridRef, setGridRef] =
    useState<
      Nullable<
        FixedSizeGrid<{ products: typeof products; columnCount: number }>
      >
    >(null);

  useLayoutEffect(() => {
    if (!gridRef || !scrollOffset || isLoading) {
      return;
    }

    gridRef.scrollTo({ scrollTop: scrollOffset, scrollLeft: 0 });
  }, [gridRef, isLoading]);

  return (
    <AutoSizer>
      {({ width, height }) => {
        const columnCount =
          Math.floor(width / itemSize) < minimumColumnCount
            ? minimumColumnCount
            : Math.floor(width / itemSize);
        const columnWidth = width / columnCount;
        const rowCount = products.length / columnCount;
        const rowHeight = columnWidth * cardRatio;

        return (
          <InfiniteLoader
            itemCount={products.length}
            isItemLoaded={isItemLoaded}
            loadMoreItems={loadMoreItems}
          >
            {({ onItemsRendered }) => {
              return (
                <Grid
                  useIsScrolling={true}
                  itemKey={getItemKey}
                  itemData={{ products, columnCount }}
                  width={width}
                  height={height}
                  rowCount={rowCount}
                  rowHeight={rowHeight}
                  columnCount={columnCount}
                  columnWidth={columnWidth}
                  onItemsRendered={({
                    overscanRowStartIndex: overscanStartIndex,
                    overscanColumnStopIndex: overscanStopIndex,
                    visibleRowStartIndex: visibleStartIndex,
                    visibleRowStopIndex: visibleStopIndex,
                  }) =>
                    onItemsRendered({
                      overscanStartIndex,
                      overscanStopIndex,
                      visibleStartIndex,
                      visibleStopIndex,
                    })
                  }
                  ref={(ref) => setGridRef((prev) => (prev ? prev : ref))}
                  onScroll={({ scrollTop }) =>
                    scrollTop !== 0 && (scrollOffset = scrollTop)
                  }
                >
                  {GridCell}
                </Grid>
              );
            }}
          </InfiniteLoader>
        );
      }}
    </AutoSizer>
  );
}
