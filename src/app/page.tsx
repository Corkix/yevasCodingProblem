import Container from "@/components/layout/Container";
import ResponsiveGrid from "@/components/layout/ResponsiveGrid";
import PostCard from "@/app/api/posts/PostCard";
import { fetchPostsServer } from "@/lib/api";
import type { Post } from "@/lib/types";
import InfinitePosts from "@/components/InfinitePosts";

export default async function Page() {
  let posts: Post[] = [];
  try {
    posts = await fetchPostsServer();
  } catch (e) {
    console.error("WP fetch failed:", e);
    posts = [];
  }

  return (
    <main className="py-8 md:py-10">
      <Container>
        {/* Hero */}
        <header className="mb-8 md:mb-10">
          <h1 className="scroll-mt-24">Trend Explorer</h1>
          <p className="lead mt-2">
            Explore the latest stories — fetched from WordPress.
          </p>
        </header>

        {/* Latest posts (SSR) */}
        <section id="latest-posts" className="mt-2">
          <h2 className="scroll-mt-24 font-display text-2xl md:text-3xl mb-6">
            Latest posts
          </h2>

          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="lead">Inga inlägg kunde laddas just nu.</p>
            </div>
          ) : (
            <ResponsiveGrid>
              {posts.map((p, i) => (
                <PostCard
                  key={p.id}
                  postId={p.id}                 
                  title={p.title}
                  excerptHTML={p.excerptHTML}
                  date={p.date}
                  link={p.url}
                  imageUrl={p.image?.src}
                  priority={i === 0}
                />
              ))}
            </ResponsiveGrid>
          )}
        </section>

        {/* Bonus-sektion (infinite + filters + search + masonry) */}
        <section id="explore" className="mt-10">
          <h2 className="scroll-mt-24 font-display text-2xl md:text-3xl mb-6">
            Explore
          </h2>
          <InfinitePosts />
        </section>
      </Container>
    </main>
  );
}
