import type { Metadata } from "next";
import BackLink from "@/components/BackLink";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPostSlugs } from "@/lib/posts";
import CopyUrlButton from "@/components/CopyUrlButton";
import { formatDate } from "@/lib/date";
import BlogContent from "@/components/BlogContent";

type Params = Promise<{ slug: string }>;

// Every post is known at build time; any other slug is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} - henryvendittelli.com`,
    description: post.description
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col pb-32">
      <article className="w-full px-2 sm:px-4">
        <header className="mb-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h1 className="font-display text-3xl font-semibold tracking-wide text-foreground sm:text-4xl">
              {post.title}
            </h1>
            <BackLink href="/blog" label="blog" />
          </div>
          <div className="flex items-center justify-between border-b border-line pb-6 text-sm text-subtle">
            <CopyUrlButton />
            <span>{formatDate(post.date)}</span>
          </div>
        </header>

        <BlogContent content={post.content} />
      </article>
    </div>
  );
}
