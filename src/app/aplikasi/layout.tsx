import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteName } from "@/lib/seo";

const pageTitle = "Daftar Aplikasi";
const pageDescription =
  "Jelajahi daftar aplikasi dan layanan publik digital yang terintegrasi di portal SAWALA Kabupaten Ciamis.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: ["Daftar Aplikasi Ciamis", "Layanan Digital SAWALA", "Portal Aplikasi Pemerintah"],
  alternates: {
    canonical: "/aplikasi",
  },
  openGraph: {
    title: `${pageTitle} | ${siteName}`,
    description: pageDescription,
    url: "/aplikasi",
  },
  twitter: {
    title: `${pageTitle} | ${siteName}`,
    description: pageDescription,
  },
};

export default function AplikasiLayout({children}: {children: ReactNode}) {
  return children;
}
