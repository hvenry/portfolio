import { test } from "node:test";
import assert from "node:assert/strict";
import { shareMetadata } from "./shareMetadata.ts";

test("gives a page its own share title, description and URL", () => {
  assert.deepEqual(
    shareMetadata({
      title: "clear-rag - henryvendittelli.com",
      description: "A RAG app",
      path: "/projects/clear-rag"
    }),
    {
      openGraph: {
        type: "article",
        siteName: "henryvendittelli.com",
        title: "clear-rag - henryvendittelli.com",
        description: "A RAG app",
        url: "/projects/clear-rag"
      },
      twitter: {
        card: "summary_large_image",
        title: "clear-rag - henryvendittelli.com",
        description: "A RAG app"
      }
    }
  );
});
