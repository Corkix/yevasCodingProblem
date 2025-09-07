"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  console.error("Page crashed:", error);

  return (
    <div className="text-center py-16">
      <div className="mx-auto mb-4 h-20 w-20 rounded-2xl bg-red-500/80" />
      <p className="lead text-red-600 dark:text-red-400">Något gick fel.</p>
      <button
        onClick={() => reset()}
        className="mt-4 rounded-xl bg-brand px-4 py-2 text-white shadow-soft hover:opacity-90"
      >
        Försök igen
      </button>
    </div>
  );
}
