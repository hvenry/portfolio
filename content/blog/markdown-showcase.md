---
title: "Markdown Showcase"
date: "2026-02-14"
description: "A comprehensive reference for every markdown feature supported by this blog: headings, code blocks, tables, lists, inline formatting, and edge cases."
tags: ["demo", "markdown", "reference"]
draft: true
---

This post is a living reference for every markdown feature my blog renders.
It doubles as an edge case detector: if something looks off, this is where I'll catch it.

---

## Headings

# H1 - Page Title

## H2 - Section

### H3 - Subsection

#### H4 - Detail

##### H5 - Fine Print

###### H6 - Smallest

Adjacent headings with no body text between them:

### First Adjacent

### Second Adjacent

### Third Adjacent

---

## Paragraphs and Inline Formatting

A regular paragraph with **bold**, _italic_, **_bold italic_**, and `inline code`.
You can also combine them: **this is bold with `code inside`** and _this is italic with `code inside`_.

A second paragraph to confirm spacing between paragraphs is consistent.
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.

A very long paragraph to test word wrapping and line height.
The quick brown fox jumped over the lazy dog.
The quick brown fox jumped over the lazy dog.
The quick brown fox jumped over the lazy dog.
The quick brown fox jumped over the lazy dog.
The quick brown fox jumped over the lazy dog.

~~Strikethrough text~~ works via remark-gfm.

---

## Links

- External link: [GitHub](https://github.com/hvenry)
- External link opens in new tab (should have `target="_blank"`)
- Inline link in a sentence: Check out [my portfolio](https://henryvendittelli.com) for more.
- Link with **bold label**: [**bold link**](https://github.com/hvenry)
- A bare URL that is not linked: https://example.com

---

## Blockquotes

> A simple single-line blockquote.

> A blockquote with **bold**, _italic_, and `inline code` inside it.

> A multi-line blockquote.
>
> This is the second paragraph inside the quote.
>
> And a third.

> Nested blockquote:
>
> > This is the inner quote.
> >
> > > And a third level deep.

---

## Horizontal Rules

Three consecutive sections separated by rules:

First section content.

---

Second section content.

---

Third section content.

---

## Unordered Lists

- Item one
- Item two
- Item three

A list with sub-items:

- Top-level item
  - Nested item
  - Another nested item
    - Deeply nested
    - Also deeply nested
- Back to top level

A list with inline formatting:

- **Bold item** with more text after it
- _Italic item_ with more text after it
- `Code item` with more text after it
- A [linked item](https://github.com/hvenry)
- Item with **bold**, _italic_, and `code` all mixed together

---

## Ordered Lists

1. First step
2. Second step
3. Third step

Nested ordered list:

1. Install dependencies
   1. Run `pnpm install`
   2. Wait for packages to resolve
2. Start development server
   1. Run `pnpm dev`
   2. Open `http://localhost:3000`
3. Make changes and verify

Mixed ordered and unordered nesting:

1. First item
   - Sub-bullet
   - Another sub-bullet
2. Second item
   - Sub-bullet with `code`

---

## Tables

A basic table:

| Name    | Role      | Language   |
| ------- | --------- | ---------- |
| Alice   | Frontend  | TypeScript |
| Bob     | Backend   | Go         |
| Charlie | Fullstack | Rust       |

A table with inline formatting in cells:

| Feature          | Status   | Notes                          |
| ---------------- | -------- | ------------------------------ |
| Syntax highlight | Enabled  | Via `react-syntax-highlighter` |
| Dark mode        | Enabled  | `next-themes`                  |
| Comments         | Flagged  | Behind feature flag            |
| **Bold cell**    | _Italic_ | `code cell`                    |

A table with a long cell to test overflow:

| Short | This column has a very long header that might cause wrapping issues on smaller screens |
| ----- | -------------------------------------------------------------------------------------- |
| A     | A correspondingly long cell value that should also test horizontal scroll behavior     |
| B     | Short                                                                                  |

---

## Code Blocks

### TypeScript

```typescript
interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
  tags: string[];
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(`/api/posts/${slug}`);
    if (!res.ok) return null;
    return res.json() as Promise<Post>;
  } catch {
    return null;
  }
}
```

### Python

```python
def fibonacci(n: int) -> int:
    """Return the nth Fibonacci number."""
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

# Print the first 10 Fibonacci numbers
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")
```

### JavaScript

```javascript
const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

const handleSearch = debounce((query) => {
  console.log("Searching for:", query);
}, 300);
```

### Bash

```bash
#!/bin/bash
set -e

echo "Setting up project..."
pnpm install

echo "Running type check..."
pnpm type-check

echo "Running linter..."
pnpm lint

echo "Building..."
pnpm build

echo "Done!"
```

### SQL

```sql
SELECT
  p.slug,
  p.title,
  COUNT(c.id) AS comment_count,
  MAX(c.created_at) AS last_comment
FROM posts p
LEFT JOIN comments c ON c.post_slug = p.slug
WHERE p.published = true
GROUP BY p.slug, p.title
ORDER BY last_comment DESC NULLS LAST
LIMIT 10;
```

### JSON

```json
{
  "name": "henry-vendittelli-portfolio",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && prisma db push && next build",
    "lint": "eslint . --ext .ts,.tsx",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.0.0",
    "@prisma/client": "^5.0.0"
  }
}
```

### YAML

```yaml
name: Deploy to Vercel
on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "20"
      - run: pnpm install
      - run: pnpm build
```

### No language tag

```
This code block has no language specified.
It should still render correctly without a header bar.
    Indentation should be preserved.
        Deep indentation too.
```

### Long line (horizontal scroll test)

```typescript
const extremelyLongVariableName = someFunction(
  anotherLongArgument,
  yetAnotherArgument,
  "a very long string literal that goes way off screen on most displays to test horizontal scroll"
);
```

### Adjacent code blocks

```bash
pnpm install
```

```bash
pnpm dev
```

---

## Inline Code Edge Cases

Using `backticks` in a sentence.
A path like `/Users/hvenry/dev/portfolio`.
A command like `pnpm run build`.
A generic type like `Promise<string | null>`.
A JSX element like `<Component />`.
A variable like `myVariable`.

---

## Mixed Content

A paragraph followed immediately by a list:

Here are some points:

- Point A
- Point B
- Point C

A paragraph followed by a blockquote:

This paragraph precedes a blockquote.

> This is that blockquote, directly after the paragraph.

A blockquote followed by a code block:

> The following command starts the dev server.

```bash
pnpm dev
```

---

## Strong and Em Edge Cases

**Underscore bold** works the same as `**bold**`.

_Single asterisk italic_ and _single underscore italic_ are equivalent.

**Bold that spans _italic inside_ it** is valid.

_Italic that spans **bold inside** it_ is also valid.

---

That's the full showcase.
If any element above looks wrong, that's your edge case to fix.
