"use client";

import { useRef, useState } from "react";

import { Select, SelectItem, Chip, SelectedItems } from "@nextui-org/react";

import useOutsideClick from "@/lib/hooks/use-out-side-click";
import { useQueryParams } from "@/lib/hooks/use-query-params";

type FilterItem = {
  id: number;
  name: string;
};

interface FilterProps {
  filterItems: FilterItem[];
}

export function Filter({ filterItems }: FilterProps) {
  const { get: getFilters, set: setFilters } =
    useQueryParams<FilterItem["id"][]>("filters");
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useOutsideClick(ref, () => setIsOpen(false));

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-20"></div>}
      <Select
        ref={ref}
        className="h-12 max-w-xs"
        items={filterItems}
        selectedKeys={getFilters()?.map((id) => id)}
        onSelectionChange={(keys) => {
          const selectedKeySet = new Set(keys);
          const selectedKeys = Array.from(selectedKeySet);

          setFilters(selectedKeys as FilterItem["id"][]);
        }}
        onOpenChange={(isOpen) => {
          setIsOpen(isOpen);
        }}
        isOpen={isOpen}
        variant="bordered"
        isMultiline={true}
        selectionMode="multiple"
        placeholder="دسته‌بندی"
        labelPlacement="outside"
        classNames={{
          base: "max-w-sm",
          innerWrapper: "h-7 direction-rtl",
          trigger: "py-2 pl-2 direction-ltr",
        }}
        renderValue={(items: SelectedItems<FilterItem>) => {
          return (
            <div className="no-scrollbar direction-rtl flex w-full gap-2 overflow-x-auto">
              {items.map((item) => (
                <Chip key={item.key}>{item?.data?.name}</Chip>
              ))}
            </div>
          );
        }}
      >
        {(item) => (
          <SelectItem
            key={item.id}
            textValue={item.name}
            aria-label={item.name}
          >
            <span className="text-small">{item.name}</span>
          </SelectItem>
        )}
      </Select>
    </>
  );
}
