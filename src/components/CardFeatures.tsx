"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight,
  CloudCogIcon,
  RouterIcon,
  SquareCodeIcon,
  Globe,
} from "lucide-react";
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

  const getDefaultIcon = (domain?: string) => {
    const lower = domain?.toLowerCase() || "";
    if (lower.includes("cloud"))
      return <CloudCogIcon size={26} className="text-[#0E3B8C]" />;
    if (lower.includes("desktop"))
      return <SquareCodeIcon size={26} className="text-[#0E3B8C]" />;
    if (lower.includes("mobile"))
      return <RouterIcon size={26} className="text-[#0E3B8C]" />;
    return <Globe size={26} className="text-[#0E3B8C]" />;
  };

  return (
    <section id="daftar-aplikasi">
      <Link href={url} target="_blank">
        <motion.div
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
          className="relative flex flex-col justify-between
                    rounded-2xl bg-gradient-to-br from-[#EAF3FF] to-[#D9E8FF]
                    hover:from-[#00008B] hover:to-[#00008B]
                    border border-[#C5DBFF]
                    shadow-md hover:shadow-blue-200/60
                    transition-all duration-300 cursor-pointer
                    w-[160px] md:w-[240px] h-[290px] p-4 group"
        >
          {/* 🔹 Logo / Ikon */}
          <div className="flex justify-center mb-3">
            <div className="bg-white p-2.5 rounded-xl shadow-sm border border-[#E0EAFF] flex items-center justify-center w-[45px] h-[45px]">
              {logo ? (
                <Image
                  src={logo}
                  alt={nama_aplikasi || "Logo"}
                  width={40}
                  height={40}
                  className="rounded-md object-contain"
                />
              ) : (
                getDefaultIcon(domain_aplikasi)
              )}
            </div>
          </div>

          {/* 🔹 Nama Aplikasi */}
          <h3
            className="text-center text-[#0E3B8C] text-sm font-semibold mb-1 line-clamp-2
                       transition-colors duration-300 group-hover:text-white"
          >
            {nama_aplikasi || "Tanpa Nama"}
          </h3>

          {/* 🔹 Deskripsi */}
          {deskripsi && (
            <p
              className="text-center text-gray-600 text-[11px] mb-1 line-clamp-2 leading-snug
                         transition-colors duration-300 group-hover:text-white"
            >
              {deskripsi}
            </p>
          )}

          {/* 🔹 Pengguna */}
          {pengguna && (
            <p
              className="text-[10px] text-gray-500 italic mb-1 text-center
                         transition-colors duration-300 group-hover:text-white"
            >
              {pengguna}
            </p>
          )}

          {/* 🔹 Badge Domain */}
          {domain_aplikasi && (
            <div className="flex justify-center mb-2">
              <span
                className={`text-[10px] font-medium px-2.5 py-1 rounded-full border transition-all duration-300 ${getBadgeColor(
                  domain_aplikasi
                )}`}
              >
                {domain_aplikasi}
              </span>
            </div>
          )}

          {/* 🔹 No Registrasi */}
          <div
            className="text-[10px] text-gray-600 border-t border-[#CFDCF8] w-full text-center pt-1.5 mt-auto
                       transition-colors duration-300 group-hover:text-white"
          >
            No. Registrasi: {nomor_registrasi}
          </div>

          {/* 🔹 Tombol Panah */}
          <motion.div
            className="absolute bottom-3 right-3"
            animate={{ rotate: 0 }}
            whileHover={{ rotate: 45 }}
            transition={{ type: "spring", stiffness: 250, damping: 15 }}
          >
            <div
              className="w-7 h-7 flex items-center justify-center
                         rounded-full border-2 border-[#0E3B8C]
                         text-[#0E3B8C] bg-white
                         transition-all duration-300
                         group-hover:bg-white/20 group-hover:text-white
                         group-hover:border-white shadow-sm"
            >
              <ArrowUpRight size={14} />
            </div>
          </motion.div>
        </motion.div>
      </Link>
    </section>
  );
}
