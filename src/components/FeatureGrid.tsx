"use client";

import CardFeature from "./CardFeatures";
import { Feature } from "../data/features";

interface Props {
  features: Feature[];
  loading: boolean;
}

export default function FeatureGrid({ features, loading }: Props) {
  if (loading) return <p className="text-gray-300 text-center">Loading data...</p>;
  if (features.length === 0) return <p className="text-gray-400 text-center">Tidak ada aplikasi ditemukan.</p>;

  return (
    <div 
    className="
        grid 
        grid-cols-1               /* 🔹 Mobile: 1 kolom penuh */
        xs:grid-cols-2            /* 🔹 Ukuran sangat kecil (≥400px): 2 kolom */
        sm:grid-cols-3            /* 🔹 Tablet kecil */
        md:grid-cols-4 
        lg:grid-cols-5 
        gap-x-2 gap-y-3           /* 🔹 Lebih rapat di mobile */
        sm:gap-x-3 sm:gap-y-4     /* 🔹 Sedikit lega di tablet */
        md:gap-x-4 md:gap-y-5 
        px-3 sm:px-4 md:px-6 lg:px-8 
        py-4 sm:py-6
        place-items-center         /* 🔹 Biar card selalu rata tengah */
        transition-all duration-300
      ">
      {features.map((f, index) => (
        <CardFeature key={index} {...f} />
      ))}
    </div>
  );
}
