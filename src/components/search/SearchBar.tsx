"use client";

import { useEffect, useRef, useState } from "react";

export default function SearchBar({
  placeholder = "Search articles…",
  delay = 200,
  defaultValue = "",
  onChange,
  onSubmit,
}: {
  placeholder?: string;
  delay?: number;
  defaultValue?: string;
  onChange: (q: string) => void;
  onSubmit?: (q: string) => void;
}) {
  const [value, setValue] = useState(defaultValue);

  const t = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (t.current !== undefined) {
      window.clearTimeout(t.current);
    }
    t.current = window.setTimeout(() => onChange(value), delay);

    return () => {
      if (t.current !== undefined) {
        window.clearTimeout(t.current);
      }
    };
  }, [value, delay, onChange]);

  return (
    <div className="w-full relative">
      <input
        type="search"
        className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/30 backdrop-blur px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand shadow-soft"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onChange(value);
            onSubmit?.(value);
          }
        }}
        aria-label="Search posts"
      />
    </div>
  );
}

