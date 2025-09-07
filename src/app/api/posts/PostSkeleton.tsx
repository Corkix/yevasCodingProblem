export default function PostSkeleton() {
  return (
    <article className="overflow-hidden rounded-2xl bg-white dark:bg-neutral-dark shadow-soft">
      {/* Bildblock */}
      <div className="h-48 md:h-56 lg:h-64 bg-gray-200 dark:bg-gray-800 animate-pulse" />

      {/* Textlinjer */}
      <div className="p-6 space-y-3">
        <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
        <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
        <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
        <div className="h-4 w-11/12 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
        <div className="h-9 w-28 mt-2 rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
      </div>
    </article>
  );
}
