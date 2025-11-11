"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/Carousel";
import Footer from "@/components/Footer";
import SearchAndCategoryBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
import FeatureGrid from "@/components/FeatureGrid";
import { getFeatures, getCategories, Feature } from "@/data/features";

export default function HomePage() {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [filteredFeatures, setFilteredFeatures] = useState<Feature[]>([]);
  const [activeCategory, setActiveCategory] = useState<{ id: number; name: string }>({
    id: 0,
    name: "All",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;
  const searchParams = useSearchParams();
  const scrollLockRef = useRef<number>(0);

  // 🔍 Smooth scroll via query param
  useEffect(() => {
    const section = searchParams.get("scrollTo");
    if (section) {
      const target = document.getElementById(section);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth" });
        }, 500);
      }
    }
  }, [searchParams]);

  // 🔹 Load awal (kategori + semua data)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [catData, featData] = await Promise.all([getCategories(), getFeatures()]);
        setCategories([{ id: 0, name: "All" }, ...catData]);
        setFeatures(featData);
        setFilteredFeatures(featData);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  // 🔹 Update saat kategori berubah
  useEffect(() => {
    if (!activeCategory) return;
    const fetchByCategory = async () => {
      setLoading(true);
      const data =
        activeCategory.id === 0
          ? await getFeatures()
          : await getFeatures(activeCategory.id);
      setFeatures(data);
      setFilteredFeatures(data);
      setSearchTerm("");
      setCurrentPage(1);
      setLoading(false);
    };
    fetchByCategory();
  }, [activeCategory]);

  // 🔹 Filter pencarian
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredFeatures(features);
      return;
    }

    const term = searchTerm.toLowerCase();
    const result = features.filter(
      (f) =>
        f.nama_aplikasi.toLowerCase().includes(term) ||
        f.domain_aplikasi.toLowerCase().includes(term) ||
        f.kategori.toLowerCase().includes(term)
    );
    setFilteredFeatures(result);
    setCurrentPage(1);
  }, [searchTerm, features]);

  // 🔹 Upload gambar (preview)
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setUploadedImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  // 🔹 Pagination
  const totalPages = Math.ceil(filteredFeatures.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentFeatures = filteredFeatures.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      scrollLockRef.current = window.scrollY;
      setCurrentPage(page);
      setTimeout(() => {
        window.scrollTo({ top: scrollLockRef.current, behavior: "instant" });
      }, 100);
    }
  };

  return (
    <main
      className="min-h-screen w-full flex flex-col items-center overflow-x-hidden relative bg-white text-gray-900"
      suppressHydrationWarning
    >
      {/* 🔹 Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-white/80 backdrop-blur-md">
          <div className="w-16 h-16 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
          <p className="mt-6 text-blue-700 text-lg font-semibold">
            Memuat SAWALA...
          </p>
        </div>
      )}

      <Navbar />
      <HeroCarousel />

      <section
        id="daftar-aplikasi"
        className="w-full min-h-screen flex flex-col items-center justify-start pt-32 pb-10 text-center bg-white"
      >
        <SearchAndCategoryBar
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          onUpload={handleUpload}
          onRefresh={() =>
            getFeatures(activeCategory.id === 0 ? undefined : activeCategory.id).then(
              setFilteredFeatures
            )
          }
        />

        <FeatureGrid features={currentFeatures} loading={loading} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalData={features.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </section>

      <Footer />
    </main>
  );
}
