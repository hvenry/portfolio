import { ImageResponse } from "next/og";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import { formatDate } from "@/lib/date";
import {
  OG_LAYOUTS,
  OG_SIZE,
  OgFrame,
  OgText,
  OgUrl,
  loadOgFonts
} from "@/lib/og";

// The project card's layout with the post's date, title and description in
// place of a preview image, since posts have none

export const alt = "Blog post on henryvendittelli.com";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const meta = post
    ? [post.date && formatDate(post.date), ...(post.tags ?? [])]
        .filter(Boolean)
        .join("  ·  ")
    : undefined;

  return new ImageResponse(
    <OgFrame
      layout={OG_LAYOUTS.project}
      footer={<OgUrl path={`/blog/${slug}`} />}
    >
      <OgText
        title={post?.title ?? slug}
        description={post?.description}
        meta={meta}
      />
    </OgFrame>,
    { ...OG_SIZE, fonts: await loadOgFonts() }
  );
}
