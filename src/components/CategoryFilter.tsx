"use client";

import { Layers, Cloud, RouterIcon, ShieldCheckIcon, BrainIcon, ImageIcon, SquareCodeIcon, ChartNoAxesCombinedIcon, Globe } from "lucide-react";

interface Props {
  categories: { id: number; name: string }[];
  activeCategory: { id: number; name: string };
  setActiveCategory: (cat: { id: number; name: string }) => void;
}

// 🔹 Peta kategori → ikon (seperti awal)
const iconMap: Record<string, any> = {
  Cloud: Cloud,
  Web: Globe,
  Mobile: RouterIcon,
  Desktop: SquareCodeIcon,
  "Cyber Security": ShieldCheckIcon,
  AI: BrainIcon,
  Design: ImageIcon,
  Analytics: ChartNoAxesCombinedIcon,
};

export default function CategoryFilter({ categories, activeCategory, setActiveCategory }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-4 my-8">
      {categories.map((cat) => {
        const Icon = iconMap[cat.name] || Layers; // fallback jika tidak ada icon
        const isActive = activeCategory.id === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300
              ${isActive
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white hover:bg-blue-50 border-gray-300 text-gray-700"}
            `}
          >
            <Icon size={18} />
            <span className="text-sm font-medium">{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
