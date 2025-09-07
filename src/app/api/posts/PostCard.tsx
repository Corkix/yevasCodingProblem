"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { sanitizeHtml } from "@/lib/sanitize";

type Props = {
  postId: number;
  title: string;
  excerptHTML: string;
  date: string;
  link: string;
  imageUrl?: string;
  priority?: boolean; // för LCP på första bilden
};

function formatDateShort(iso: string) {
  try {
    return new Intl.DateTimeFormat("sv-SE", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default function PostCard({
  postId,
  title,
  excerptHTML,
  date,
  link,
  imageUrl,
  priority,
}: Props) {
  const reduce = useReducedMotion();
  const safeExcerpt = sanitizeHtml(excerptHTML);

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -2, scale: 1.01 }}
      transition={reduce ? undefined : { duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-neutral-dark shadow-soft transition"
    >
      {/* Media */}
      <motion.div
        className="relative w-full h-44 md:h-56 lg:h-64 overflow-hidden"
        whileHover={reduce ? undefined : { scale: 1.03 }}
        transition={reduce ? undefined : { duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title || "Bloggbild"}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={!!priority}
          />
        ) : (
          <div
            className="absolute inset-0 bg-gradient-to-br from-accent-gradientFrom to-accent-gradientTo opacity-90"
            aria-hidden="true"
          />
        )}
      </motion.div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 md:p-6">
        <time className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
          {formatDateShort(date)}
        </time>

        <h2 className="mt-1 font-display text-xl md:text-[1.375rem] font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h2>

        
        <div
          className="clamp-3 lead mt-2 flex-1 text-gray-700 dark:text-gray-300 body-relaxed"
          dangerouslySetInnerHTML={{ __html: safeExcerpt }}
        />

        <motion.a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Läs ”${title}” på bergvik.se`}
          whileHover={reduce ? undefined : { scale: 1.02 }}
          whileTap={reduce ? undefined : { scale: 0.98 }}
          transition={reduce ? undefined : { duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium shadow-soft bg-gray-900 text-white dark:bg-white dark:text-gray-900 focus-ring"
        >
          Read on site
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            className="inline-block"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <path d="M15 3h6v6" />
            <path d="M10 14L21 3" />
          </svg>
        </motion.a>
      </div>
    </motion.article>
  );
}
