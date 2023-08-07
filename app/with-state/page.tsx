"use client";

import { Suspense, startTransition, useEffect, useState } from "react";
import { suspend } from "suspend-react";

export default function Page() {
  let [search, setSearch] = useState("");
  let [tableHasRendered, setTableHasRendered] = useState(false);

  return (
    <div className="bg-white w-full max-w-sm mx-auto mt-8 rounded shadow p-4">
      <input
        className="border p-2 border-gray-500"
        placeholder="Search..."
        type="text"
        onChange={(e) => {
          let newSearch = e.target.value;

          if (tableHasRendered) {
            // Show old UI when table has rendered
            startTransition(() => {
              setSearch(newSearch);
            });
          } else {
            // Discard old UI when table hasn't rendered yet
            setSearch(newSearch);
          }
        }}
      />

      <div className="mt-8">
        <Suspense
          fallback={<p className="opacity-50">The table is loading...</p>}
        >
          <Table
            search={search}
            afterRender={() => setTableHasRendered(true)}
          />
        </Suspense>
      </div>
    </div>
  );
}

function Table({
  search,
  afterRender,
}: {
  search: string;
  afterRender: () => void;
}) {
  let data = suspend(async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return search;
  }, [search]);

  useEffect(() => {
    afterRender();
  }, [afterRender]);

  return <p>The search is: {data}</p>;
}
