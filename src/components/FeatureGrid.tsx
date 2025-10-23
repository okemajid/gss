"use client";

import CardFeature from "./CardFeatures";
import { Feature } from "../data/features";

interface Props {
  features: Feature[];
  loading: boolean;
}

export default function FeatureGrid({ features, loading }: Props) {
  if (loading)
    return <p className="text-gray-300 text-center">Loading data...</p>;

  if (features.length === 0)
    return (
      <p className="text-gray-400 text-center">
        Tidak ada aplikasi ditemukan.
      </p>
    );

  // 🔹 Batasi maksimal 8 card saja (2x4 di mobile, 4x2 di desktop)
  const limitedFeatures = features.slice(0, 8);

  return (
    <div
      className="
        grid
        grid-cols-2                /* 🔹 Mobile: 2 kolom (4 baris = 8 card) */
        sm:grid-cols-2             
        md:grid-cols-3             
        lg:grid-cols-4             /* 🔹 Desktop: 4 kolom (2 baris = 8 card) */
        gap-x-3 gap-y-4 
        sm:gap-x-4 sm:gap-y-5 
        md:gap-x-5 md:gap-y-6 
        px-3 sm:px-4 md:px-6 lg:px-8 
        py-4 sm:py-6
        place-items-center
        transition-all duration-300
      "
    >
      {limitedFeatures.map((f, index) => (
        <CardFeature key={index} {...f} />
      ))}
    </div>
  );
}
