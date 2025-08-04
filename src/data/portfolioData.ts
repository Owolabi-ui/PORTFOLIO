// data/portfolioData.ts
export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  tech: string[];
  description: string;
  liveUrl?: string;
  codeUrl?: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    category: "Web Dev",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
    tech: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    description: "A full-stack e-commerce solution with payment integration, inventory management, and admin dashboard. Features include real-time updates, advanced search, and mobile optimization.",
    liveUrl: "https://ecommerce-demo.com",
    codeUrl: "https://github.com/owolabi-ui/ecommerce"
  },
  {
    id: 2,
    title: "Brand Identity Design",
    category: "Graphics",
    image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea",
    tech: ["CorelDRAW", "Photoshop", "Illustrator"],
    description: "Complete brand identity package including logo design, color palette, typography selection, and comprehensive brand guidelines for a tech startup.",
    liveUrl: "https://behance.net/project",
    codeUrl: ""
  },
  {
    id: 3,
    title: "Performance CLI Tool",
    category: "Rust",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    tech: ["Rust", "WebAssembly", "Tokio"],
    description: "High-performance command-line tool for file processing and data transformation. Compiled to WebAssembly for browser integration with 10x faster processing than JavaScript alternatives.",
    liveUrl: "",
    codeUrl: "https://github.com/owolabi-ui/rust-cli"
  },
  {
    id: 4,
    title: "Restaurant Website",
    category: "Web Dev",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
    tech: ["React", "TypeScript", "Firebase"],
    description: "Modern restaurant website with online ordering system, table reservation, menu management, and real-time order tracking. Includes admin panel for restaurant staff.",
    liveUrl: "https://restaurant-demo.com",
    codeUrl: "https://github.com/owolabi-ui/restaurant-app"
  },
  {
    id: 5,
    title: "Logo Collection",
    category: "Graphics",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d",
    tech: ["Illustrator", "CorelDRAW", "After Effects"],
    description: "Collection of modern, minimalist logos for various tech startups and businesses. Each design includes multiple variations, color schemes, and animated versions.",
    liveUrl: "https://dribbble.com/logos",
    codeUrl: ""
  },
  {
    id: 6,
    title: "Web Scraper",
    category: "Rust",
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a",
    tech: ["Rust", "Tokio", "Reqwest"],
    description: "Asynchronous web scraper built with Rust for high-performance data extraction. Features rate limiting, proxy support, and data export to multiple formats.",
    liveUrl: "",
    codeUrl: "https://github.com/owolabi-ui/web-scraper"
  },
];
