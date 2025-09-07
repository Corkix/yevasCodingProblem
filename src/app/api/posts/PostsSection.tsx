"use client";

import { usePosts } from "@/hooks/usePosts";
import PostCard from "./PostCard";
import type { Post } from "@/lib/types";

// Hjälpfunktion för att ta bort HTML-taggar från WordPress content
function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").trim();
}

export default function PostsSection({ initial }: { initial: Post[] }) {
  const { posts, loading, error, refresh } = usePosts(initial);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto mt-8 grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-64 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto mt-8 text-center">
        <p className="text-red-500">Kunde inte ladda inlägg.</p>
        <button
          onClick={refresh}
          className="mt-3 rounded-xl bg-brand px-4 py-2 text-white"
        >
          Försök igen
        </button>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="max-w-5xl mx-auto mt-8 text-center">
        <p className="lead">Inga inlägg hittades.</p>
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto mt-8 grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((p) => (
        <PostCard
          key={p.id}
          title={stripHtml(p.title.rendered)}
          excerpt={stripHtml(p.excerpt.rendered)}
          link={p.link}
          imageUrl="https://picsum.photos/600/400" // placeholder tills vi hämtar featured images
        />
      ))}
    </section>
  );
}
