import { HeaderProps } from "@/types";
import Link from "next/link";
import { FC } from "react";

import SearchBar from "./Searchbar";
import ThemeToggle from "./ThemeToggle";

const Header: FC<HeaderProps> = ({ className = "" }) => {
  return (
    <header
      className={`sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md ${className}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 dark:text-white"
          >
            MovieExplorer
          </Link>

          <div className="flex items-center gap-4 flex-1 max-w-xl mx-4">
            <SearchBar />
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/watchlist"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Watchlist
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
