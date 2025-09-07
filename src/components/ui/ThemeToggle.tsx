"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(next)}
      className="inline-flex items-center gap-2 rounded-xl px-3 py-2 bg-gray-200 dark:bg-gray-800 shadow-soft transition hover:opacity-90"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      <span className="text-sm hidden sm:inline">{next === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}
