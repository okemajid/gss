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

  // 🔹 Batasi maksimal 12 card (6 per baris di desktop)
  const limitedFeatures = features.slice(0, 12);

  return (
    <div
      className="
        grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-6
        auto-rows-auto
        gap-x-7 gap-y-7
        px-3 sm:px-4 md:px-8 lg:px-12 
        py-4 sm:py-6 lg:py-8
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
