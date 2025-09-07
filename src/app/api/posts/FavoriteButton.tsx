"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";
import { useFavorites } from "@/hooks/useFavorites";

const heartPop: Variants = {
  off: { scale: 1 },
  on: {
    scale: [1, 1.18, 1],
    transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function FavoriteButton({ postId, title }: { postId: number; title: string }) {
  const { has, toggle } = useFavorites();
  const fav = has(postId);
  const reduce = useReducedMotion();

  return (
    <motion.button
      type="button"
      aria-pressed={fav}
      aria-label={fav ? `Ta bort “${title}” från favoriter` : `Spara “${title}” som favorit`}
      onClick={() => toggle(postId)}
      className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition focus-ring
        ${fav ? "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-300" : "bg-gray-100 dark:bg-gray-800"}
      `}
      whileTap={reduce ? undefined : { scale: 0.96 }}
      title={fav ? `Tog bort “${title}”` : `Sparade “${title}”`}
    >
      <motion.span
        // om reduce: ingen pop-animation
        animate={reduce ? { scale: 1 } : (fav ? "on" : "off")}
        variants={reduce ? undefined : heartPop}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          className={fav ? "fill-current" : ""}
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          aria-hidden="true"
        >
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
        </svg>
      </motion.span>
      {fav ? "Saved" : "Save"}
    </motion.button>
  );
}
