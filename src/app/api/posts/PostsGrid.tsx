"use client";

import { motion } from "framer-motion";
import PostCard from "./PostCard";
import PostSkeleton from "./PostSkeleton";
import { listContainer, listItem } from "@/lib/motion";

export type SimplePost = {
  id: number;            
  title: string;
  excerptHTML: string;   
  date: string;          // ISO
  link: string;          // original URL
  imageUrl?: string;     // undefined om saknas
};

export default function PostsGrid({
  posts,
  loading = false,
  query = "",
}: {
  posts: SimplePost[];
  loading?: boolean;
  query?: string;
}) {
  if (loading) {
    return (
      <section className="max-w-6xl mx-auto mt-8 grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <PostSkeleton key={i} />
        ))}
      </section>
    );
  }

  // Filtrera på titel + ren text från excerptHTML
  const q = query.trim().toLowerCase();
  const filtered = !q
    ? posts
    : posts.filter((p) =>
        (p.title + " " + p.excerptHTML.replace(/<[^>]*>/g, "")).toLowerCase().includes(q)
      );

  if (!filtered.length) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto mb-4 h-20 w-20 rounded-2xl bg-gradient-to-br from-accent-gradientFrom to-accent-gradientTo opacity-80" />
        <p className="lead">No results{q ? ` for “${query}”` : ""}. Try another search.</p>
      </div>
    );
  }

  return (
    <motion.section
      variants={listContainer}
      initial="hidden"
      animate="show"
      className="max-w-6xl mx-auto mt-8 grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3"
    >
      {filtered.map((p) => (
        <motion.div key={p.id} variants={listItem} layout>
          <PostCard
            postId={p.id}                 
            title={p.title}
            excerptHTML={p.excerptHTML}
            date={p.date}
            link={p.link}
            imageUrl={p.imageUrl}
          />
        </motion.div>
      ))}
    </motion.section>
  );
}
