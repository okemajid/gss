"use client";
import { useEffect, useState , useRef} from "react";
import Link from "next/link";


interface Feature {
  id: number;
  name: string;
  deskripsi: string;
  kategori?: { id: number; name: string };
  gambar?: string;
  ikon?: string;
}

interface FeatureDetailProps {
  params: { id: string };
}

export default function FeatureDetail({ params }: FeatureDetailProps) {
  const { id } = params;
  const [feature, setFeature] = useState<Feature | null>(null);
  const [loading, setLoading] = useState(true);
  const scrollPosition = useRef<number>(0); // menyimpan posisi scroll sebelum fetch

  const API_URL = `https://situ.ciamiskab.go.id/api/v3/simpatik/katalog-aplikasi/${id}`;

  useEffect(() => {

    scrollPosition.current = window.scrollY;

    const fetchFeature = async () => {
      try {
        const res = await fetch(API_URL, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await res.json();

        if (json.success && json.data) {
          setFeature(json.data);
        } else {
          setFeature(null);
        }
      } catch (error) {
        console.error("Gagal mengambil data fitur:", error);
        setFeature(null);
      } finally {
        setLoading(false);
      
         // kembalikan scroll ke posisi sebelumnya dengan smooth
        setTimeout(() => {
          window.scrollTo({
            top: scrollPosition.current,
            behavior: "smooth",
          });
        }, 150);
      }
    };

    fetchFeature();
  }, [id]);

  if (loading)
    return <p className="text-white text-center mt-20">Loading feature...</p>;

  if (!feature)
    return <p className="text-white text-center mt-20">Feature not found</p>;

  return (
    <main
      className="min-h-screen flex flex-col items-center pt-20 px-6 relative"
      style={{
        backgroundImage: "url('/images/background/bg2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/50 -z-10"></div>

      {/* tombol kembali */}
      <Link
        href="/"
        className="self-start mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
      >
        &larr; Kembali
      </Link>

      {/* card detail */}
      <div className="w-full max-w-4xl bg-gray-800/70 backdrop-blur-md rounded-2xl border border-gray-700/50 shadow-md p-6 flex flex-col items-center">
        {feature.gambar && (
          <img
            src={feature.gambar}
            alt={feature.name}
            className="w-64 h-auto rounded-xl mb-4 object-cover"
          />
        )}

        {feature.kategori?.name && (
          <span className="inline-block px-3 py-1 text-sm text-white font-bold rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 mb-4">
            {feature.kategori.name}
          </span>
        )}

        <h1 className="text-3xl font-bold text-white mb-4 text-center">
          {feature.name}
        </h1>

        <p className="text-gray-300 text-lg text-center max-w-2xl">
          {feature.deskripsi || "Tidak ada deskripsi."}
        </p>
      </div>
    </main>
  );
}
