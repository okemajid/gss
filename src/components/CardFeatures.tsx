"use client";

import {motion} from "framer-motion";
import React, {useState} from "react";
import {
  ArrowUpRight,
  CloudCogIcon,
  RouterIcon,
  SquareCodeIcon,
  Globe,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CardFeatureProps {
  nomor_registrasi: string;
  domain_aplikasi?: string;
  nama_aplikasi?: string;
  pengguna?: string;
  deskripsi?: string;
  url?: string;
  logo?: string;
  categories?: string;
}

export default function CardFeature(props: CardFeatureProps) {
  const {
    nomor_registrasi,
    domain_aplikasi,
    nama_aplikasi,
    pengguna,
    deskripsi,
    url = "#",
    logo = "/images/ciamis.svg",
    categories,
  } = props;

  const [open, setOpen] = useState(false);

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
    <>
      {/* CARD */}
      <motion.div
        onClick={() => setOpen(true)}
        whileTap={{scale: 0.95}}
        whileHover={{y: -6, scale: 1.02}}
        transition={{type: "spring", stiffness: 150, damping: 15}}
        className="
          relative flex flex-col
          rounded-2xl bg-gradient-to-br from-[#EAF3FF] to-[#D9E8FF]
          hover:from-[#08225C]/90 hover:to-[#0E3B8C]/90
          border border-[#C5DBFF]
          shadow-md hover:shadow-blue-200/60
          transition-all duration-300 cursor-pointer
        /* ukuran card */
        w-[170px]          /* mobile */
        h-[230px]

        sm:w-[210px]       /* tablet */
        sm:h-[260px]

        md:w-[210px]       /* desktop / 
        md:h-[260px]

        lg:w-[210px]       /* desktop / 
        lg:h-[260px]

        xl:w-[230px]       /* desktop / 
        xl:h-[270px]
        
        2xl:w-[260px]       /* desktop / 
        2xl:h-[300px]

        flex-none
        rounded-2xl
        p-4 group
        "
      >
        <div className="flex flex-col flex-grow overflow-hidden">
          {/* Logo */}
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

          {/* Nama */}
          <h3 className="text-center text-[#0E3B8C] text-sm font-semibold mb-1 line-clamp-2 group-hover:text-white">
            {nama_aplikasi || "Tanpa Nama"}
          </h3>

          {/* Deskripsi */}
          {deskripsi && (
            <p className="text-center text-gray-600 text-[11px] mb-1 line-clamp-2 leading-snug group-hover:text-white">
              {deskripsi}
            </p>
          )}

          {/* Pengguna */}
          {pengguna && (
            <p className="text-[10px] text-gray-500 italic mb-1 text-center group-hover:text-white">
              {pengguna}
            </p>
          )}

          {/* Badge */}
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
        </div>
        {/* Footer */}
        <div className="text-[10px] text-gray-600 border-t border-[#CFDCF8] w-full text-center pt-1.5 mt-auto group-hover:text-white">
          No. Registrasi: {nomor_registrasi}
        </div>

        {/* Arrow */}
        <div className="absolute bottom-2 right-2">
          <div className="w-7 h-7 flex items-center justify-center rounded-full border-2 border-[#0E3B8C] text-[#0E3B8C] bg-white transition-all duration-300 group-hover:bg-white/20 group-hover:text-white group-hover:border-white shadow-sm">
            <ArrowUpRight size={14} />
          </div>
        </div>
      </motion.div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* CLOSE */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              ✕
            </button>

            <div className="flex">
              {/* ================= LEFT SIDEBAR ================= */}
              <div className="w-[350px] bg-[#EFF6FF] p-6 border-r">
                {/* Logo */}
                <div className="flex justify-center mb-4">
                  <Image
                    src={logo}
                    alt={nama_aplikasi || "Logo"}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>

                {/* Nama */}
                <h2 className="text-center font-semibold text-sm mb-4 leading-snug">
                  {nama_aplikasi}
                </h2>

                {/* Button */}
                <Link
                  href={url}
                  target="_blank"
                  className="block text-center bg-blue-600 border-blue-600 hover:bg-[#0E3B8C]/90
                       text-white py-2 rounded-lg text-sm font-medium"
                >
                  Kunjungi
                </Link>

                {/* Meta */}
                <div className="mt-6 space-y-3 text-xs text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Kategori</span>
                    <span className="flex items-center ml-13">: </span>{" "}
                    {nama_aplikasi}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Nomor Registrasi</span>
                    <span className="flex items-center ml-1">: </span>{" "}
                    {nomor_registrasi}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Domain Aplikasi</span>
                    <span className="flex items-center ml-3">: </span>{" "}
                    {domain_aplikasi}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Nama Pengguna</span>
                    <span className="flex items-center ml-2">: </span>{" "}
                    {pengguna}
                  </div>
                </div>
              </div>

              {/* ================= RIGHT CONTENT ================= */}
              <div className="flex-1 p-6 space-y-6">
                {/* Deskripsi */}
                <div>
                  <h3 className="font-semibold text-sm mb-2">
                    Deskripsi Aplikasi
                  </h3>
                  <div className="bg-gray-100 rounded-xl p-4 text-sm text-gray-700">
                    {deskripsi}
                  </div>
                </div>

                {/* Fitur */}
                <div>
                  <h3 className="font-semibold text-sm mb-2">Fitur</h3>
                  <div className="bg-gray-100 rounded-xl p-4 text-sm max-h-[120px] overflow-y-auto">
                    <ol className="list-decimal pl-5 space-y-1">
                      <li>Data bangunan milik Pemerintah</li>
                      <li>Pengajuan rehab</li>
                      <li>Laporan hasil pelaksanaan rehab</li>
                    </ol>
                  </div>
                </div>

                {/* TABLE INFO */}
                <div className="grid grid-cols-3 text-sm border-t pt-4">
                  <div>
                    <p className="font-semibold">Basis</p>
                    <p>Website</p>
                  </div>
                  <div>
                    <p className="font-semibold">Platform</p>
                    <p>Website</p>
                  </div>
                  <div>
                    <p className="font-semibold">Environment</p>
                    <p>Produksi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
