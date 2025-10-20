"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Cloud, Monitor, Smartphone, Globe, RouterIcon, CloudCogIcon, SquareCodeIcon } from "lucide-react";
import Image from "next/image";

interface CardFeatureProps {
  nomor_registrasi: string;
  domain_aplikasi?: string;
  nama_aplikasi?: string;
  pengguna?: string;
  deskripsi?: string;
  url?: string;
  logo?: string;
}

export default function CardFeature({
  nomor_registrasi,
  domain_aplikasi,
  nama_aplikasi,
  pengguna,
  deskripsi,
  url = "#",
  logo,
}: CardFeatureProps) {
  const getBadgeColor = (domain?: string) => {
    switch (domain?.toLowerCase()) {
      case "aplikasi khusus":
        return "bg-green-100 text-green-700 border-green-300 group-hover:bg-green-600 group-hover:text-white";
      case "aplikasi umum":
        return "bg-orange-100 text-orange-700 border-orange-300 group-hover:bg-orange-600 group-hover:text-white";
      default:
        return "bg-[#DBE8FF] text-[#0E3B8C] border-[#C8DBFF] group-hover:bg-[#0E3B8C] group-hover:text-white";
    }
  };

  // 🔹 Fungsi pilih ikon default sesuai domain
  const getDefaultIcon = (domain?: string) => {
    const lower = domain?.toLowerCase() || "";
    if (lower.includes("cloud")) return <CloudCogIcon size={30} className="text-[#0E3B8C] group-hover:text-black" />;
    if (lower.includes("desktop")) return <SquareCodeIcon size={30} className="text-[#0E3B8C] group-hover:text-black" />;
    if (lower.includes("mobile")) return <RouterIcon size={30} className="text-[#0E3B8C] group-hover:text-black" />;
    if (lower.includes("web")) return <Globe size={30} className="text-[#0E3B8C] group-hover:text-black" />;
    return <Globe size={30} className="text-[#0E3B8C] group-hover:text-black" />;
  };

  return (
   <section
      id="daftar-aplikasi"
    >
      
    <Link href={url} target="_blank">
      <motion.div
        whileHover={{ y: -8, scale: 1.03 }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        className="relative flex flex-col items-center justify-start
                   rounded-2xl bg-gradient-to-br from-[#EAF3FF] to-[#D9E8FF]
                   hover:from-[#00008B] hover:to-[#00008B]
                   border border-[#C5DBFF]
                   shadow-md hover:shadow-blue-200/60
                   transition-all duration-300 cursor-pointer
                   w-[180px] md:w-[270px] min-h-[300px] p-6 group mx-auto"
      >
        {/* 🔹 Logo atau Ikon */}
        <div className="flex justify-center mb-4">
          <div className="bg-white p-3 rounded-xl shadow-sm border border-[#E0EAFF] flex items-center justify-center w-[50px] h-[50px]">
            {logo ? (
              <Image
                src={logo}
                alt={nama_aplikasi || "Logo"}
                width={50}
                height={50}
                className="rounded-md object-contain"
              />
            ) : (
              getDefaultIcon(domain_aplikasi)
            )}
          </div>
        </div>

        {/* 🔹 Nama Aplikasi */}
        <h3
          className="text-center text-[#0E3B8C] text-base font-semibold mb-2 line-clamp-2
                     transition-colors duration-300 group-hover:text-white"
        >
          {nama_aplikasi || "Tanpa Nama"}
        </h3>

        {/* 🔹 Deskripsi */}
        {deskripsi && (
          <p
            className="text-center text-gray-600 text-xs mb-3 line-clamp-2 leading-snug
                       transition-colors duration-300 group-hover:text-white"
          >
            {deskripsi}
          </p>
        )}

        {/* 🔹 Pengguna */}
        {pengguna && (
          <p
            className="text-[11px] text-gray-500 italic mb-2 text-center
                       transition-colors duration-300 group-hover:text-white"
          >
            {pengguna}
          </p>
        )}

        {/* 🔹 Badge Domain */}
        {domain_aplikasi && (
          <div className="flex justify-center mb-4">
            <span
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-300 ${getBadgeColor(
                domain_aplikasi
              )}`}
            >
              {domain_aplikasi}
            </span>
          </div>
        )}

        {/* 🔹 No Registrasi */}
        <div
          className="text-[11px] text-gray-600 border-t border-[#CFDCF8] w-full text-center pt-2 mt-auto
                     transition-colors duration-300 group-hover:text-white"
        >
          No. Registrasi: {nomor_registrasi}
        </div>

        {/* 🔹 Tombol Panah */}
        <motion.div
          className="absolute bottom-4 right-4"
          animate={{ rotate: 0 }}
          whileHover={{ rotate: 45 }}
          transition={{ type: "spring", stiffness: 250, damping: 15 }}
        >
          <div
            className="w-8 h-8 flex items-center justify-center
                       rounded-full border-2 border-[#0E3B8C]
                       text-[#0E3B8C] bg-white
                       transition-all duration-300
                       group-hover:bg-white/20 group-hover:text-white
                       group-hover:border-white shadow-sm"
          >
            <ArrowUpRight size={16} />
          </div>
        </motion.div>
      </motion.div>
    </Link>
  </section>
  );
}
