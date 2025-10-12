"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface buttonType {
  filterValue: string;
  selected: boolean;
  handleFilter: (filter: string) => void;
  children: string;
}

interface filterComponentType {
  filterName: string;
  filters: { text: string; filterValue: string }[];
  defaultValue: string;
}

function Button({ filterValue, selected, handleFilter, children }: buttonType) {
  return (
    <button
      className={`hover:bg-primary-700 px-5 py-2 ${selected ? "bg-primary-700 text-primary-50" : ""}`}
      onClick={() => handleFilter(filterValue)}
    >
      {children}
    </button>
  );
}

export default function Filter({
  filterName,
  filters,
  defaultValue,
}: filterComponentType) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams);
    params.set(filterName, filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const activeFilter = searchParams.get(filterName) ?? defaultValue;

  return (
    <div className="border-primary-800 flex border">
      {filters?.map(
        ({ text, filterValue }: { text: string; filterValue: string }) => (
          <Button
            filterValue={filterValue}
            handleFilter={handleFilter}
            selected={activeFilter === filterValue}
            key={filterValue}
          >
            {text}
          </Button>
        ),
      )}
    </div>
  );
}
