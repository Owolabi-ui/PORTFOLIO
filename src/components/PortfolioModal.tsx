import Image from "next/image";
import React from "react";

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  tech: string[];
  description: string;
  liveUrl?: string;
  codeUrl?: string;
  accent?: string;
}

interface PortfolioModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative h-64 w-full overflow-hidden md:h-80">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-slate-950/70 text-xl text-white transition hover:bg-slate-950"
            aria-label="Close project details"
          >
            ×
          </button>
        </div>

        <div className="space-y-6 p-6 text-slate-100 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-violet-300">
                {item.accent || item.category}
              </p>
              <h3 className="mt-2 text-2xl font-bold md:text-3xl">{item.title}</h3>
            </div>
            <span className="rounded-full border border-violet-400/40 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-200">
              {item.category}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {item.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-medium text-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>

          <p className="text-base leading-7 text-slate-300">{item.description}</p>

          <div className="flex flex-wrap gap-3">
            {item.liveUrl ? (
              <a
                href={item.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-400"
              >
                View live
              </a>
            ) : null}
            {item.codeUrl ? (
              <a
                href={item.codeUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-slate-600 bg-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-700"
              >
                View code
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
