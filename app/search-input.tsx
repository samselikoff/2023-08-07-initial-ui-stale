"use client";

import { useRouter } from "next/navigation";

export default function SearchInput() {
  let router = useRouter();

  return (
    <input
      className="border p-2 border-gray-500"
      placeholder="Search..."
      type="text"
      onChange={(e) => {
        let params = new URLSearchParams();
        let search = e.target.value;
        if (search) {
          params.set("search", search);
        }

        router.push(`/?${params}`);
      }}
    />
  );
}
