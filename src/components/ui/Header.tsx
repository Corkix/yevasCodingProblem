"use client";

import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

export default function Header({
  onSearch,
}: {
  onSearch: (q: string) => void;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 dark:border-white/10 bg-white/70 dark:bg-black/30 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <span className="text-sm tracking-wide uppercase text-gray-500 dark:text-gray-400">
              Trend Explorer
            </span>
            <ThemeToggle />
          </div>
          <div className="mt-3">
            <SearchBar onChange={onSearch} />
          </div>
        </div>
      </div>
    </header>
  );
}
