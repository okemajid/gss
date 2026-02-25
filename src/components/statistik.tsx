"use client";

import {useEffect, useState} from "react";
import {TrendingUp, Cloud, Monitor, Smartphone, Globe} from "lucide-react";
import {motion} from "framer-motion";
import {StatisticsInfographic} from "./StatisticsInfographic";
import {getCategories, getFeatures} from "@/data/features";

interface StatistikItem {
  id: number;
  name: string;
  total: number;
}

export default function StatistikSection() {
  const [statistik, setStatistik] = useState<StatistikItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePopup, setActivePopup] = useState<StatistikItem | null>(null);

  useEffect(() => {
    const fetchStatistik = async () => {
      setLoading(true);
      const kategoriList = await getCategories();
      const results = await Promise.all(
        kategoriList.map(async (cat) => {
          const fitur = await getFeatures(cat.id);
          return {id: cat.id, name: cat.name, total: fitur.length};
        }),
      );
      setStatistik(results);
      setLoading(false);
    };
    fetchStatistik();
  }, []);

  const totalAll =
    statistik.find((s) => s.name.toLowerCase() === "all")?.total ?? 0;

  const getIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("cloud")) return <Cloud className="text-sky-500" />;
    if (n.includes("desktop")) return <Monitor className="text-amber-500" />;
    if (n.includes("mobile")) return <Smartphone className="text-indigo-500" />;
    if (n.includes("web")) return <Globe className="text-cyan-500" />;
    return <TrendingUp className="text-blue-500" />;
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 rounded-3xl p-8 animate-pulse" />
    );
  }

  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 rounded-3xl p-8 shadow-2xl overflow-hidden">
      {/* Blur bg */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* TITLE */}
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="w-8 h-8 text-blue-300" />
          <h2 className="text-white text-xl font-bold">Statistik Aplikasi</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* LEFT CARDS */}
          <div className="space-y-5">
            {/* TOTAL */}
            <div
              onClick={() =>
                setActivePopup({
                  id: 0,
                  name: "Total Aplikasi",
                  total: totalAll,
                })
              }
              className="bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl p-6 shadow-lg hover:-translate-y-1 transition cursor-pointer"
            >
              <div className="text-center flex flex-col items-center gap-2">
                <div className="p-3 bg-blue-600 text-white rounded-xl shadow">
                  <TrendingUp />
                </div>
                <p className="text-5xl font-bold text-blue-900">{totalAll}</p>
                <p className="text-blue-700 font-medium">Total Aplikasi</p>
              </div>
            </div>

            {/* CATEGORY GRID */}
            <div className="grid grid-cols-2 gap-4">
              {statistik
                .filter((s) => s.name.toLowerCase() !== "all")
                .map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setActivePopup(item)}
                    className="bg-white/95 rounded-2xl p-5 shadow-lg hover:-translate-y-1 transition cursor-pointer"
                  >
                    <div className="flex flex-col items-center gap-2 text-center">
                      <div className="p-2 rounded-lg bg-gray-100">
                        {getIcon(item.name)}
                      </div>
                      <p className="text-4xl font-bold text-blue-900">
                        {item.total}
                      </p>
                      <p className="text-sm text-blue-700 font-medium">
                        {item.name}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* RIGHT INFOGRAPHIC */}
          <div className="hidden md:flex justify-center">
            <motion.div
              initial={{opacity: 0, scale: 0.85}}
              animate={{opacity: 1, scale: 1}}
              transition={{duration: 0.6}}
            >
              <StatisticsInfographic />
            </motion.div>
          </div>
        </div>

        {/* LAST UPDATE */}
        <p className="text-center text-blue-300 text-sm mt-6">
          Terakhir diperbarui:{" "}
          {new Date().toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      {/* POPUP */}
      {activePopup && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setActivePopup(null)}
          />
          <div className="fixed inset-0 z-50 flex justify-center items-center px-6">
            <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 relative">
              <button
                onClick={() => setActivePopup(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              >
                ✕
              </button>
              <p className="text-5xl font-bold text-center text-gray-800 mb-2">
                {activePopup.total}
              </p>
              <p className="text-center text-gray-600 font-semibold">
                {activePopup.name}
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
