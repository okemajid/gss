"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getCategories, getFeatures } from "@/data/features";

interface StatistikItem {
  id: number;
  name: string;
  total: number;
}

export default function StatistikSection() {
  const [statistik, setStatistik] = useState<StatistikItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistik = async () => {
      setLoading(true);
      const kategoriList = await getCategories();

      const results = await Promise.all(
        kategoriList.map(async (cat) => {
          const fitur = await getFeatures(cat.id);
          return { id: cat.id, name: cat.name, total: fitur.length };
        })
      );

      setStatistik(results);
      setLoading(false);
    };

    fetchStatistik();
  }, []);

  const colors = [
    { bg: "bg-green-100", text: "text-green-800" },
    { bg: "bg-yellow-100", text: "text-yellow-800" },
    { bg: "bg-blue-100", text: "text-blue-800" },
    { bg: "bg-cyan-100", text: "text-cyan-800" },
    { bg: "bg-indigo-100", text: "text-indigo-800" },
    { bg: "bg-pink-100", text: "text-pink-800" },
  ];

  return (
    <section
      id="statistik"
      className="
        relative 
        min-h-[600px]
        scroll-mt-34
        flex items-center justify-center
        bg-gradient-to-r from-[#0E3B8C] to-[#08225C]
        overflow-hidden rounded-4xl
      "
    >
      <div className="w-full max-w-[1600px] px-6 md:px-12">
        {/* Container utama */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-20">
          
          {/* 🔹 Kiri: Statistik Grid */}
        <div className="flex-[1.5] grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-h-[70vh] justify-center items-center">
          {loading ? (
            <p className="col-span-full text-center text-white text-lg">
              Memuat data statistik...
            </p>
          ) : (
            <>
              {/* Card "All" di atas dan lebih lebar */}
              {statistik
                .filter((item) => item.name.toLowerCase() === "all")
                .map((item, i) => (
                  <div
                    key={item.id}
                    className={`col-span-1 md:col-span-2 rounded-2xl ${colors[i % colors.length].bg} ${colors[i % colors.length].text}
                      flex flex-col justify-center items-center py-6 px-5 shadow-xl 
                      hover:scale-105 transition-transform`}
                  >
                    <p className="text-6xl md:text-7xl font-extrabold leading-none mb-3">
                      {item.total}
                    </p>
                    <p className="text-base md:text-lg font-semibold text-center leading-tight">
                      {item.name.toLowerCase() === "all" ? "Total Aplikasi" : item.name}
                    </p>
                  </div>
                ))}

              {/* Card lainnya di bawah */}
              {statistik
                .filter((item) => item.name.toLowerCase() !== "all")
                .map((item, i) => (
                  <div
                    key={item.id}
                    className={`rounded-2xl ${colors[i % colors.length].bg} ${colors[i % colors.length].text}
                      flex flex-col justify-center items-center py-5 px-4 shadow-lg 
                      hover:scale-105 transition-transform`}
                  >
                    <p className="text-5xl md:text-6xl font-extrabold leading-none mb-2">
                      {item.total}
                    </p>
                    <p className="text-sm md:text-base font-semibold text-center leading-tight">
                      {item.name}
                    </p>
                  </div>
                ))}
            </>
          )}
        </div>

          {/* 🔹 Kanan: Ilustrasi */}
          <div className="flex-[1] flex justify-center items-center max-h-[70vh]">
            <Image
              src="/images/hero4.png"
              alt="Ilustrasi Statistik"
              width={700}
              height={500}
              className="drop-shadow-2xl object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
