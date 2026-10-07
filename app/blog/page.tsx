import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/date";
import Panel from "@/components/Panel";

export const metadata = {
  title: "Blog - henryvendittelli.com",
  description: "Thoughts, tutorials, and insights on software development."
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="pt-8 pb-16 sm:pb-24">
      <div className="mx-2 space-y-5">
        {posts.length === 0 ? (
          <p className="text-lg text-muted">
            No blog posts yet. Check back soon!
          </p>
        ) : (
          posts.map((post) => (
            <Panel key={post.slug} interactive>
              <article>
                <Link href={`/blog/${post.slug}`} className="block p-5">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <h2 className="font-display text-lg font-medium tracking-wide text-foreground sm:text-xl">
                        {post.title}
                      </h2>
                      <p className="whitespace-nowrap text-xs tabular-nums text-subtle">
                        {formatDate(post.date)}
                      </p>
                    </div>
                    <p className="body-copy">{post.description}</p>
                  </div>
                </Link>
              </article>
            </Panel>
          ))
        )}
      </div>
    </main>
  );
}
