"use client";

import {
  ImageIcon,
  Search,
  Cloud,
  Monitor,
  Smartphone,
  Globe,
  Layers,
} from "lucide-react";

interface Props {
  activeCategory: { id: number; name: string };
  setActiveCategory: (cat: { id: number; name: string }) => void;
  searchTerm: string;
  onSearch: (val: string) => void;
  onUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRefresh?: () => void;
}

export default function SearchAndCategoryBar({
  activeCategory,
  setActiveCategory,
  searchTerm,
  onSearch,
  onUpload,
  onRefresh,
}: Props) {
  // 🔹 Daftar kategori (All + kategori utama)
  const categories = [
    { id: 0, name: "All", icon: Layers },
    { id: 1, name: "Cloud", icon: Cloud },
    { id: 2, name: "Desktop", icon: Monitor },
    { id: 3, name: "Mobile", icon: Smartphone },
    { id: 4, name: "Web", icon: Globe },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto mb-8 flex flex-col md:flex-row items-center justify-between gap-4 px-4">
      {/* 🔹 Kategori Filter */}
      <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-start gap-3 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory.id === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium border transition-all shadow-sm whitespace-nowrap
                ${
                  isActive
                    ? "bg-[#0E3B8C] text-white border-[#0E3B8C]"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-blue-50"
                }`}
            >
              <Icon size={16} />
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* 🔹 Search Bar dengan animasi smooth */}
      <div
        className="flex items-center bg-white rounded-full border border-gray-500 shadow-md overflow-hidden 
                  transition-all duration-500 ease-in-out w-full md:w-[300px] max-w-lg 
                  focus-within:md:w-[380px] hover:shadow-lg"
      >
        <div className="flex items-center flex-1 px-4">
          <Search size={16} className="text-gray-400 mr-2 hidden sm:block transition-transform duration-300 group-focus-within:scale-110" />
          <input
            type="text"
            placeholder="Cari aplikasi..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="flex-1 text-gray-700 placeholder-gray-400 bg-transparent py-3 
                      focus:outline-none text-sm transition-all duration-300"
          />
        </div>
      </div>

    </div>
  );
}
