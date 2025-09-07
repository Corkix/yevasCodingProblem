"use client";

export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50
                 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-gray-900
                 px-3 py-2 text-sm shadow-soft"
    >
      Hoppa till innehåll
    </a>
  );
}
