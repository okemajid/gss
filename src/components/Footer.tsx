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
      className="w-full bg-gradient-to-r from-[#08225C] to-[#0E3B8C] text-white pt-12 pb-8 mt-20"
      style={{
        backgroundImage: `${slide.bgColor}, url(${slide.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* 🔹 Isi utama footer */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* 🔹 Logo & Deskripsi */}
          <div className="text-left sm:text-center md:text-left">
            <div className="flex flex-row items-center justify-start gap-3 mb-4 sm:flex-col md:flex-row">
              <Image
                src="/images/ciamis.svg"
                alt="Logo"
                width={50}
                height={50}
                className="flex-shrink-0"
              />
              <h2 className="text-xl font-semibold flex items-center">Sawala</h2>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              Platform layanan digital terpadu Tatar Galuh untuk memudahkan
              masyarakat mengakses berbagai layanan dan aplikasi di Kabupaten
              Ciamis.
            </p>
          </div>

          {/* 🔹 Navigasi Cepat */}
          <div className="text-left sm:text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 border-b border-[#00C18B] inline-block">
              Informasi
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <Link href="#" className="hover:text-[#00C18B] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#daftar-aplikasi"
                  className="hover:text-[#00C18B] transition"
                >
                  Daftar Aplikasi
                </Link>
              </li>
              <li>
                <Link
                  href="/tentang"
                  className="hover:text-[#00C18B] transition"
                >
                  Tentang
                </Link>
              </li>
            </ul>
          </div>

          {/* 🔹 Kontak */}
          <div className="text-left sm:text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 border-b border-[#00C18B] inline-block">
              Kontak
            </h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex flex-row sm:flex-col md:flex-row items-start sm:items-center md:items-start gap-2 justify-start sm:justify-center md:justify-start">
                <MapPin className="w-4 h-4 text-white mt-1 flex-shrink-0" />
                <span className="max-w-[250px]">
                  Dinas Komunikasi dan Informatika Kab. Ciamis
                  <br />
                  Jl. Jend. Sudirman No.220, Sindangrasa
                </span>
              </li>
              <li className="flex flex-row sm:flex-col md:flex-row items-center sm:items-center md:items-start gap-2 justify-start sm:justify-center md:justify-start">
                <Phone className="w-4 h-4 text-white" />
                <span>(0265) 773000</span>
              </li>
              <li className="flex flex-row sm:flex-col md:flex-row items-center sm:items-center md:items-start gap-2 justify-start sm:justify-center md:justify-start">
                <Mail className="w-4 h-4 text-white" />
                <a
                  href="mailto:diskominfo@ciamiskab.go.id"
                  className="text-white hover:text-[#00C18B] transition-colors"
                >
                  diskominfo@ciamiskab.go.id
                </a>
              </li>
            </ul>
          </div>

          {/* 🔹 Media Sosial */}
          <div className="text-left sm:text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 border-b border-[#00C18B] inline-block">
              Ikuti Kami
            </h3>
            <div className="flex justify-start sm:justify-center md:justify-start gap-5 mt-3">
              <Link href="#" className="hover:text-[#00C18B] transition">
                <Facebook size={22} />
              </Link>
              <Link href="#" className="hover:text-[#00C18B] transition">
                <Twitter size={22} />
              </Link>
              <Link href="https://www.instagram.com/diskominfo_cms/" className="hover:text-[#00C18B] transition">
                <Instagram size={22} />
              </Link>
              <Link href="https://diskominfo.ciamiskab.go.id/" className="hover:text-[#00C18B] transition">
                <Globe size={22} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Garis bawah & copyright */}
      <div className="border-t border-white/20 mt-10 pt-4 text-left md:text-center text-gray-300 text-xs sm:text-sm px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
        © {new Date().getFullYear()}{" "}
        <span className="text-[#00C18B] font-medium"></span>Dinas Komunikasi dan Informatika - Pemerintah Kabupaten Ciamis
      </div>
    </footer>
  );
}
