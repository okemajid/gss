"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import StatistikSection from "@/components/statistik"; // pastikan path sesuai

export default function HeroCarousel() {
  const [showStats, setShowStats] = useState(false);

  return (
    <section className="relative min-h-screen w-full overflow-hidden text-white flex items-center justify-center">
      {/* 🔹 Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/carousel5.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#08225C]/60 to-[#0E3B8C]/50" />

      {/* 🔹 Konten */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-2/3 text-center md:text-left space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Satu Platform Digital untuk Wargi Ciamis
          </h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl">
            Akses berbagai layanan publik Ciamis dalam satu genggaman. Mudah, cepat, dan transparan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={() => setShowStats(true)}
              className="px-6 py-3 bg-[#00C18B] hover:bg-[#00a576] text-white font-semibold rounded-full transition-all transform hover:scale-105 shadow-lg"
            >
              Statistik
            </button>
            {/* 🔹 Tombol Tentang Sawala dengan Link */}
            
            <Link
              href="/tentang"
              className="px-6 py-3 border border-white/60 hover:bg-white/10 text-white font-semibold rounded-full transition-all text-center"
            >
              Tentang Sawala
            </Link>
          </div>
        </motion.div>
      </div>

      {/* 🔹 Popup Statistik */}
      <AnimatePresence>
        {showStats && (
          <>
            {/* Overlay (klik di luar = tutup) */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setShowStats(false)}
            />

            {/* Konten Popup */}
            <motion.div
              key="popup"
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()} // supaya klik di dalam popup tidak menutup
            >
              <div className="relative bg-white rounded-3xl shadow-2xl max-w-5xl w-full p-6 overflow-y-auto max-h-[90vh]">
                {/* Tombol close */}
                <button
                  onClick={() => setShowStats(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold transition-all"
                >
                  ✕
                </button>

                {/* Komponen Statistik */}
                <StatistikSection asPopup onClose={() => setShowStats(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
