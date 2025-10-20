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

  if (!show) return null; // jika tidak aktif, tidak render apa pun

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[999] flex items-center justify-center animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-8 relative animate-slideUp">
        {/* Tombol close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-lg"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-[#0E3B8C]">
          Masuk ke Akun
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0E3B8C]"
              placeholder="Masukkan email Anda"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0E3B8C]"
              placeholder="Masukkan password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#00C18B] hover:bg-[#00a576] text-white font-semibold py-2.5 rounded-lg transition-all"
          >
            Masuk
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Belum punya akun?{" "}
          <a href="#" className="text-[#0E3B8C] hover:underline font-medium">
            Daftar di sini
          </a>
        </p>
      </div>

      {/* 🔹 Animasi Tailwind tambahan */}
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
