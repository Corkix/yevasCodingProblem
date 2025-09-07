"use client";

export default function RecentSearches({
  items,
  onPick,
  onClear,
}: {
  items: string[];
  onPick: (q: string) => void;
  onClear: () => void;
}) {
  if (!items?.length) return null;

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      {items.map((q, i) => (
        <button
          key={`${q}-${i}`}
          onClick={() => onPick(q)}
          className="rounded-full px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {q}
        </button>
      ))}
      <button
        onClick={onClear}
        className="ml-1 text-xs text-gray-500 hover:underline"
        aria-label="Clear recent searches"
      >
        Clear
      </button>
    </div>
  );
}
