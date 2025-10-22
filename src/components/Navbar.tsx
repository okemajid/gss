"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import LoginModal from "./Login";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menus = [
    { name: "Home", href: "#hero" },
    { name: "Daftar Aplikasi", href: "#daftar-aplikasi" },
    // { name: "Tentang", href: "/tentang" },
  ];

  // Efek scroll background
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll
  const handleMenuClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    name: string
  ) => {
    e.preventDefault();
    setActive(name);
    if (href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = href;
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogin = (email: string, password: string) => {
    console.log("Login attempt:", { email, password });
    setShowLogin(false);
  };

  return (
    <>
      {/* 🔹 Navbar Utama */}
      <nav
         className={`fixed top-0 left-0 w-full z-100 transition-all duration-500 ${
            isScrolled
              ? "bg-gradient-to-r from-[#08225C]/90 to-[#0E3B8C]/90 shadow-lg backdrop-blur-lg"
              : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            {/* 🔹 Logo (kiri) */}
            <div className="flex items-center gap-2">
              <Image
                src="/images/ciamis.svg"
                alt="Logo"
                width={36}
                height={36}
                className="rounded-md"
              />
              <span className="text-lg font-semibold text-white tracking-wide">
                SAWALA
              </span>
            </div>

            {/* 🔹 Menu Navigasi - Desktop (tengah) */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <div className="flex items-center gap-10">
                {menus.map((menu) => (
                  <a
                    key={menu.name}
                    href={menu.href}
                    onClick={(e) => handleMenuClick(e, menu.href, menu.name)}
                    className={`text-sm font-medium transition-all duration-200 cursor-pointer ${
                      active === menu.name
                        ? "text-[#00C18B] border-b-2 border-[#00C18B]"
                        : "text-white hover:text-[#00C18B]"
                    }`}
                  >
                    {menu.name}
                  </a>
                ))}
              </div>
            </div>

            {/* 🔹 Tombol login (kanan) */}
            <div className="hidden md:flex items-center">
              <button
                onClick={() => setShowLogin(true)}
                className="text-sm font-medium px-5 py-2 rounded-full shadow-md bg-[#00C18B] hover:bg-[#00a576] text-white transition-all"
              >
                <i className="fa-solid fa-right-to-bracket mr-2"></i> Login
              </button>
            </div>


          {/* 🔹 Tombol Menu Mobile */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* 🔹 Menu Slide Mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-[#0E3B8C] to-[#08225C] text-white transform transition-transform duration-500 ease-in-out z-40 shadow-2xl backdrop-blur-lg ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 space-y-6 mt-16">
          {menus.map((menu) => (
            <a
              key={menu.name}
              href={menu.href}
              onClick={(e) => handleMenuClick(e, menu.href, menu.name)}
              className={`text-base font-medium transition-all duration-200 ${
                active === menu.name
                  ? "text-[#00C18B]"
                  : "text-gray-200 hover:text-[#00C18B]"
              }`}
            >
              {menu.name}
            </a>
          ))}

          <button
            onClick={() => {
              setShowLogin(true);
              setIsMobileMenuOpen(false);
            }}
            className="mt-4 w-full text-sm font-medium px-5 py-2 rounded-full bg-[#00C18B] hover:bg-[#00a576] transition-all"
          >
            Login
          </button>
        </div>
      </div>

      {/* 🔹 Overlay lembut (bukan hitam lagi) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-[#0E3B8C]/40 backdrop-blur-sm z-30 md:hidden transition-all duration-500"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* 🔹 Modal Login */}
      <LoginModal
        show={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={handleLogin}
      />
    </>
  );
}
