"use client";

import { useEffect, useMemo, useState } from "react";

export default function SearchBar({
  placeholder = "Search articles…",
  onChange,
  delay = 250,
  defaultValue = "",
}: {
  placeholder?: string;
  onChange: (q: string) => void;
  delay?: number;
  defaultValue?: string;
}) {
  const [value, setValue] = useState(defaultValue);

  // enkel debounce
  const debounced = useMemo(() => {
    let t: any;
    return (v: string) => {
      clearTimeout(t);
      t = setTimeout(() => onChange(v), delay);
    };
  }, [onChange, delay]);

  useEffect(() => {
    debounced(value);
  }, [value, debounced]);

  return (
    <div className="w-full relative">
      <input
        type="search"
        className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/30 backdrop-blur px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand shadow-soft"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Search posts"
      />
    </div>
  );
}
