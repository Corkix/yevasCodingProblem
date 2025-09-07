"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import SearchBar from "./search/SearchBar";
import RecentSearches from "./search/RecentSearches";
import PostsGrid, { type SimplePost } from "../app/api/posts/PostsGrid";
import { stripHtml } from "@/lib/text";

type PostInput = {
  id: number;
  title: string;
  excerptHTML: string;
  date: string;
  url: string;
  image?: { src: string } | null;
};

const KEY = "trendexplorer.recents";

function loadRecents(): string[] {
  try {
    const v = localStorage.getItem(KEY);
    return v ? JSON.parse(v) : [];
  } catch {
    return [];
  }
}
function saveRecents(list: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list.slice(0, 5)));
  } catch {}
}

export default function HomeClient({ posts }: { posts: PostInput[] }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [recents, setRecents] = useState<string[]>([]);

  useEffect(() => {
    setRecents(loadRecents());
  }, []);

  const onChange = useCallback((q: string) => {
    setLoading(true);
    setQuery(q);
    const t = setTimeout(() => setLoading(false), 120);
    return () => clearTimeout(t);
  }, []);

  const onSubmit = useCallback(
    (q: string) => {
      const cleaned = q.trim();
      if (!cleaned) return;
      const next = [cleaned, ...recents.filter((x) => x.toLowerCase() !== cleaned.toLowerCase())].slice(0, 5);
      setRecents(next);
      saveRecents(next);
    },
    [recents]
  );

  const onPickRecent = useCallback((q: string) => {
    setQuery(q);
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 120);
    return () => clearTimeout(t);
  }, []);

  const onClearRecents = useCallback(() => {
    setRecents([]);
    saveRecents([]);
  }, []);

  // ---- Viktigt: lägg till id + använd mellan-typ med hay ----
  type ItemWithHay = SimplePost & { hay: string };

  const items: SimplePost[] = useMemo(() => {
    const q = query.trim().toLowerCase();

    const withHay: ItemWithHay[] = posts.map((p) => ({
      id: p.id, // ✅ behövs för PostCard (favorites)
      title: p.title,
      excerptHTML: p.excerptHTML,
      date: p.date,
      link: p.url,
      imageUrl: p.image?.src ?? undefined,
      hay: (p.title + " " + stripHtml(p.excerptHTML)).toLowerCase(),
    }));

    const filtered = !q ? withHay : withHay.filter((it) => it.hay.includes(q));
    return filtered.map(({ hay, ...rest }) => rest);
  }, [posts, query]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <SearchBar onChange={onChange} onSubmit={onSubmit} />
      <RecentSearches items={recents} onPick={onPickRecent} onClear={onClearRecents} />
      <PostsGrid posts={items} loading={loading} query={query} />
    </div>
  );
}
