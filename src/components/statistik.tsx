"use client";

import {useEffect, useState} from "react";
import Image from "next/image";
import {getCategories, getFeatures} from "@/data/features";

interface StatistikItem {
  id: number;
  name: string;
  total: number;
}
// ✅ Tambahkan definisi props di sini
interface StatistikSectionProps {
  asPopup?: boolean;
  onClose?: () => void;
}

// ✅ Terapkan props di sini ⬇️
export default function StatistikSection({
  asPopup = false,
  onClose,
}: StatistikSectionProps) {
  const [statistik, setStatistik] = useState<StatistikItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePopup, setActivePopup] = useState<StatistikItem | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchStatistik = async () => {
      setLoading(true);
      const kategoriList = await getCategories();
      const results = await Promise.all(
        kategoriList.map(async (cat) => {
          const fitur = await getFeatures(cat.id);
          return {id: cat.id, name: cat.name, total: fitur.length};
        })
      );
      setStatistik(results);
      setLoading(false);
    };
    fetchStatistik();

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const colors = [
    {bg: "bg-green-100", text: "text-green-800"},
    {bg: "bg-yellow-100", text: "text-yellow-800"},
    {bg: "bg-blue-100", text: "text-blue-800"},
    {bg: "bg-cyan-100", text: "text-cyan-800"},
    {bg: "bg-indigo-100", text: "text-indigo-800"},
    {bg: "bg-pink-100", text: "text-pink-800"},
  ];

  // ===========================================================
  // 🔹 Versi DESKTOP
  // ===========================================================
  const renderDesktop = () => (
    <section
      id="statistik"
      className="relative bg-gradient-to-r from-[#0E3B8C] to-[#08225C] overflow-hidden rounded-4xl py-14"
    >
      {/* Judul */}
      <h2 className="text-white text-xl font-bold mb-6 text-center">
        Statistik Aplikasi
      </h2>

      <div className="w-full max-w-[1600px] mx-auto px-12">
        <div className="flex flex-row items-center justify-between gap-20">
          {/* Grid kiri */}
          <div className="flex-[1.5] grid grid-cols-2 gap-8 w-full">
            {loading ? (
              <p className="col-span-full text-center text-white text-lg">
                Memuat data statistik...
              </p>
            ) : (
              <>
                {/* Card "All" */}
                {statistik
                  .filter((item) => item.name.toLowerCase() === "all")
                  .map((item, i) => (
                    <button
                      key={item.id}
                      onClick={() => setActivePopup(item)}
                      className={`col-span-2 rounded-2xl ${
                        colors[i % colors.length].bg
                      } ${colors[i % colors.length].text}
                        flex flex-col justify-center items-center py-6 px-5 shadow-xl hover:scale-105 transition-transform`}
                    >
                      <p className="text-7xl font-extrabold mb-3">
                        {item.total}
                      </p>
                      <p className="text-lg font-semibold">Total Aplikasi</p>
                    </button>
                  ))}

                {/* Card lainnya */}
                {statistik
                  .filter((item) => item.name.toLowerCase() !== "all")
                  .map((item, i) => (
                    <button
                      key={item.id}
                      onClick={() => setActivePopup(item)}
                      className={`rounded-2xl ${colors[i % colors.length].bg} ${
                        colors[i % colors.length].text
                      }
                        flex flex-col justify-center items-center py-5 px-4 shadow-lg hover:scale-105 transition-transform`}
                    >
                      <p className="text-6xl font-extrabold mb-2">
                        {item.total}
                      </p>
                      <p className="text-base font-semibold text-center">
                        {item.name}
                      </p>
                    </button>
                  ))}
              </>
            )}
          </div>

          {/* Gambar kanan */}
          <div className="flex-[1] flex justify-center items-center md:max-h-[80vh]">
            <Image
              src="/images/hero5.png"
              alt="Ilustrasi Statistik"
              width={1500}
              height={1200}
              className="drop-shadow-2xl object-contain w-[100%] animate-float animate-slow"
              priority
            />
            <Image
              src="/images/helo.png"
              alt="Ilustrasi Statistik"
              width={300}
              height={100}
              className="drop-shadow-2xl object-contain w-[100%] animate-float animate-slow"
              priority
            />
          </div>
        </div>
      </div>

      {renderPopup()}
    </section>
  );

  // ===========================================================
  // 🔹 Versi MOBILE
  // ===========================================================
  const renderMobile = () => (
    <section
      id="statistik"
      className="relative bg-gradient-to-r from-[#0E3B8C] to-[#08225C] 
             py-5 px-3 rounded-3xl overflow-hidden 
             flex flex-col justify-center items-center"
    >
      {/* Judul */}
      <h2 className="text-white text-xl font-bold mb-6 text-center">
        Statistik Aplikasi
      </h2>

      {/* Grid Card */}
      <div className="grid grid-cols-2 gap-3 place-items-center w-full max-w-xs">
        {loading ? (
          <p className="col-span-2 text-center text-white text-lg">
            Memuat data statistik...
          </p>
        ) : (
          <>
            {statistik.map((item, i) => {
              const isAll = item.name.toLowerCase() === "all";
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePopup(item)}
                  className={`
                  rounded-2xl ${colors[i % colors.length].bg} ${
                    colors[i % colors.length].text
                  }
                  flex flex-col justify-center items-center 
                  ${isAll ? "col-span-2 py-2 md:py-3" : "py-3 md:py-4"} 
                  px-3 w-full shadow-md hover:scale-105 transition-transform
                `}
                >
                  <p
                    className={`font-extrabold mb-1 ${
                      isAll ? "text-5xl md:text-7xl" : "text-3xl md:text-5xl"
                    }`}
                  >
                    {item.total}
                  </p>
                  <p
                    className={`font-semibold text-center ${
                      isAll ? "text-sm md:text-lg" : "text-xs md:text-base"
                    }`}
                  >
                    {isAll ? "Total Aplikasi" : item.name}
                  </p>
                </button>
              );
            })}
          </>
        )}
      </div>

      {/* Gambar */}
      <div className="flex justify-center mt-4">
        <Image
          src="/images/hero4.png"
          alt="Statistik"
          width={200}
          height={100}
          className="object-contain drop-shadow-lg w-[60%]"
          priority
        />
      </div>

      {/* Popup */}
      {activePopup && (
        <>
          {/* Overlay — klik di luar popup untuk keluar */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setActivePopup(null)}
          />

          {/* Popup Card */}
          <div
            className="fixed inset-0 z-50 flex justify-center items-center px-6"
            onClick={(e) => e.stopPropagation()} // agar klik di dalam popup tidak menutup
          >
            <div className="bg-white rounded-2xl shadow-xl max-w-xs w-full p-6 relative">
              <button
                onClick={() => setActivePopup(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl font-bold"
              >
                ✕
              </button>

              <p className="text-5xl font-extrabold mb-3 text-center text-gray-800">
                {activePopup.total}
              </p>
              <p className="text-lg font-semibold text-center text-gray-600">
                {activePopup.name}
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  );

  // ===========================================================
  // 🔹 Popup Komponen (dipakai di kedua versi)
  // ===========================================================
  const renderPopup = () =>
    activePopup && (
      <>
        {/* Overlay — klik di luar popup untuk keluar */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setActivePopup(null)}
        />
        {/* Popup Card */}
        <div
          className="fixed inset-0 z-50 flex justify-center items-center px-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 relative">
            <button
              onClick={() => setActivePopup(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
            >
              ✕
            </button>
            <p className="text-5xl font-extrabold mb-3 text-center text-gray-800">
              {activePopup.total}
            </p>
            <p className="text-lg font-semibold text-center text-gray-600">
              {activePopup.name}
            </p>
          </div>
        </div>
      </>
    );

  // ===========================================================
  // 🔹 Render Final (deteksi mobile/desktop)
  // ===========================================================
  return isMobile ? renderMobile() : renderDesktop();
}
