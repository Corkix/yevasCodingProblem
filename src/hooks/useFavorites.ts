"use client";

import { useEffect, useState, useCallback } from "react";

const KEY = "trendexplorer.favs";

export function useFavorites() {
  const [ids, setIds] = useState<number[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setIds(JSON.parse(raw));
    } catch {}
  }, []);

  const save = (next: number[]) => {
    setIds(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  };

  const has = useCallback((id: number) => ids.includes(id), [ids]);

  const toggle = useCallback((id: number) => {
    save(has(id) ? ids.filter((x) => x !== id) : [id, ...ids]);
  }, [ids, has]);

  return { ids, has, toggle };
}
