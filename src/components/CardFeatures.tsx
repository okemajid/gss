"use client";

import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {Star, ExternalLink, Eye} from "lucide-react";
import Image from "next/image";
import {createAvatar} from "@dicebear/core";
import * as identicon from "@dicebear/identicon";
import {type AppDetailData} from "@/components/DetailCard";

interface CardFeatureProps {
  nomor_registrasi: string;
  domain_aplikasi?: string;
  nama_aplikasi?: string;
  pengguna?: string;
  deskripsi?: string;
  url?: string;
  categories?: string;
  kategori?: string;
  onDetail?: (data: AppDetailData) => void;
}

type CategoryTheme = {
  gradient: string;
  accent: string;
};

function getCategoryTheme(categoryRaw: string): CategoryTheme {
  const category = categoryRaw.toLowerCase();

  if (category.includes("kesehatan")) {
    return {
      gradient: "from-rose-100 via-pink-100 to-orange-100",
      accent: "bg-rose-300/40",
    };
  }

  if (category.includes("pendidikan")) {
    return {
      gradient: "from-indigo-100 via-blue-100 to-sky-100",
      accent: "bg-indigo-300/40",
    };
  }

  if (category.includes("keuangan") || category.includes("pajak")) {
    return {
      gradient: "from-amber-100 via-orange-100 to-yellow-100",
      accent: "bg-amber-300/40",
    };
  }

  if (category.includes("keamanan") || category.includes("aduan")) {
    return {
      gradient: "from-cyan-100 via-sky-100 to-blue-100",
      accent: "bg-cyan-300/40",
    };
  }

  if (category.includes("data") || category.includes("statistik")) {
    return {
      gradient: "from-teal-100 via-emerald-100 to-green-100",
      accent: "bg-emerald-300/40",
    };
  }

  if (category.includes("teknologi") || category.includes("digital")) {
    return {
      gradient: "from-violet-100 via-fuchsia-100 to-indigo-100",
      accent: "bg-violet-300/40",
    };
  }

  if (category.includes("informasi") || category.includes("publikasi")) {
    return {
      gradient: "from-sky-100 via-cyan-100 to-blue-100",
      accent: "bg-sky-300/40",
    };
  }

  return {
    gradient: "from-blue-100 via-slate-100 to-indigo-100",
    accent: "bg-blue-300/40",
  };
}

export default function CardFeature(props: CardFeatureProps) {
  const {
    nomor_registrasi,
    domain_aplikasi,
    nama_aplikasi,
    pengguna,
    deskripsi,
    url,
    categories,
    kategori,
    onDetail,
  } = props;

  const currentCategory = categories ?? kategori ?? "";
  const categoryTheme = getCategoryTheme(currentCategory || "umum");
  const featured = currentCategory.toLowerCase() === "unggulan";
  const safeUrl =
    url && url.startsWith("http") ? url : url ? `https://${url}` : null;

  const payload: AppDetailData = {
    nomor_registrasi,
    domain_aplikasi: domain_aplikasi ?? "-",
    nama_aplikasi: nama_aplikasi ?? "Tanpa Nama",
    pengguna: pengguna ?? "-",
    deskripsi: deskripsi ?? "Deskripsi belum tersedia.",
    url: safeUrl ?? "",
    kategori: currentCategory || "Umum",
  };

  // Generate AI-style avatar berdasarkan nama aplikasi
  const [avatarUri, setAvatarUri] = useState<string>("");

  useEffect(() => {
    const generateAvatar = async () => {
      const uri = await createAvatar(identicon, {
        seed: nama_aplikasi || "app",
      }).toDataUri();

      setAvatarUri(uri);
    };

    generateAvatar();
  }, [nama_aplikasi]);

  return (
    <motion.div
      whileHover={{y: -6}}
      whileTap={{scale: 0.985}}
      transition={{duration: 0.2}}
      className="group w-[260px] overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/20"
    >
      {/* HEADER */}
      <div
        className={`relative flex h-36 items-center justify-center bg-gradient-to-br ${categoryTheme.gradient}`}
      >
        {/* AI Generated Illustration */}
        <motion.div
          animate={{rotate: 360}}
          transition={{duration: 40, repeat: Infinity, ease: "linear"}}
          className="absolute h-28 w-28 rounded-full border border-white/40 border-dashed"
        />

        <Image
          src={avatarUri}
          alt={nama_aplikasi || "Ilustrasi aplikasi"}
          width={80}
          height={80}
          className="z-10 object-contain transition-transform duration-300 group-hover:scale-110"
        />

        {featured && (
          <div className="absolute right-3 top-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-2 py-1 text-[10px] text-white">
            Unggulan
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <h3 className="line-clamp-1 font-semibold text-blue-900">
          {nama_aplikasi || "Tanpa Nama"}
        </h3>

        {domain_aplikasi && (
          <span
            className={`mt-1 inline-block rounded-full border px-2 py-0.5 text-xs font-medium ${
              domain_aplikasi.toLowerCase().includes("khusus")
                ? "border-orange-200 bg-orange-50 text-orange-700"
                : domain_aplikasi.toLowerCase().includes("umum")
                  ? "border-blue-200 bg-blue-50 text-blue-700"
                  : "border-slate-200 bg-slate-50 text-slate-600"
            }`}
          >
            {domain_aplikasi}
          </span>
        )}

        {pengguna && (
          <p className="mt-2 text-xs text-gray-500">
            Pengguna: <span className="font-medium">{pengguna}</span>
          </p>
        )}

        <p className="mt-3 mb-4 line-clamp-2 text-sm text-gray-600">
          {deskripsi || "-"}
        </p>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-gray-700">4.5</span>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDetail?.(payload);
              }}
              className="inline-flex items-center gap-1 rounded-lg border border-blue-200 px-3 py-1.5 text-xs text-blue-700 transition hover:bg-blue-50"
            >
              <Eye size={14} />
              Detail
            </button>

            {safeUrl && (
              <a
                href={safeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1.5 text-xs text-white"
                aria-label={`Buka situs ${nama_aplikasi || "aplikasi"}`}
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
