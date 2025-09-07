export type PostImage = {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
};

export type Post = {
  id: number;
  title: string;        // ren text
  excerptHTML: string;  // WP excerpt med HTML
  date: string;         // ISO
  url: string;          // länk till original
  image: PostImage | null; // featured image om finns
};
