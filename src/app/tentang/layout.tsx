import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteName } from "@/lib/seo";

const pageTitle = "Tentang";
const pageDescription =
  "Pelajari visi, misi, dan arah pengembangan SAWALA sebagai platform layanan digital terpadu Pemerintah Kabupaten Ciamis.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: ["Tentang SAWALA", "Visi Misi SAWALA", "Transformasi Digital Ciamis"],
  alternates: {
    canonical: "/tentang",
  },
  openGraph: {
    title: `${pageTitle} | ${siteName}`,
    description: pageDescription,
    url: "/tentang",
  },
  twitter: {
    title: `${pageTitle} | ${siteName}`,
    description: pageDescription,
  },
};

export default function TentangLayout({children}: {children: ReactNode}) {
  return children;
}
