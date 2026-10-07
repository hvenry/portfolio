import Link from "next/link";
import { IconType } from "react-icons";
import { BsSoundwave } from "react-icons/bs";
import { FaAws, FaJava, FaPython, FaServer } from "react-icons/fa";
import { FaEarthAmericas, FaGlobe } from "react-icons/fa6";
import { GiTigerHead, GiWarpPipe, GiWolfHead } from "react-icons/gi";
import { IoAnalytics, IoSparklesSharp } from "react-icons/io5";
import { LuHardDrive } from "react-icons/lu";
import { MdSubtitles } from "react-icons/md";
import { PiCodeSimple, PiMaskHappy, PiPawPrint } from "react-icons/pi";
import { RiEye2Fill } from "react-icons/ri";
import {
  SiApache,
  SiApple,
  SiArchlinux,
  SiAuth0,
  SiC,
  SiCaddy,
  SiCelery,
  SiClerk,
  SiCloudflare,
  SiCloudflareworkers,
  SiCss,
  SiDjango,
  SiDocker,
  SiDrizzle,
  SiExpo,
  SiExpress,
  SiExpressvpn,
  SiFastapi,
  SiFfmpeg,
  SiFigma,
  SiFirebase,
  SiGhostty,
  SiGit,
  SiGithubactions,
  SiGnu,
  SiGnubash,
  SiGooglecloud,
  SiGooglemaps,
  SiGrafana,
  SiGraphql,
  SiGunicorn,
  SiHomebrew,
  SiHomepage,
  SiHtml5,
  SiHuggingface,
  SiHyprland,
  SiJavascript,
  SiJellyfin,
  SiJest,
  SiLangchain,
  SiLinux,
  SiLua,
  SiMermaid,
  SiMeta,
  SiMongodb,
  SiMysql,
  SiNeovim,
  SiNextdotjs,
  SiNodedotjs,
  SiNtfy,
  SiNumpy,
  SiNvidia,
  SiOllama,
  SiOnnx,
  SiOpencv,
  SiOpentelemetry,
  SiOpenvpn,
  SiPandas,
  SiPhp,
  SiPnpm,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiPrometheus,
  SiPydantic,
  SiPytest,
  SiPython,
  SiPytorch,
  SiQbittorrent,
  SiRabbitmq,
  SiRadarr,
  SiRailway,
  SiRaycast,
  SiReact,
  SiReactrouter,
  SiRedis,
  SiRedux,
  SiRust,
  SiScipy,
  SiSentry,
  SiSharp,
  SiSonarr,
  SiSpacy,
  SiSqlite,
  SiTailscale,
  SiTailwindcss,
  SiTanstack,
  SiTerraform,
  SiThreedotjs,
  SiTmux,
  SiTypescript,
  SiUnity,
  SiUptimekuma,
  SiVercel,
  SiVim,
  SiVite,
  SiVitest,
  SiZsh
} from "react-icons/si";
import { FalIcon } from "@/components/customIcons";

