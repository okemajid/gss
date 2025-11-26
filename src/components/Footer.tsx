"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Globe,
} from "lucide-react";

const slide = {
  backgroundImage: "/images/bg-footer.svg",
  bgColor: "linear-gradient(to right, #08225C, #0E3B8C)",
};

export default function Footer() {
  return (
   <footer className="w-full bg-gradient-to-r from-[#08225C]/90 to-[#0E3B8C]/90 shadow-lg backdrop-blur-lg text-white py-12 px-6"
   style={{
        backgroundImage: `${slide.bgColor}, url(${slide.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
      }}
    >
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 md:gap-16 items-start">
    
    {/* Logo + Nama */}
    <div className="flex flex-col items-start text-left gap-3">
      <img src="/images/ciamis.svg" alt="Logo Ciamis" className="w-16 h-auto" />

      <h2 className="text-xl font-bold">Sawala</h2>
      <p className="text-sm text-gray-300 max-w-sm">
        Platform layanan digital terpadu untuk masyarakat di Kabupaten Ciamis.
      </p>
    </div>

    {/* Informasi */}
    <div className="flex flex-col text-left gap-3">
      <h3 className="font-semibold text-lg">Informasi</h3>
      <a href="/" className="text-gray-300 hover:text-white text-sm">Home</a>
      <a href="/daftar-aplikasi" className="text-gray-300 hover:text-white text-sm">Daftar Aplikasi</a>
      <a href="/tentang" className="text-gray-300 hover:text-white text-sm">Tentang</a>
    </div>

    {/* Kontak */}
    <div className="flex flex-col text-left gap-3">
      <h3 className="font-semibold text-lg">Kontak</h3>
      <p className="text-gray-300 text-sm max-w-xs leading-relaxed">
        Dinas Komunikasi dan Informatika Kab. Ciamis <br />
        Jl. Jend. Sudirman No.220, Sindangrasa <br />
        (0265) 773000 <br />
        diskominfo@ciamiskab.go.id
      </p>
    </div>

    {/* Media Sosial */}
    <div className="flex flex-col text-left gap-3">
      <h3 className="font-semibold text-lg">Ikuti Kami</h3>

      <div className="flex gap-4">
        <a href="#" className="hover:text-blue-400"><i className="fab fa-facebook"></i></a>
        <a href="#" className="hover:text-pink-400"><i className="fab fa-instagram"></i></a>
        <a href="#" className="hover:text-blue-300"><i className="fab fa-twitter"></i></a>
        <a href="#" className="hover:text-gray-300"><i className="fab fa-globe"></i></a>
      </div>
    </div>

  </div>

  <div className="mt-10 text-gray-400 text-xs text-left">
    © {new Date().getFullYear()} Dinas Komunikasi dan Informatika – Pemerintah Kabupaten Ciamis
  </div>
</footer>

  );
}
