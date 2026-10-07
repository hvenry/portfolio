/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three"],
  async redirects() {
    // Renamed writeups: old slug -> new slug
    const renamed = [["homelab", "hvenrylab"]].map(([from, to]) => ({
      source: `/projects/${from}`,
      destination: `/projects/${to}`,
      permanent: true
    }));
    // Removed writeups (archived in the Obsidian vault); old shared links land
    // on the index instead of a 404. Not permanent, so a slug can be reused
    // without browsers holding a cached redirect.
    const removed = ["c-game", "bear-the-animal-tosser", "parking-app"].map(
      (slug) => ({
        source: `/projects/${slug}`,
        destination: "/projects",
        permanent: false
      })
    );
    return [...renamed, ...removed];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
        pathname: "**"
      }
    ]
  }
};

export default nextConfig;
