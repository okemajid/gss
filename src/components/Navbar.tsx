"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import LoginModal from "./Login";

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const menus = [
    { name: "Home", href: "#hero" },
    { name: "Daftar Aplikasi", href: "#daftar-aplikasi" },
    { name: "Statistik", href: "#statistik" },
  ];

  // 🔹 Efek scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔹 Efek active section
  useEffect(() => {
    const sections = menus.map((menu) => document.querySelector(menu.href));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            const menu = menus.find((m) => m.href === `#${id}`);
            if (menu) setActive(menu.name);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // 🔹 Smooth scroll
  const handleMenuClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    name: string
  ) => {
    e.preventDefault();
    setActive(name);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  // 🔹 Login handler
  const handleLogin = (email: string, password: string) => {
    console.log("Login attempt:", { email, password });
    setShowLogin(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-gradient-to-r from-[#08225C] to-[#0E3B8C] shadow-lg backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/images/ciamis.svg"
              alt="Logo"
              width={36}
              height={36}
              className="rounded-md"
            />
            <span className="text-lg font-semibold text-white">
              GALUH SMART SERVICES
            </span>
          </div>

          {/* Menu Navigasi */}
          <div className="hidden md:flex items-center gap-8">
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

          {/* Tombol Login */}
          <button
            onClick={() => setShowLogin(true)}
            className="text-sm font-medium px-5 py-2 rounded-full shadow-md bg-[#00C18B] hover:bg-[#00a576] text-white transition-all"
          >
            <i className="fa-solid fa-right-to-bracket mr-2"></i> Login
          </button>
        </div>
      </nav>

      {/* Modal Login */}
      <LoginModal
        show={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={handleLogin}
      />
    </>
  );
}
