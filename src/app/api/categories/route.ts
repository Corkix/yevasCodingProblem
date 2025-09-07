import { NextResponse } from "next/server";
const WP_BASE = "https://bergvik.se/wp-json/wp/v2";

export async function GET() {
  const url = `${WP_BASE}/categories?per_page=100&orderby=count&order=desc`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) return NextResponse.json({ error: "WP categories failed" }, { status: 500 });
  const cats = await res.json();
  return NextResponse.json(cats);
}
