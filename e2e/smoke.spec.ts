import { test, expect } from "@playwright/test";

const routes = [
  "/",
  "/about",
  "/projects",
  "/blog",
  "/random",
  "/reach-out",
  "/rock"
];

for (const route of routes) {
  test(`${route} renders`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/henryvendittelli/);
  });
}

// Experience cards and page copy keep their fields in a leading Field/Value
// table (lib/fieldTable.ts); a parsing regression would leak it into the page
test("home intro and work cards render from markdown", async ({ page }) => {
  await page.goto("/");
  const main = page.locator("main");
  await expect(
    main.getByRole("link", { name: "reach out" }).first()
  ).toHaveAttribute("href", "/reach-out");
  await expect(main.getByText(/^\[ .+ \]$/).first()).toBeVisible();
  await expect(main).not.toContainText(/\|\s*Field\s*\|/);
});

test("education and club cards render from markdown", async ({ page }) => {
  await page.goto("/about");
  const main = page.locator("main");
  await expect(main.getByText(/^\[ .+ \]$/).first()).toBeVisible();
  await expect(main).not.toContainText(/\|\s*Field\s*\|/);
});

test("a project detail page renders", async ({ page }) => {
  await page.goto("/projects");
  await page.locator('a[href="/projects/clear-rag"]').first().click();
  await expect(page).toHaveURL(/\/projects\/clear-rag/);
  // Exact h1 match: writeup sections like "clear-rag Overview" are headings too
  await expect(
    page.getByRole("heading", { level: 1, name: "clear-rag", exact: true })
  ).toBeVisible();
});

test("a blog post renders", async ({ page }) => {
  await page.goto("/blog");
  const posts = page.locator('a[href^="/blog/"]');
  // Draft-only blogs are empty in production builds; assert the empty state
  if ((await posts.count()) === 0) {
    await expect(page.getByText("No blog posts yet")).toBeVisible();
    return;
  }
  await posts.first().click();
  await expect(page).toHaveURL(/\/blog\/.+/);
});

test("navbar navigates to about", async ({ page }) => {
  await page.goto("/");
  await page.locator('a[href="/about"]').first().click();
  await expect(page).toHaveURL(/\/about$/);
});

test("theme toggle switches theme", async ({ page }) => {
  await page.goto("/");
  const html = page.locator("html");
  const before = await html.getAttribute("data-theme");
  await page.locator('button[aria-label="toggle theme"]').first().click();
  await expect(html).not.toHaveAttribute("data-theme", before ?? "");
});

test("guestbook shows sign-in state for anonymous visitors", async ({
  page
}) => {
  // The guestbook can't render until Clerk initializes client-side; surface
  // Clerk failures directly instead of a generic visibility timeout
  const clerkErrors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error" && /clerk/i.test(msg.text())) {
      clerkErrors.push(msg.text());
    }
  });
  page.on("response", (response) => {
    if (response.url().includes("/__clerk/") && response.status() >= 400) {
      clerkErrors.push(`${response.status()} from ${response.url()}`);
    }
  });

  await page.goto("/rock");
  try {
    await expect(page.getByText("Sign my site!")).toBeVisible({
      timeout: 15_000
    });
  } catch (error) {
    if (clerkErrors.length > 0) {
      throw new Error(
        "Clerk failed to initialize on this deployment — check that " +
          "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY / CLERK_SECRET_KEY are set for " +
          "this environment and that the deploy was built AFTER they were " +
          `updated:\n${clerkErrors.join("\n")}`
      );
    }
    throw error;
  }
  await expect(page.getByText("Authenticate")).toBeVisible({
    timeout: 15_000
  });
});
