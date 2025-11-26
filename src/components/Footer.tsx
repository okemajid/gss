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
    <footer
      className="w-full bg-gradient-to-r from-[#08225C]/90 to-[#0E3B8C]/90 shadow-lg backdrop-blur-lg text-white py-12 px-3"
      style={{
        backgroundImage: `${slide.bgColor}, url(${slide.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col  justify-center md:flex-row gap-14 md:gap-16 items-start">
        
        {/* Logo + Nama */}
        <div className="flex items-start gap-4">
          {/* Logo */}
          <Image
            src="/images/ciamis.svg"
            alt="Logo Ciamis"
            width={64}
            height={64}
            className="w-16 h-auto flex-none"
          />

          {/* Teks di kanan logo */}
          <div className="flex flex-col text-left min-w-[300px]">
            <h2 className="text-xl font-bold">Sawala</h2>
            <p className="text-sm text-gray-300 max-w-sm">
              Platform layanan digital terpadu untuk masyarakat di Kabupaten Ciamis.
            </p>
          </div>
        </div>


        {/* Informasi */}
        <div className="flex flex-col text-left gap-4 min-w-[220px]">
          <h3 className="font-semibold text-lg">Informasi</h3>

          <Link href="/" className="text-gray-300 hover:text-white text-sm">
            Home
          </Link>
          <Link
            href="/daftar-aplikasi"
            className="text-gray-300 hover:text-white text-sm"
          >
            Daftar Aplikasi
          </Link>
          <Link
            href="/tentang"
            className="text-gray-300 hover:text-white text-sm"
          >
            Tentang
          </Link>
        </div>

        {/* Kontak */}
        <div className="flex flex-col text-left gap-4 min-w-[400px]">
          <h3 className="font-semibold text-lg">Kontak</h3>

          <div className="flex items-start gap-3 text-gray-300 text-sm">
            <MapPin size={16} />
            <p>
              Dinas Komunikasi dan Informatika Kab. Ciamis <br />
              Jl. Jend. Sudirman No.220, Sindangrasa
            </p>
          </div>

          <div className="flex items-center gap-3 text-gray-300 text-sm">
            <Phone size={16} />
            <p>(0265) 773000</p>
          </div>

          <div className="flex items-center gap-3 text-gray-300 text-sm">
            <Mail size={16} />
            <p>diskominfo@ciamiskab.go.id</p>
          </div>
        </div>

        {/* Media Sosial */}
        <div className="flex flex-col text-left gap-3">
          <h3 className="font-semibold text-lg">Ikuti Kami</h3>

          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-400">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-pink-400">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-blue-300">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-gray-300">
              <Globe size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-gray-400 text-xs text-center">
        © {new Date().getFullYear()} Dinas Komunikasi dan Informatika – Pemerintah Kabupaten Ciamis
      </div>
    </footer>
  );
}
