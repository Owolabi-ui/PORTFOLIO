export interface PortfolioItem {
  id: number;
  title: string;
  category: "Web Dev" | "Graphics";
  image: string;
  tech: string[];
  description: string;
  liveUrl?: string;
  codeUrl?: string;
  accent?: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Graphics2Prints Platform",
    category: "Web Dev",
    image: "/images/web-projects/landing-page.png",
    tech: ["Next.js", "Node.js", "MongoDB", "Tailwind"],
    description:
      "A complete print services platform with product browsing, custom order flows, and a clean admin experience built for speed and clarity.",
    liveUrl: "https://graphics2prints.com",
    codeUrl: "https://github.com/Owolabi-ui/Graphics2Prints",
    accent: "E-commerce",
  },
  {
    id: 2,
    title: "DOA Prints",
    category: "Web Dev",
    image: "/images/web-projects/doa-prints/loading-page.png",
    tech: ["Next.js", "React", "TypeScript", "Tailwind"],
    description:
      "Modern marketing website for a print business with polished storytelling, conversion-focused sections, and responsive layouts.",
    liveUrl: "https://doaprints.vercel.app/",
    codeUrl: "https://github.com/Owolabi-ui/doaprints",
    accent: "Brand website",
  },
  {
    id: 3,
    title: "Corporate Logo Collection",
    category: "Graphics",
    image: "/images/logos/corporate-logo.jpg",
    tech: ["CorelDRAW", "Photoshop"],
    description:
      "Brand-focused logo systems designed to help businesses stand out with clean, memorable and professional visual identities.",
    accent: "Branding",
  },
  {
    id: 4,
    title: "Marketing Brochure",
    category: "Graphics",
    image: "/images/brochure/brochure-1.jpg",
    tech: ["CorelDRAW", "Photoshop"],
    description:
      "High-impact brochure design balancing structured product storytelling, typography and visual hierarchy for marketing campaigns.",
    accent: "Print design",
  },
  {
    id: 5,
    title: "Professional Business Cards",
    category: "Graphics",
    image: "/images/business-cards/business-card-1.jpg",
    tech: ["CorelDRAW", "Photoshop"],
    description:
      "Custom business card designs that blend premium layout, thoughtful branding and a polished presentation for modern professionals.",
    accent: "Stationery",
  },
  {
    id: 6,
    title: "Trifold Brochure Design",
    category: "Graphics",
    image: "/images/trifold/trifold-front-1.jpg",
    tech: ["CorelDRAW", "Photoshop"],
    description:
      "Strategic trifold layouts built to communicate value clearly while keeping the brochure visually engaging and easy to scan.",
    accent: "Marketing collateral",
  },
];
