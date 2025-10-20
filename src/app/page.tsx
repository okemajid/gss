"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroCarousel from "@/components/Carousel";
import Footer from "@/components/Footer";
import SearchAndCategoryBar from "../components/SearchBar";
import StatistikSection from "@/components/statistik";
import FeatureGrid from "../components/FeatureGrid";
import { getFeatures, getCategories, Feature } from "../data/features";

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
  const [loading, setLoading] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // 🔹 Ambil kategori & semua data awal hanya sekali
  useEffect(() => {
    const fetchInitial = async () => {
      setLoading(true);
      const [catData, featData] = await Promise.all([
        getCategories(),
        getFeatures(), // ambil semua fitur (tanpa kategori)
      ]);
      setCategories(catData); // catData sudah termasuk “All” di data/features.ts
      setFeatures(featData);
      setFilteredFeatures(featData);
      setLoading(false);
    };
    fetchInitial();
  }, []);

  // 🔹 Jika kategori berubah, ambil ulang dari API
  useEffect(() => {
    const fetchByCategory = async () => {
      setLoading(true);
      let data;
      if (activeCategory.id === 0) {
        // Semua kategori
        data = await getFeatures();
      } else {
        // Berdasarkan kategori dari API
        data = await getFeatures(activeCategory.id);
      }
      setFeatures(data);
      setFilteredFeatures(data);
      setSearchTerm(""); // reset pencarian saat ganti kategori
      setCurrentPage(1);
      setLoading(false);
    };
    fetchByCategory();
  }, [activeCategory]);

  // 🔹 Filter pencarian lokal (tidak panggil API)
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

  // 🔹 Upload gambar
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
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center overflow-x-hidden relative">
      {/* 🔹 Loader */}
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-white/70 backdrop-blur-md">
          <div className="w-20 h-20 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="mt-6 text-blue-700 text-lg font-semibold">
            Memuat Galuh Smart Services...
          </p>
        </div>
      )}

      <HeroCarousel />
      <Navbar />

      <section
        id="daftar-aplikasi"
        className="w-full min-h-screen flex flex-col items-center justify-start pt-24 pb-10 text-center bg-white"
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white shadow"
                    : "bg-white border border-gray-300 hover:bg-blue-50"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </section>

      <StatistikSection />
      <Footer />
    </main>
  );
}
