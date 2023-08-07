import { Suspense } from "react";
import SearchInput from "./search-input";

export default function Home({ searchParams }: { searchParams: any }) {
  let search = searchParams.search;

  return (
    <div className="bg-white w-full max-w-sm mx-auto mt-8 rounded shadow p-4">
      <SearchInput />

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

async function Table({ search }: { search?: string }) {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return <div>The search is {search}</div>;
}
