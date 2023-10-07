import dynamic from "next/dynamic";

import { SpinnerPage } from "@/components/SpinnerPage";
import { getDB } from "@/database";
import { parseJson } from "@/lib/utils/json";

import { Filter } from "./components/Filter";
import { Sort } from "./components/Sort";

const ProductGrid = dynamic(() => import("@/app/components/VirtualGrid"), {
  ssr: false,
  loading() {
    return <SpinnerPage className="h-full w-full opacity-50" />;
  },
});

interface HomeProps {
  searchParams: Record<string, string>;
}

const sortItems = [{ id: "new", name: "جدیدترین" }];

export default async function Home({ searchParams }: HomeProps) {
  const db = await getDB();
  const categories = await db.get("categories");

  return (
    <>
      <div className="flex h-16 items-center px-3 child:ml-3">
        {categories?.length && <Filter filterItems={categories} />}
        <Sort sortItems={sortItems} />
      </div>
      <div className="mx-auto w-full max-w-7xl flex-1 child:child:no-scrollbar">
        <ProductGrid
          activeFilters={parseJson(searchParams.filters)}
          activeSortings={parseJson(searchParams.sortings)}
        />
      </div>
    </>
  );
}
