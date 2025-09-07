"use client";

export default function ErrorState({
  message = "Kunde inte ladda inlägg.",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="text-center py-16">
      <div className="mx-auto mb-4 h-20 w-20 rounded-2xl bg-red-500/80" />
      <p className="lead text-red-600 dark:text-red-400">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-xl bg-brand px-4 py-2 text-white shadow-soft hover:opacity-90"
        >
          Försök igen
        </button>
      )}
    </div>
  );
}
