"use client";

import {useEffect} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {ExternalLink, Globe, Layers3, UserRound, X} from "lucide-react";
import Image from "next/image";

export interface AppDetailData {
  nomor_registrasi: string;
  nama_aplikasi: string;
  domain_aplikasi: string;
  kategori: string;
  pengguna: string;
  deskripsi: string;
  url: string;
  logo?: string;
}

interface DetailCardProps {
  data: AppDetailData | null;
  onClose: () => void;
}

export default function DetailCard({data, onClose}: DetailCardProps) {
  useEffect(() => {
    if (!data) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [data, onClose]);

  return (
    <AnimatePresence>
      {data && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-[2px]"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.2}}
          onClick={onClose}
        >
          <motion.article
            role="dialog"
            aria-modal="true"
            aria-label={`Detail ${data.nama_aplikasi}`}
            initial={{opacity: 0, scale: 0.94, y: 18}}
            animate={{opacity: 1, scale: 1, y: 0}}
            exit={{opacity: 0, scale: 0.95, y: 12}}
            transition={{type: "spring", stiffness: 260, damping: 22}}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden bg-gradient-to-r from-[#0E3B8C] to-[#1E5FD8] p-6 text-white">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full border border-white/20" />
              <div className="absolute right-2 bottom-2 h-16 w-16 rounded-full bg-white/10 blur-lg" />

              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 rounded-full border border-white/30 bg-white/10 p-1.5 text-white transition hover:bg-white/20"
                aria-label="Tutup detail"
              >
                <X size={16} />
              </button>

              <div className="flex items-start gap-4 pr-8">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/15">
                  {data.logo ? (
                    <Image
                      src={data.logo}
                      alt={data.nama_aplikasi}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  ) : (
                    <Layers3 size={28} className="text-blue-100" />
                  )}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-blue-100">
                    Detail Aplikasi
                  </p>
                  <h2 className="mt-1 text-xl font-bold leading-snug">
                    {data.nama_aplikasi}
                  </h2>
                  <p className="mt-1 text-sm text-blue-100">
                    Registrasi: {data.nomor_registrasi}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-blue-100 bg-blue-50 p-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-blue-500">
                    Domain
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-sm text-blue-900">
                    <Globe size={15} />
                    <span className="truncate">{data.domain_aplikasi || "-"}</span>
                  </div>
                </div>

                <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-emerald-600">
                    Pengguna
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-sm text-emerald-900">
                    <UserRound size={15} />
                    <span className="truncate">{data.pengguna || "-"}</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800">Deskripsi</p>
                <p className="mt-1 leading-relaxed text-slate-600">
                  {data.deskripsi || "Deskripsi belum tersedia."}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4">
                <span className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700">
                  {data.kategori || "Umum"}
                </span>

                {data.url ? (
                  <a
                    href={data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:brightness-105"
                  >
                    Kunjungi Aplikasi
                    <ExternalLink size={15} />
                  </a>
                ) : (
                  <span className="text-xs text-slate-500">URL aplikasi belum tersedia.</span>
                )}
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
