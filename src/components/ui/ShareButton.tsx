"use client";

import { useState } from "react";

export default function ShareButton({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  async function onShare() {
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (e) {
      // fallback: prompt
      prompt("Copy link:", url);
    }
  }

  return (
    <button
      onClick={onShare}
      className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 hover:opacity-90 transition"
      aria-label={`Share ${title}`}
    >
      {/* share icon inline */}
      <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
        <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/>
        <path d="M12 3v14"/>
        <path d="M7 8l5-5 5 5"/>
      </svg>
      {copied ? "Copied!" : "Share"}
    </button>
  );
}
