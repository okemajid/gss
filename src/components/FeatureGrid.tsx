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

  const limitedFeatures = features.slice(0, 12);

  return (
    <div
      className="
        grid
        grid-cols-[repeat(auto-fill,minmax(260px,1fr))]
        gap-7
        w-full
        px-3 sm:px-4 md:px-8 lg:px-12
        py-6
        place-items-center
      "
    >
      {limitedFeatures.map((f, index) => (
        <CardFeature key={index} {...f} />
      ))}
    </div>

  );
}
