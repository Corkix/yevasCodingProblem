import type { Post } from "./types";

const WP_BASE = "https://bergvik.se/wp-json/wp/v2";

type WPPost = {
  id: number;
  date: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: {
    ["wp:featuredmedia"]?: Array<{
      source_url?: string;
      alt_text?: string;
      media_details?: {
        width?: number;
        height?: number;
        sizes?: Record<string, { source_url: string; width: number; height: number }>;
      };
    }>;
  };
};

function toPlain(html: string) {
  return html.replace(/<[^>]*>/g, "").trim();
}

function transformPost(wp: WPPost): Post {
  const media = wp._embedded?.["wp:featuredmedia"]?.[0];
  let image: Post["image"] = null;

  if (media) {
    const sizes = media.media_details?.sizes;
    const pick =
      sizes?.medium_large ??
      sizes?.large ??
      (media.source_url
        ? { source_url: media.source_url, width: media.media_details?.width, height: media.media_details?.height }
        : undefined);

    if (pick?.source_url) {
      image = {
        src: pick.source_url,
        width: (pick as any).width,
        height: (pick as any).height,
        alt: media.alt_text || toPlain(wp.title?.rendered ?? ""),
      };
    }
  }

  return {
    id: wp.id,
    title: toPlain(wp.title?.rendered ?? "Untitled"),
    excerptHTML: wp.excerpt?.rendered ?? "",
    date: wp.date,
    url: wp.link,
    image,
  };
}

export async function fetchPostsServer(): Promise<Post[]> {
  const url = `${WP_BASE}/posts?_embed&per_page=20`;
  const res = await fetch(url, { next: { revalidate: 120 } });
  if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
  const data = (await res.json()) as WPPost[];
  return data.map(transformPost);
}
