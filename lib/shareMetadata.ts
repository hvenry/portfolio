import type { Metadata } from "next";

/**
 * The openGraph and twitter blocks for a detail page. A route that sets
 * neither inherits the root layout's, including `url: "/"`, so its shared
 * links would show the home page's title and URL. The image comes from the
 * route's opengraph-image / twitter-image files.
 */
export function shareMetadata({
  title,
  description,
  path
}: {
  title: string;
  description: string;
  /** Site-relative URL of the page, resolved against `metadataBase` */
  path: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type: "article",
      siteName: "henryvendittelli.com",
      title,
      description,
      url: path
    },
    twitter: { card: "summary_large_image", title, description }
  };
}
