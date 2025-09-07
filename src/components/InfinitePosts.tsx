"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import PostsGrid, { type SimplePost } from "../app/api/posts/PostsGrid";
import SkeletonGrid from "../app/api/posts/SkeletonGrid";
import CategoryChips from "./categories/CategoryChips";
import SearchBar from "./search/SearchBar";

type WPPost = {
  id: number;
  date?: string;
  link?: string;
  title?: { rendered?: string };
  excerpt?: { rendered?: string };
  _embedded?: {
    ["wp:featuredmedia"]?: Array<{
      source_url?: string;
      media_details?: {
        sizes?: Record<string, { source_url: string }>;
      };
    }>;
  };
};

function mapWpToSimple(wp: WPPost): SimplePost {
  const title =
    wp?.title?.rendered?.replace(/<[^>]*>/g, "") ?? "Untitled";
  const excerptHTML = wp?.excerpt?.rendered ?? "";
  const date = wp?.date ?? new Date().toISOString();
  const link = wp?.link ?? "#";

  const media = wp?._embedded?.["wp:featuredmedia"]?.[0];
  const img =
    media?.media_details?.sizes?.medium_large?.source_url ??
    media?.media_details?.sizes?.large?.source_url ??
    media?.source_url;

  return {
    id: wp.id,                  // för PostsGrid/PostCard/Favorites
    title,
    excerptHTML,
    date,
    link,
    imageUrl: img,              
  };
}

export default function InfinitePosts() {
  const [items, setItems] = useState<SimplePost[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [q, setQ] = useState("");
  const [cats, setCats] = useState<number[]>([]);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const load = useCallback(
    async (reset = false) => {
      if (loading) return;
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(reset ? 1 : page),
          per_page: "9",
        });
        if (q.trim()) params.set("q", q.trim());
        if (cats.length) params.set("categories", cats.join(","));

        const res = await fetch(`/api/posts?${params.toString()}`);
        if (!res.ok) throw new Error("fetch failed");
        const data = (await res.json()) as WPPost[];

        const mapped = data.map(mapWpToSimple);
        setItems((prev) => (reset ? mapped : [...prev, ...mapped]));

        const totalPages = Number(res.headers.get("X-Total-Pages") ?? "1");
        const nextPage = reset ? 2 : page + 1;
        setHasMore(nextPage <= totalPages);
        setPage(nextPage);
      } catch (e) {
        console.error("[infinite] load failed", e);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [page, q, cats, loading]
  );

  // observer
  useEffect(() => {
    if (!hasMore || !sentinelRef.current) return;
    const el = sentinelRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) load();
      },
      { rootMargin: "600px 0px 0px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, load]);

  // initial
  useEffect(() => {
    load(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // vid filter/sök – reset
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    load(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, cats]);

  const onToggleCat = useCallback((id: number) => {
    setCats((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  return (
    <div className="mt-8">
      <SearchBar onChange={setQ} onSubmit={setQ} />
      <CategoryChips selected={cats} onToggle={onToggleCat} />

      {items.length === 0 && loading ? (
        <SkeletonGrid count={6} />
      ) : (
        <PostsGrid posts={items} query={q} />
      )}

      {/* sentinel */}
      {hasMore && <div ref={sentinelRef} className="h-10" />}
    </div>
  );
}
