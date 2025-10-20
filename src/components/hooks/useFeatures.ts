"use client";

import { useState, useEffect } from "react";
import {
  ListCheckIcon,
  ShieldCheckIcon,
  Cloud,
  RouterIcon,
  SquareCodeIcon,
  Layers,
  BrainIcon,
  ChartNoAxesCombinedIcon,
} from "lucide-react";


const iconMap: Record<string, any> = {
  CyberSecurity: ShieldCheckIcon,
  Cloud: Cloud,
  Desktop: RouterIcon,
  Mobile: SquareCodeIcon,
  Web: Layers,
  AI: BrainIcon,
  Programming: SquareCodeIcon,
  "Data Science": ChartNoAxesCombinedIcon,
  "IT Infrastruktur": RouterIcon,
  "UI / UX": Layers,
};

const TOKEN = "Bearer 5|6Gd8UP7OfZPQgYbQL03wDeearDauxRkOP7LgGjUDb146b909";
const CATEGORY_API = "https://situ.ciamiskab.go.id/api/v3/simpatik/kategori-katalog-aplikasi";
const FEATURE_API = "https://situ.ciamiskab.go.id/api/v3/simpatik/katalog-aplikasi";

export interface Feature {
  id: string;
  nomor_registrasi: string;
  nama_aplikasi: string;
  category: string;
  domain_aplikasi: string;
  pengguna: string;
  deskripsi: string;
  url: string;
}

export function useFeatures() {
  const [categories, setCategories] = useState<{ id: number; name: string; icon?: any }[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Ambil kategori
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(CATEGORY_API, { headers: { Authorization: TOKEN } });
        const json = await res.json();
        const mapped = [
          { id: 0, name: "All", icon: ListCheckIcon },
          ...json.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            icon: iconMap[item.name] || Layers,
          })),
        ];
        setCategories(mapped);
      } catch (err) {
        console.error("Gagal ambil kategori:", err);
      }
    };
    fetchCategories();
  }, []);

  // 🔹 Ambil fitur
  const fetchFeatures = async (categoryId = 0) => {
    setLoading(true);
    try {
      let allData: Feature[] = [];
      const url = categoryId ? `${FEATURE_API}?kategori=${categoryId}` : FEATURE_API;
      const res = await fetch(url, { headers: { Authorization: TOKEN } });
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        allData = json.data.map((item: any) => ({
          id: String(item.id),
          nomor_registrasi: item.nomor_registrasi || "-",
          domain_aplikasi: item.domain_aplikasi || "",
          category: item.kategori?.name || "Umum",
          nama_aplikasi: item.nama_aplikasi || "Tidak diketahui",
          pengguna: item.pengguna || "-",
          deskripsi: item.deskripsi || "",
          url: item.url || "#",
        }));
      }
      setFeatures(allData);
    } catch (err) {
      console.error("Gagal ambil fitur:", err);
    } finally {
      setLoading(false);
    }
  };

  return { categories, features, fetchFeatures, loading };
}
