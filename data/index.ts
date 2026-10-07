export const navItems = [
  { name: "/blog", path: "/blog" },
  { name: "/about", path: "/about" },
  { name: "/random", path: "/random" },
  { name: "/projects", path: "/projects" },
  { name: "/reach-out", path: "/reach-out" }
];

// Shared by the footer and the /reach-out contact card
export const contact = {
  email: "hvendittelli@gmail.com",
  phone: "647-926-6820",
  resume: "/assets/pdfs/HenryVendittelliResume2024.pdf"
};

// Home intro copy is markdown in content/pages/home-intro.md (lib/pages.ts)
// Work, education and club cards are markdown in content/experience/ (lib/experience.ts)

// RANDOM PAGE
export const setup = [
  {
    name: "Main Monitor",
    description: "LG 34WR53QB-B Curved Monitor",
    link: "https://www.lg.com/ca_en/monitors/ultrawide/34wr50qc-b/"
  },
  {
    name: "Ergonomic Keyboard",
    description: "Bastard Keyboards TBK-mini",
    link: "https://github.com/Bastardkb/TBK-Mini"
  },
  {
    name: "Mouse",
    description: "Logitech G Pro X Superlight",
    link: "https://www.logitechg.com/en-ca/products/gaming-mice/pro-x-superlight-wireless-mouse.910-005940.html"
  },
  {
    name: "Trackpad",
    description: "Apple Magic Trackpad",
    link: "https://www.apple.com/ca/shop/product/MMMP3AM/A/magic-trackpad-black-multi-touch-surface"
  },
  {
    name: "Headphones",
    description: "Bose QC35 II Wireless Headphones",
    link: "https://global.bose.com/content/consumer_electronics/b2c_catalog/worldwide/websites/en_ae/product/qc35_ii.html"
  }
];

export const workflow = [
  {
    name: "Neovim",
    description:
      "Primary editor. Lua config with lazy.nvim, Mason-managed LSP servers, and Telescope for fuzzy finding.",
    link: "https://neovim.io/",
    icon: "Neovim"
  },
  {
    name: "Ghostty",
    description:
      "Terminal emulator on both macOS and Arch, so a single config covers every machine.",
    link: "https://ghostty.org/"
  },
  {
    name: "tmux",
    description:
      "Session persistence for long-running work. ctrl+space prefix, vi copy-mode, and ctrl+hjkl moving between tmux panes and Neovim splits as one thing.",
    link: "https://github.com/tmux/tmux/wiki",
    icon: "tmux"
  },
  {
    name: "Zsh + Powerlevel10k",
    description:
      "Login shell and prompt, with autosuggestions and syntax highlighting.",
    link: "https://github.com/romkatv/powerlevel10k",
    icon: "Zsh"
  },
  {
    name: "fzf, zoxide & ripgrep",
    description:
      "The search-and-navigate layer everything else leans on, alongside fd, bat, and eza.",
    link: "https://github.com/junegunn/fzf"
  },
  {
    name: "AeroSpace",
    description:
      "i3-style workspaces on macOS, driven from a versioned TOML. Rectangle handles the window snapping it deliberately leaves alone.",
    link: "https://github.com/nikitabobko/AeroSpace"
  },
  {
    name: "Raycast",
    description:
      "Spotlight replacement: fast access to applications, files, and clipboard history.",
    link: "https://raycast.com/",
    icon: "Raycast"
  },
  {
    name: "Homebrew",
    description:
      "Package manager for macOS; installs the shared core plus casks.",
    link: "https://brew.sh/",
    icon: "Homebrew"
  }
];
