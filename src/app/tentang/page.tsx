"use client";

import { motion } from "framer-motion";
import { Globe, Layers, Users, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TentangPage() {
  const nilaiUtama = [
    {
      title: "Layanan Satu Pintu",
      desc: "Akses berbagai layanan digital Pemerintah Kabupaten Ciamis dalam satu genggaman.",
      color: "bg-[#2F68FF]",
      icon: <Layers size={30} />,
    },
    {
      title: "Integrasi",
      desc: "Mengoptimalkan layanan publik yang efisien dan saling terhubung antar instansi.",
      color: "bg-[#01B77B]",
      icon: <Globe size={30} />,
    },
    {
      title: "Kolaborasi",
      desc: "Mendorong sinergi antara pemerintah, masyarakat, dan pelaku digital untuk kemajuan bersama.",
      color: "bg-[#8A52F3]",
      icon: <Users size={30} />,
    },
    {
      title: "Inovasi",
      desc: "Meningkatkan kualitas pelayanan publik melalui ide dan teknologi terbaru.",
      color: "bg-[#FF8A00]",
      icon: <Zap size={30} />,
    },
  ];
  
  const slide = {
    backgroundImage: "/images/bg-footer.svg",
    bgColor: "linear-gradient(to right, #08225C, #0E3B8C)",
  };


  return (
    <main className="min-h-screen w-full flex flex-col items-center overflow-x-hidden bg-white">
      {/* 🔹 Navbar */}
      <Navbar />

      {/* 🔹 Hero Section */}
      <section className="relative w-full min-h-[50vh] flex flex-col justify-center items-center text-center text-white bg-gradient-to-r from-[#08225C] to-[#0E3B8C] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/bg-footer.svg')] bg-cover bg-center opacity-80"></div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4 z-10"
        >
          Tentang <span className="text-[#00C18B]">Sawala</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-6xl text-gray-200 text-lg leading-relaxed z-10 px-6"
        >
          SAWALA adalah singkatan dari Sistem Aplikasi dan Wadah Layanan Ciamis,
          wadah layanan digital terpadu Kabupaten Ciamis untuk menghadirkan
          pelayanan publik yang efisien, transparan, dan mudah diakses oleh
          masyarakat.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-6xl text-gray-200 text-lg leading-relaxed z-10 px-6 mt-4"
        >
          Nama Sawala berasal dari bahasa Sunda yang berarti{" "}
          <span className="italic">musyawarah,</span> tempat berdiskusi dan
          mencapai mufakat. Makna ini mencerminkan semangat kolaborasi dan
          kebersamaan dalam membangun transformasi digital di Kabupaten Ciamis.
        </motion.p>
      </section>

      {/* 🔹 Section Deskripsi */}
      <section className="w-full max-w-6xl px-6 py-20 text-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-[#0E3B8C] mb-4">
            Transformasi Digital untuk Wargi Ciamis
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 max-w-3xl mx-auto">
            <span className="font-semibold text-[#0E3B8C]">Sawala</span> lahir sejak 2025
            untuk menyatukan seluruh layanan digital Pemerintah Kabupaten Ciamis
            dalam satu platform terpadu. Kami berkomitmen menghadirkan sistem
            pelayanan publik yang efisien, transparan, dan inovatif bagi seluruh
            masyarakat.
          </p>
        </motion.div>

      {/* 🔹 Nilai Utama ala JAKI */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {nilaiUtama.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl text-white p-8 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all ${item.color} min-h-[240px] flex flex-col justify-between`}
            >
              {/* 🔹 Pola titik-titik kiri bawah */}
              <div className="absolute bottom-4 left-4 opacity-15">
                <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
                  {[...Array(8)].map((_, row) =>
                    [...Array(8)].map((_, col) => (
                      <circle
                        key={`${row}-${col}`}
                        cx={col * 12}
                        cy={row * 12}
                        r="2"
                        fill="white"
                      />
                    ))
                  )}
                </svg>
              </div>

              {/* 🔹 Konten */}
              <div className="relative z-10">
                <h1 className="text-xl font-semibold mb-2">{item.title}</h1>
                <h3 className="text-md leading-relaxed opacity-90">{item.desc}</h3>
              </div>

              {/* 🔹 Icon di pojok kanan bawah */}
              <div className="absolute bottom-6 right-6 opacity-40">
                {item.icon}
              </div>
            </motion.div>
          ))}
        </motion.div>


      </section>

      {/* 🔹 Komitmen Kami */}
      <section className="w-full bg-[#F5F8FF] py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-[#0E3B8C] mb-4"
          >
            Komitmen Kami
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed"
          >
            Kami percaya bahwa teknologi digital adalah jembatan menuju
            pelayanan publik yang lebih mudah diakses, inklusif, dan terpercaya.
            Melalui{" "}
            <span className="font-semibold text-[#00C18B]">Sawala</span>, kami
            berupaya mewujudkan Ciamis Digital yang inklusif dan berdaya saing,
            serta menjadi wadah kolaborasi bagi seluruh instansi dan masyarakat
            dalam menciptakan inovasi untuk kemajuan daerah.
          </motion.p>
        </div>
      </section>

      {/* 🔹 Footer */}
      <Footer />
    </main>
  );
}
