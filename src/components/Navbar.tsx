"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import LoginModal from "./Login";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const menus = [
    { name: "Home", href: "/" },
    { name: "Daftar Aplikasi", href: "/#daftar-aplikasi" },
    { name: "Tentang", href: "/tentang" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🚀 Handler klik menu
  const handleMenuClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    name: string
  ) => {
    e.preventDefault();
    setActive(name);
    setIsMobileMenuOpen(false);

    if (href.startsWith("/#")) {
      // jika target di halaman yang sama (home)
      if (pathname !== "/") {
        // kalau sekarang bukan di home, pindah dulu ke home
        router.push("/");
        setTimeout(() => {
          const target = document.querySelector(href.replace("/",""));
          if (target) target.scrollIntoView({ behavior: "smooth" });
        }, 400);
      } else {
        // kalau sudah di home, langsung scroll
        const target = document.querySelector(href.replace("/",""));
        if (target) target.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(href);
    }
  };

  const handleLogin = (email: string, password: string) => {
    console.log("Login attempt:", { email, password });
    setShowLogin(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-gradient-to-r from-[#08225C]/90 to-[#0E3B8C]/90 shadow-lg backdrop-blur-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
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
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center gap-10">
              {menus.map((menu) => {
                const isActive =
                  // jika di halaman tentang
                  (pathname === "/tentang" && menu.name === "Tentang") ||
                  // jika di halaman utama dan bukan daftar aplikasi
                  (pathname === "/" && active === menu.name) ||
                  // fallback manual untuk Home (saat di halaman utama tanpa section aktif)
                  (pathname === "/" && menu.name === "Home" && active === "Home");

                return (
                  <a
                    key={menu.name}
                    href={menu.href}
                    onClick={(e) => handleMenuClick(e, menu.href, menu.name)}
                    className={`text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "text-[#00C18B] border-b-2 border-[#00C18B]"
                        : "text-white hover:text-[#00C18B]"
                    }`}
                  >
                    {menu.name}
                  </a>
                );
              })}

            </div>
          </div>

          {/* Tombol Login
          <div className="hidden md:flex items-center">
            <button
              onClick={() => setShowLogin(true)}
              className="text-sm font-medium px-5 py-2 rounded-full shadow-md bg-[#00C18B] hover:bg-[#00a576] text-white transition-all"
            >
              Login
            </button>
          </div> */}

          {/* Tombol Mobile */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Menu Mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-[#0E3B8C] to-[#08225C] text-white transform transition-transform duration-500 ease-in-out z-40 shadow-2xl ${
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

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-[#0E3B8C]/40 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      <LoginModal
        show={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={handleLogin}
      />
    </>
  );
}
