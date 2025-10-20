"use client";
import { motion } from "framer-motion";

interface CardFeaturetopProps {
  title: string;
  desc: string;
  tag?: string;
  color?: string;
}

export default function CardFeature({ title, desc, tag, color }: CardFeaturetopProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="rounded-3xl bg-gray-600 p-4 border border-gray-700 shadow-md hover:shadow-lg transition-all"
    >
      <div className="flex flex-col gap-2">
        {tag && (
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-md bg-${color || "blue"}-600/30 text-${color || "blue"}-400 w-fit`}
          >
            {tag}
          </span>
        )}
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-400">{desc}</p>
        {/* Tombol sejajar */}
        <div className="flex gap-2 mt-auto justify-end">
            <button className="flex-col gap-2 bg-gray-400 hover:bg-gray-700 text-white px-4 py-2 rounded-3xl transition">
                Free Trial
            </button>
            <button className="flex-col gap-2 bg-blue-400 hover:bg-blue-800 text-white px-4 py-2 rounded-3xl transition">
                Buy
            </button>
        </div>
      </div>

      
    </motion.div>
  );
}
