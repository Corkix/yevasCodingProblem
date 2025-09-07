import { NextResponse } from "next/server";

const WP_BASE = "https://bergvik.se/wp-json/wp/v2";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") ?? "1";
    const per_page = searchParams.get("per_page") ?? "9";
    const q = searchParams.get("q") ?? "";
    const categories = searchParams.get("categories") ?? "";

    const params = new URLSearchParams({
      _embed: "1",     
      page,
      per_page,
    });

    if (q) params.set("search", q);
    if (categories) params.set("categories", categories);

    const url = `${WP_BASE}/posts?${params.toString()}`;
    const res = await fetch(url, { next: { revalidate: 60 } });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return NextResponse.json(
        { error: `WP error ${res.status}`, details: text },
        { status: res.status }
      );
    }

    const data = await res.json();


    const headers = new Headers();
    headers.set("X-Total-Pages", res.headers.get("X-WP-TotalPages") ?? "");
    headers.set("X-Total", res.headers.get("X-WP-Total") ?? "");

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Proxy failed", message: e?.message ?? String(e) },
      { status: 500 }
    );
  }
}
