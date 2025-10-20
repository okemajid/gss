"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroCarousel() {
  const slide = {
    id: 1,
    title:
      "SINERGI MEWUJUDKAN CIAMIS MAJU DAN BERKELANJUTAN ",
    desc:
      "",
    button: "Daftar Aplikasi",
    image: "/images/hero1.svg",
    backgroundImage: "/images/bg-footer.svg", // 🔹 SVG transparan
    bgColor: "linear-gradient(to right, #08225C, #0E3B8C)", // 🔹 gradasi
  };

  return (
    <section
      id="hero"
      className="text-white relative overflow-hidden w-full h-screen flex items-center justify-center"
      style={{
        backgroundImage: `${slide.bgColor}, url(${slide.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay", // 🔹 membuat warna & gambar menyatu lembut
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12 w-full relative z-10">
        {/* 🔹 Teks kiri */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2 space-y-6 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg">
            {slide.title}
          </h1>
          <h6 className="text-1xl md:text-2xl font-bold leading-tight drop-shadow-lg">
            {slide.desc}
          </h6>
          <button 
            onClick={() => {
              const section = document.getElementById("daftar-aplikasi");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="bg-[#00C18B] hover:bg-[#00a576] text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg"
          >
            {slide.button }
          </button>
        </motion.div>

        {/* 🔹 Gambar kanan */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2 relative flex justify-center"
        >
          <div className="relative rounded-2xl overflow-hidden border border-[#00C18B] p-2 max-w-md w-full bg-white/10 backdrop-blur-sm">
            <Image
              src={slide.image}
              alt={slide.title}
              width={200}
              height={100}
              className="rounded-xl object-cover w-full h-auto"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
