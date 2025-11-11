"use client";

import { useState } from "react";

interface LoginModalProps {
  show: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
}

export default function LoginModal({ show, onClose, onLogin }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!show) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0E3B8C]/80 to-[#08225C]/90 backdrop-blur-md z-[999] flex items-center justify-center animate-fadeIn">
      {/* 🔹 Card Login */}
      <div className="relative w-[90%] max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 text-white animate-slideUp">
        {/* Tombol Close */}
        {/* <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-300 hover:text-white text-lg font-bold transition"
        >
          ✕
        </button> */}

        {/* Judul */}
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
          Selamat Datang Kembali
        </h2>

        {/* Form Login */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2 text-cyan-100">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Masukkan email Anda"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-cyan-100">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Masukkan password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#00C18B] to-[#00A572] hover:from-[#00A572] hover:to-[#008B60] text-white font-semibold py-2.5 rounded-lg transition-all shadow-lg"
          >
            Masuk
          </button>
        </form>

        <p className="text-sm text-center text-gray-300 mt-5">
          Belum punya akun?{" "}
          <a href="#" className="text-cyan-300 hover:underline font-medium">
            Daftar di sini
          </a>
        </p>
      </div>

      {/* 🔹 Animasi */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes slideUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
