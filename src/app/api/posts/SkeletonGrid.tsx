import PostSkeleton from "./PostSkeleton";

export default function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <section className="max-w-6xl mx-auto mt-8 grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <PostSkeleton key={i} />
      ))}
    </section>
  );
}
