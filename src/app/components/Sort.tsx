"use client";
import { Switch } from "@nextui-org/react";

import { useQueryParams } from "@/lib/hooks/use-query-params";

const sortKey = "sortings";

interface SortProps {
  sortItems: { name: string; id: string }[];
}

export function Sort({ sortItems }: SortProps) {
  const { get: getSortState, set: setSortState } =
    useQueryParams<string[]>(sortKey);

  function handleSwitch(id: string) {
    return function () {
      const currentState = getSortState();

      if (!currentState) {
        setSortState([id]);

        return;
      }

      if (!currentState.includes(id)) {
        setSortState([...currentState, id]);

        return;
      }

      setSortState(currentState.filter((k) => k !== id));
    };
  }

  return (
    <div className="flex items-center space-x-2">
      {sortItems &&
        sortItems.map((item) => (
          <SortItem
            key={item.id}
            isSelected={!!getSortState()?.includes(item.id)}
            name={item.name}
            id={item.id}
            onChange={handleSwitch(item.id)}
          />
        ))}
    </div>
  );
}

interface SortItemProps {
  name: string;
  id: string;
  onChange: () => void;
  isSelected: boolean;
}
function SortItem({ name, id, onChange, isSelected }: SortItemProps) {
  return (
    <Switch
      id={id}
      aria-label={name}
      className="direction-ltr flex items-center justify-center rounded-xl bg-white p-2 text-center"
      isSelected={isSelected}
      onValueChange={onChange}
    >
      {name}
    </Switch>
  );
}
