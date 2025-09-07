"use client";

import { useEffect, useState } from "react";

type Cat = { id: number; name: string; count: number };

export default function CategoryChips({
  selected,
  onToggle,
}: {
  selected: number[];
  onToggle: (id: number) => void;
}) {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/categories");
        const data = (await res.json()) as Cat[];
        setCats(data.slice(0, 12)); // visa topp 12
      } catch (e) {
        console.error("cats failed", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <div className="mt-4 h-8 w-64 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />;
  }

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {cats.map((c) => {
        const active = selected.includes(c.id);
        return (
          <button
            key={c.id}
            onClick={() => onToggle(c.id)}
            className={`rounded-full px-3 py-1 text-sm transition
              ${active ? "bg-brand text-white" : "bg-gray-100 dark:bg-gray-800"}
            `}
            aria-pressed={active}
          >
            {c.name}
          </button>
        );
      })}
    </div>
  );
}
