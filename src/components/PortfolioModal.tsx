// components/PortfolioModal.tsx
import React from 'react';

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  tech: string[];
  description: string;
}

interface PortfolioModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div
        className="bg-white/10 backdrop-blur-md rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 text-xl"
          >
            ×
          </button>
        </div>
        <div className="p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
          <p className="text-blue-300 mb-4">{item.category}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {item.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-blue-500/20 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
          <p className="text-gray-300 mb-4">
            {item.description}
          </p>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors">
              View Live
            </button>
            <button className="px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg transition-colors">
              View Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