/** Technology icon registry shared by Skills and project pages */
export const techIcons: Record<string, IconType> = {
  Python: FaPython,
  Bash: SiGnubash,
  Lua: SiLua,
  Java: FaJava,
  C: SiC,
  "C#": SiSharp,
  Rust: SiRust,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  React: SiReact,
  "React Native": SiReact,
  "Next.js": SiNextdotjs,
  "Express.js": SiExpress,
  Expo: SiExpo,
  "Tailwind CSS": SiTailwindcss,
  "Three.js": SiThreedotjs,
  FastAPI: SiFastapi,
  Gunicorn: SiGunicorn,
  OpenCV: SiOpencv,
  PyTorch: SiPytorch,
  MySQL: SiMysql,
  Redis: SiRedis,
  PostgreSQL: SiPostgresql,
  "Neon PostgreSQL": SiPostgresql,
  MongoDB: SiMongodb,
  SQLite: SiSqlite,
  Firebase: SiFirebase,
  Clerk: SiClerk,
  Git: SiGit,
  Neovim: SiNeovim,
  tmux: SiTmux,
  Zsh: SiZsh,
  Homebrew: SiHomebrew,
  Raycast: SiRaycast,
  GCP: SiGooglecloud,
  AWS: FaAws,
  Auth0: SiAuth0,
  Vim: SiVim,
  Vite: SiVite,
  pnpm: SiPnpm,
  // Playwright has no brand icon in react-icons; its logo is a theatre mask
  Playwright: PiMaskHappy,
  "Node.js": SiNodedotjs,
  GraphQL: SiGraphql,
  Postman: SiPostman,
  Terraform: SiTerraform,
  "GitHub Actions": SiGithubactions,
  Langchain: SiLangchain,
  Ollama: SiOllama,
  "Lama3.2": SiMeta,
  FAISS: SiMeta,
  spaCy: SiSpacy,
  Pandas: SiPandas,
  PHP: SiPhp,
  HTML: SiHtml5,
  CSS: SiCss,
  Apache: SiApache,
  Unix: SiLinux,
  "Arch Linux": SiArchlinux,
  Makefile: SiGnu,
  "GNU Stow": SiGnu,
  Unity: SiUnity,
  Figma: SiFigma,
  Prisma: SiPrisma,
  Vercel: SiVercel,
  Django: SiDjango,
  Celery: SiCelery,
  RabbitMQ: SiRabbitmq,
  Redux: SiRedux,
  "Cloudflare R2": SiCloudflare,
  "Google Places API": SiGooglemaps,
  Sentry: SiSentry,
  OpenTelemetry: SiOpentelemetry,
  Grafana: SiGrafana,
  Docker: SiDocker,
  Railway: SiRailway,
  Jest: SiJest,
  // NativeWind has no brand icon; it is Tailwind's engine for React Native
  NativeWind: SiTailwindcss,
  "Cloudflare Workers": SiCloudflareworkers,
  "Durable Objects": SiCloudflare,
  Wrangler: SiCloudflare,
  Vitest: SiVitest,
  "React Three Fiber": SiReact,
  // Zustand has no brand icon; its mark is a bear
  Zustand: PiPawPrint,
  Pydantic: SiPydantic,
  NumPy: SiNumpy,
  "ONNX Runtime": SiOnnx,
  "TanStack Query": SiTanstack,
  "React Router": SiReactrouter,
  pytest: SiPytest,
  // d3-geo and TopoJSON have no brand icons; both are map projection tooling
  "d3-geo": FaGlobe,
  TopoJSON: FaGlobe,
  "Natural Earth": FaEarthAmericas,
  "Web Audio API": BsSoundwave,
  ffmpeg: SiFfmpeg,
  "Vercel Analytics": IoAnalytics,
  Hyprland: SiHyprland,
  macOS: SiApple,
  Ghostty: SiGhostty,
  Mermaid: SiMermaid,
  Caddy: SiCaddy,
  Tailscale: SiTailscale,
  "Cloudflare DNS": SiCloudflare,
  // Gluetun has no brand icon; it pipes other containers through the VPN
  Gluetun: GiWarpPipe,
  OpenVPN: SiOpenvpn,
  ExpressVPN: SiExpressvpn,
  Jellyfin: SiJellyfin,
  "NVIDIA NVENC": SiNvidia,
  CUDA: SiNvidia,
  Radarr: SiRadarr,
  Sonarr: SiSonarr,
  Bazarr: MdSubtitles,
  Prowlarr: GiTigerHead,
  Seerr: RiEye2Fill,
  qBittorrent: SiQbittorrent,
  // FlareSolverr solves Cloudflare challenges; node-exporter feeds Prometheus
  FlareSolverr: SiCloudflare,
  Prometheus: SiPrometheus,
  "node-exporter": SiPrometheus,
  "Uptime Kuma": SiUptimekuma,
  Glances: GiWolfHead,
  // Diun watches Docker images for updates
  Diun: SiDocker,
  ntfy: SiNtfy,
  Homepage: SiHomepage,
  restic: FaServer,
  btrfs: LuHardDrive,
  "Hugging Face Transformers": SiHuggingface,
  // BiRefNet has no brand icon; the sparkle marks it as the model
  BiRefNet: IoSparklesSharp,
  SciPy: SiScipy,
  // Pillow has no brand icon; it is Python's imaging library
  Pillow: SiPython,
  "fal.ai": FalIcon,
  Drizzle: SiDrizzle
};

/** Icon for a technology name; unknown names get a generic code glyph */
export const getTechIcon = (name: string): IconType =>
  techIcons[name] ?? PiCodeSimple;

type TechBadgeProps = {
  name: string;
  size?: "sm" | "md";
  /** Render as a link (e.g. to the filtered projects page) */
  href?: string;
  /** Render as a toggle button (filter chip) */
  onClick?: () => void;
  selected?: boolean;
  className?: string;
};

export default function TechBadge({
  name,
  size = "md",
  href,
  onClick,
  selected = false,
  className: extraClassName = ""
}: TechBadgeProps) {
  const Icon = getTechIcon(name);
  const isSm = size === "sm";

  const sizeClassName = isSm ? "gap-1.5 px-2 py-1" : "gap-2 px-2.5 py-1.5";
  const stateClassName = selected
    ? "border-foreground bg-foreground text-background"
    : "border-line text-muted hover:border-foreground/50 hover:text-foreground";
  const className = `${extraClassName} inline-flex items-center border transition-colors duration-200 ${sizeClassName} ${stateClassName}`;

  const content = (
    <>
      <Icon className={isSm ? "size-3.5" : "size-4"} />
      <span
        className={`font-medium ${
          isSm ? "text-[11px] sm:text-xs" : "text-xs sm:text-sm"
        }`}
      >
        {name}
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={selected}
        className={`cursor-pointer ${className}`}
      >
        {content}
      </button>
    );
  }
  return <span className={className}>{content}</span>;
}
