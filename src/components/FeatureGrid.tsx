"use client";

import CardFeature from "./CardFeatures";
import {Feature} from "../data/features";

interface Props {
  features: Feature[];
  loading: boolean;
}

export default function FeatureGrid({features, loading}: Props) {
  if (loading)
    return <p className="text-gray-300 text-center">Loading data...</p>;

  if (features.length === 0)
    return (
      <p className="text-gray-400 text-center">Tidak ada aplikasi ditemukan.</p>
    );

  const limitedFeatures = features.slice(0, 12);

  return (
    <div
      className="
        grid
        grid-cols-2
        sm:grid-cols-[repeat(auto-fill,minmax(170px,1fr))]
        md:grid-cols-[repeat(auto-fill,minmax(180px,1fr))]
        lg:grid-cols-[repeat(auto-fill,minmax(220px,1fr))]
        xl:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]
        2xl:grid-cols-6
        gap-9
        w-full
        px-3 sm:px-4 md:px-10 lg:px-12 xl:px-14 2xl:px-12
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
