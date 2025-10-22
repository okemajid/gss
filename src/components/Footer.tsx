"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Globe} from "lucide-react";


const slide = {
    backgroundImage: "/images/bg-footer.svg", // 🔹 SVG transparan
    bgColor: "linear-gradient(to right, #08225C, #0E3B8C)", // 🔹 gradasi
  };

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-[#08225C] to-[#0E3B8C] text-white pt-12 pb-6 mt-20"
    style={{
        backgroundImage: `${slide.bgColor}, url(${slide.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay", // 🔹 membuat warna & gambar menyatu lembut
      }}
    >
      {/* 🔹 Isi utama footer */}
      <div className="w-full px-10 md:px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* 🔹 Logo & Deskripsi */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/images/ciamis.svg"
              alt="Logo"
              width={48}
              height={48}
              className="rounded-md"
            />
            <h2 className="text-xl font-semibold">Sawala</h2>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
            Platform layanan digital terpadu Tatar Galuh untuk memudahkan masyarakat mengakses berbagai layanan dan aplikasi di Kabupaten Ciamis.
          </p>
        </div>

        {/* 🔹 Navigasi Cepat */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b border-[#00C18B] inline-block">
            Informasi
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><Link href="#" className="hover:text-[#00C18B] transition">Home</Link></li>
            <li><Link href="#daftar-aplikasi" className="hover:text-[#00C18B] transition">Daftar Aplikasi</Link></li>
          </ul>
        </div>

        {/* 🔹 Kontak */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b border-[#00C18B] inline-block">
            Kontak
          </h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 text-[#00C18B]" />
              <span>
                Kantor Dinas Komunikasi dan Informatika Kabupaten Ciamis<br />
                Jl. Jend. Sudirman No.220, Sindangrasa, Ciamis 
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#00C18B]" />
              <span>(0265) 773000</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#00C18B]" />
              <span>diskominfo@ciamiskab.go.id</span>
            </li>
          </ul>
        </div>

       {/* 🔹 Media Sosial */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b border-[#00C18B] inline-block">
            Ikuti Kami
          </h3>
          <div className="flex gap-4 mt-2">
            <Link href="#" className="hover:text-[#00C18B] transition">
              <Facebook size={22} />
            </Link>
            <Link href="#" className="hover:text-[#00C18B] transition">
              <Twitter size={22} />
            </Link>
            <Link href="#" className="hover:text-[#00C18B] transition">
              <Instagram size={22} />
            </Link>
            <Link href="#" className="hover:text-[#00C18B] transition">
              <Globe size={22} />
            </Link>
          </div>
        </div>

      </div>

      {/* 🔹 Garis bawah & copyright */}
      <div className="border-t border-white/20 mt-10 pt-4 text-center text-gray-300 text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="text-[#00C18B] font-medium">Sawala</span>. Semua hak dilindungi.
      </div>
    </footer>
  );
}
