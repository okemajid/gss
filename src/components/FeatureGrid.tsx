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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-6xl mb-10 justify-center items-center text-center">
      {features.map((f, index) => (
        <CardFeature key={index} {...f} />
      ))}
    </div>
  );
}
