"use client";

import useSWR from "swr";
import type { Post } from "@/lib/types";

const fetcher = async (url: string): Promise<Post[]> => {
  const res = await fetch(url);
  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(msg || "Något gick fel när inlägg hämtades.");
  }
  return res.json();
};

export function usePosts(initialData?: Post[]) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<Post[]>(
    "/api/posts",
    fetcher,
    {
      fallbackData: initialData,
      revalidateOnFocus: false,
    }
  );

  return {
    posts: data,
    loading: !!isLoading && !data,
    error,
    isValidating,
    refresh: () => mutate(), // för Retry-knapp
  };
}
