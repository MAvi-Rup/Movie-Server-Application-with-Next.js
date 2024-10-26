"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { SearchBarProps } from "@/types";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FC, useEffect, useState } from "react";

const SearchBar: FC<SearchBarProps> = ({ className = "" }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get("query") || ""
  );
  const debouncedSearch = useDebounce<string>(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearch) {
      router.push(`/?query=${encodeURIComponent(debouncedSearch)}`);
    } else if (searchTerm === "") {
      router.push("/");
    }
  }, [debouncedSearch, router, searchTerm]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={`relative flex-1 ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder="Search movies..."
      />
    </div>
  );
};

export default SearchBar;
