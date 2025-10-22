"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import StatistikSection from "./statistik";

export default function HeroCarousel() {
  const slide = {
    id: 1,
    title: "SINERGI MEWUJUDKAN CIAMIS MAJU DAN BERKELANJUTAN",
    desc: "",
    button: "Lihat Statistik",
    image: "/images/hero1.svg",
    backgroundImage: "/images/bg-footer.svg",
    bgColor: "linear-gradient(to right, #08225C, #0E3B8C)",
  };

  const [showStatistik, setShowStatistik] = useState(false);

  return (
    <section
      id="hero"
      className="text-white relative overflow-hidden w-full min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `${slide.bgColor}, url(${slide.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8 w-full relative z-10">
        {/* 🔹 Bagian teks */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-1/2 text-center md:text-left space-y-5 mt-24 md:mt-0"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
            {slide.title}
          </h1>

          {slide.desc && (
            <p className="text-base md:text-lg text-gray-200 font-light leading-relaxed">
              {slide.desc}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-6">
            <button
              onClick={() => setShowStatistik(true)}
              className="px-6 py-3 bg-[#00C18B] hover:bg-[#00a576] text-white font-semibold rounded-full shadow-md transition-all transform hover:scale-105"
            >
              {slide.button}
            </button>
          </div>
        </motion.div>

        {/* 🔹 Gambar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0"
        >
          <div className="relative rounded-2xl overflow-hidden border border-[#00C18B]/40 bg-white/10 backdrop-blur-sm p-3 max-w-sm w-full">
            <Image
              src={slide.image}
              alt={slide.title}
              width={400}
              height={250}
              className="rounded-xl object-contain w-full h-auto drop-shadow-lg"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* 🔹 Modal Statistik */}
      {showStatistik && (
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center backdrop-blur-sm p-4">
          <div className="bg-gradient-to-r from-[#0E3B8C] to-[#08225C] rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative shadow-2xl p-6 md:p-8 animate-fadeIn">
            <button
              onClick={() => setShowStatistik(false)}
              className="absolute top-3 right-3 text-white hover:text-red-400 text-2xl font-bold transition"
            >
              ✕
            </button>

            <StatistikSection />
          </div>
        </div>
      )}
    </section>
  );
}
