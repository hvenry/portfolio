import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";
import { OG_COLORS, OG_LAYOUTS, OG_SIZE, OgFrame, loadOgFonts } from "@/lib/og";

// The home card's frame with the project's preview image in place of the
// wordmark, and the project's own URL in place of the nav row

export const alt = "Project preview on henryvendittelli.com";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

const MIME: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg"
};

/** The preview image as a data URL; satori cannot fetch from the app's own public/ at build time */
async function previewDataUrl(image: string) {
  const mime = MIME[path.extname(image).toLowerCase()];
  if (!mime) return null;
  const file = await readFile(
    path.join(process.cwd(), "public", "assets", "images", "projects", image)
  );
  return `data:${mime};base64,${file.toString("base64")}`;
}

export default async function Image({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const preview = project?.image ? await previewDataUrl(project.image) : null;

  // Fit the 1200x630 preview to the content box's height, centred in the frame
  const layout = OG_LAYOUTS.project;
  const height = layout.content.height;
  const width = Math.round((height * OG_SIZE.width) / OG_SIZE.height);

  return new ImageResponse(
    <OgFrame
      layout={layout}
      footer={
        <>
          <div style={{ color: OG_COLORS.dim }}>henryvendittelli.com</div>
          <div
            style={{ color: OG_COLORS.foreground }}
          >{`/projects/${slug}`}</div>
        </>
      }
    >
      {preview ? (
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- satori renders plain img only */}
          <img
            src={preview}
            alt=""
            width={width}
            height={height}
            style={{ border: "1px solid #262626", objectFit: "cover" }}
          />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 26,
            color: OG_COLORS.foreground
          }}
        >
          <div
            style={{
              fontFamily: "Oswald",
              fontWeight: 700,
              fontSize: 92,
              lineHeight: 1
            }}
          >
            {project?.bodyTitle ?? slug}
          </div>
          <div
            style={{
              fontFamily: "Inter",
              fontSize: 30,
              color: OG_COLORS.muted,
              marginTop: 22
            }}
          >
            {project?.summary ?? ""}
          </div>
        </div>
      )}
    </OgFrame>,
    { ...OG_SIZE, fonts: await loadOgFonts() }
  );
}
