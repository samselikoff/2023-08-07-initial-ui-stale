"use client";

import { Suspense, startTransition, useState } from "react";
import { suspend } from "suspend-react";

export default function Page() {
  let [search, setSearch] = useState("");

  return (
    <div className="bg-white w-full max-w-sm mx-auto mt-8 rounded shadow p-4">
      <input
        className="border p-2 border-gray-500"
        placeholder="Search..."
        type="text"
        onChange={(e) => {
          let newSearch = e.target.value;

          startTransition(() => {
            setSearch(newSearch);
          });
        }}
      />

      <div className="mt-8">
        <Suspense
          fallback={<p className="opacity-50">The table is loading...</p>}
        >
          <Table search={search} />
        </Suspense>
      </div>
    </div>
  );
}

function Table({ search }: { search: string }) {
  let data = suspend(async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return search;
  }, [search]);

  return <p>The search is: {data}</p>;
}
