"use client";

import {type ComponentType, useMemo, useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  Layers,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Nilai = {
  title: string;
  shortDesc: string;
  detail: string;
  color: string;
  icon: ComponentType<{size?: number; className?: string}>;
};

type Roadmap = {
  year: string;
  title: string;
  text: string;
  status: "Selesai" | "Berjalan" | "Rencana";
};

export default function TentangPage() {
  const nilaiUtama: Nilai[] = [
    {
      title: "Layanan Satu Pintu",
      shortDesc: "Semua layanan publik digital dalam satu akses.",
      detail:
        "Masyarakat dapat menemukan berbagai layanan prioritas daerah secara ringkas tanpa harus berpindah banyak kanal.",
      color: "from-[#1E3A8A] to-[#2563EB]",
      icon: Layers,
    },
    {
      title: "Integrasi",
      shortDesc: "Data dan layanan terhubung lintas perangkat daerah.",
      detail:
        "Arsitektur integrasi mempercepat koordinasi antar OPD agar proses layanan lebih cepat, konsisten, dan transparan.",
      color: "from-[#065F46] to-[#10B981]",
      icon: Globe,
    },
    {
      title: "Kolaborasi",
      shortDesc: "Pemerintah, masyarakat, dan komunitas bergerak bersama.",
      detail:
        "Sawala mendorong keterlibatan publik melalui informasi yang jelas, umpan balik terbuka, dan ruang kolaborasi digital.",
      color: "from-[#7C3AED] to-[#A855F7]",
      icon: Users,
    },
    {
      title: "Inovasi",
      shortDesc: "Pembaruan layanan berbasis kebutuhan warga.",
      detail:
        "Setiap pengembangan diprioritaskan pada kemudahan akses, pengalaman pengguna, dan kebermanfaatan yang terukur.",
      color: "from-[#C2410C] to-[#F97316]",
      icon: Zap,
    },
  ];

  const roadmap: Roadmap[] = [
    {
      year: "2025",
      title: "Inisiasi Platform",
      text: "Peluncuran fondasi Sawala sebagai kanal terpadu layanan digital Ciamis.",
      status: "Selesai",
    },
    {
      year: "2026",
      title: "Integrasi Lintas OPD",
      text: "Sinkronisasi layanan prioritas antar perangkat daerah dan penyelarasan alur layanan.",
      status: "Berjalan",
    },
    {
      year: "2027",
      title: "Personalisasi Layanan",
      text: "Pengembangan layanan mobile dan otomasi cerdas untuk pengalaman warga yang lebih adaptif.",
      status: "Rencana",
    },
  ];

  const [activeNilai, setActiveNilai] = useState(0);
  const [activeRoadmap, setActiveRoadmap] = useState(1);
  const [activePilar, setActivePilar] = useState<"Visi" | "Misi">("Visi");

  const statusColor = useMemo(
    () => ({
      Selesai: "bg-emerald-100 text-emerald-700 border-emerald-200",
      Berjalan: "bg-blue-100 text-blue-700 border-blue-200",
      Rencana: "bg-orange-100 text-orange-700 border-orange-200",
    }),
    []
  );

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white">
      <Navbar />

      <section className="relative isolate min-h-[72vh] overflow-hidden px-6 pt-20 pb-16 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#34d399_0%,_transparent_30%),radial-gradient(circle_at_bottom_right,_#60a5fa_0%,_transparent_30%),linear-gradient(115deg,_#0b1f4f,_#153f9f)]" />

        <motion.div
          className="absolute -top-8 left-8 h-48 w-48 rounded-full border border-white/20"
          animate={{rotate: 360}}
          transition={{duration: 16, repeat: Infinity, ease: "linear"}}
        />
        <motion.div
          className="absolute bottom-10 right-10 h-28 w-28 rounded-full bg-white/10 blur-xl"
          animate={{y: [0, -14, 0], x: [0, -10, 0]}}
          transition={{duration: 5, repeat: Infinity, ease: "easeInOut"}}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div>
            <motion.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5}}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur"
            >
              <Sparkles size={15} className="text-emerald-300" />
              Sistem Aplikasi dan Wadah Layanan Ciamis
            </motion.div>

            <motion.h1
              initial={{opacity: 0, y: 24}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.6, delay: 0.1}}
              className="text-4xl font-bold leading-tight md:text-5xl"
            >
              Tentang <span className="text-emerald-300">Sawala</span>
            </motion.h1>

            <motion.p
              initial={{opacity: 0, y: 24}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.6, delay: 0.2}}
              className="mt-5 max-w-xl text-base leading-relaxed text-blue-100 md:text-lg"
            >
              Sawala adalah platform layanan digital terpadu Pemerintah Kabupaten
              Ciamis untuk menghadirkan pelayanan yang cepat, mudah diakses, dan
              berorientasi pada kebutuhan masyarakat.
            </motion.p>

            <motion.div
              initial={{opacity: 0, y: 18}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.6, delay: 0.3}}
              className="mt-8 flex flex-wrap gap-3"
            >
              {["Transparan", "Efisien", "Inklusif"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm"
                >
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{opacity: 0, y: 24}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.7, delay: 0.25}}
            className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur"
          >
            <p className="text-sm uppercase tracking-wide text-blue-100">
              Sorotan Komitmen
            </p>
            <div className="mt-5 space-y-4">
              {[
                {
                  icon: ShieldCheck,
                  title: "Keamanan Data",
                  text: "Menerapkan prinsip perlindungan data dan tata kelola layanan digital.",
                },
                {
                  icon: Rocket,
                  title: "Peningkatan Berkelanjutan",
                  text: "Evaluasi rutin untuk memastikan layanan tetap relevan dan responsif.",
                },
                {
                  icon: CheckCircle2,
                  title: "Akses Mudah",
                  text: "Antarmuka sederhana agar layanan dapat digunakan oleh berbagai lapisan warga.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{opacity: 0, x: 15}}
                  animate={{opacity: 1, x: 0}}
                  transition={{delay: 0.4 + idx * 0.1}}
                  className="flex items-start gap-3 rounded-xl bg-white/10 p-3"
                >
                  <item.icon size={18} className="mt-0.5 text-emerald-300" />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-blue-100">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <motion.div
          initial={{opacity: 0, y: 24}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl font-bold text-[#0E3B8C]">Arah Pengembangan</h2>
          <p className="mx-auto mt-3 max-w-3xl text-gray-600">
            Pilar utama Sawala dirancang agar transformasi digital berjalan
            terukur, human-centered, dan berkelanjutan.
          </p>
        </motion.div>

        <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-4 shadow-sm md:p-6">
          <div className="mb-5 flex w-full flex-wrap gap-2">
            {(["Visi", "Misi"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setActivePilar(item)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                  activePilar === item
                    ? "bg-[#0E3B8C] text-white"
                    : "bg-white text-[#0E3B8C] hover:bg-blue-100"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activePilar}
              initial={{opacity: 0, y: 12}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -10}}
              transition={{duration: 0.25}}
              className="rounded-xl bg-white p-5"
            >
              {activePilar === "Visi" ? (
                <p className="text-gray-700 leading-relaxed">
                  Menjadi ekosistem layanan digital daerah yang terintegrasi,
                  dipercaya masyarakat, dan mampu mendorong kualitas hidup Wargi
                  Ciamis melalui layanan publik yang cepat dan adaptif.
                </p>
              ) : (
                <ul className="space-y-3 text-gray-700">
                  {[
                    "Menyederhanakan akses layanan publik melalui satu pintu digital.",
                    "Memperkuat kolaborasi lintas OPD dengan integrasi data dan proses.",
                    "Mendorong budaya inovasi pelayanan berbasis kebutuhan masyarakat.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 size={18} className="mt-0.5 text-emerald-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <motion.h3
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          className="mb-8 text-2xl font-bold text-[#0E3B8C]"
        >
          Nilai Utama Sawala
        </motion.h3>

        <div className="grid gap-4 md:grid-cols-2">
          {nilaiUtama.map((item, index) => {
            const Icon = item.icon;
            const active = activeNilai === index;
            return (
              <motion.button
                key={item.title}
                type="button"
                onClick={() => setActiveNilai(index)}
                whileHover={{y: -4}}
                className={`rounded-2xl p-[1px] text-left ${
                  active ? "shadow-xl" : "shadow-sm"
                }`}
              >
                <div
                  className={`h-full rounded-2xl bg-gradient-to-br ${item.color} p-6 text-white transition`}
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Icon size={22} />
                      <h4 className="font-semibold">{item.title}</h4>
                    </div>
                    {active && <Star size={18} className="text-yellow-200" />}
                  </div>
                  <p className="text-sm text-white/90">{item.shortDesc}</p>
                </div>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeNilai}
            initial={{opacity: 0, y: 16}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -12}}
            transition={{duration: 0.3}}
            className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-[#0E3B8C]">
              Detail Nilai
            </p>
            <p className="mt-2 text-gray-700">{nilaiUtama[activeNilai].detail}</p>
          </motion.div>
        </AnimatePresence>
      </section>

      <section className="bg-[#F6F9FF] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <motion.h3
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            className="mb-8 text-2xl font-bold text-[#0E3B8C]"
          >
            Roadmap Pengembangan
          </motion.h3>

          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-3">
              {roadmap.map((item, idx) => {
                const active = activeRoadmap === idx;
                return (
                  <button
                    key={item.year}
                    type="button"
                    onClick={() => setActiveRoadmap(idx)}
                    className={`w-full rounded-xl border p-4 text-left transition ${
                      active
                        ? "border-[#0E3B8C] bg-white shadow"
                        : "border-blue-100 bg-white/70 hover:border-blue-300"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-[#0E3B8C]">{item.year}</p>
                      <span
                        className={`rounded-full border px-2 py-1 text-xs ${statusColor[item.status]}`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{item.title}</p>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.article
                key={roadmap[activeRoadmap].year}
                initial={{opacity: 0, x: 20}}
                animate={{opacity: 1, x: 0}}
                exit={{opacity: 0, x: -16}}
                transition={{duration: 0.28}}
                className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm"
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-500">
                  Tahun {roadmap[activeRoadmap].year}
                </p>
                <h4 className="mt-2 text-xl font-bold text-[#0E3B8C]">
                  {roadmap[activeRoadmap].title}
                </h4>
                <p className="mt-3 leading-relaxed text-gray-700">
                  {roadmap[activeRoadmap].text}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0E3B8C]">
                  Arah berikutnya
                  <ArrowRight size={16} />
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <motion.h3
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          className="text-2xl font-bold text-[#0E3B8C] md:text-3xl"
        >
          Komitmen Untuk Pelayanan Publik Modern
        </motion.h3>
        <motion.p
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          transition={{delay: 0.1}}
          viewport={{once: true}}
          className="mx-auto mt-5 max-w-2xl text-gray-600"
        >
          Sawala dikembangkan sebagai fondasi Ciamis Digital: menghadirkan
          layanan yang informatif, kolaboratif, dan berdampak nyata untuk warga.
        </motion.p>
      </section>

      <Footer />
    </main>
  );
}
