import type { Metadata } from "next";
import { Suspense } from "react";
import HomePage from "@/components/HomePage";
import { siteName } from "@/lib/seo";

const pageTitle = "Beranda";
const pageDescription =
  "Temukan aplikasi dan layanan digital Pemerintah Kabupaten Ciamis melalui portal SAWALA dalam satu akses.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${pageTitle} | ${siteName}`,
    description: pageDescription,
    url: "/",
  },
  twitter: {
    title: `${pageTitle} | ${siteName}`,
    description: pageDescription,
  },
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen text-gray-600">
          Memuat halaman SAWALA...
        </div>
      }
    >
      <HomePage />
    </Suspense>
  );
}
