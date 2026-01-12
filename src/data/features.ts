"use server";

export interface Feature {
  id: string;
  nomor_registrasi: string;
  nama_aplikasi: string;
  domain_aplikasi: string;
  kategori: string;
  pengguna: string;
  deskripsi: string;
  url: string;
}

const API_BASE_URL = process.env.SIMPATIK_API_BASE_URL!;
const API_TOKEN = process.env.SIMPATIK_API_TOKEN!;

const KATALOG_URL = `${API_BASE_URL}/katalog-aplikasi`;
const KATEGORI_URL = `${API_BASE_URL}/kategori-katalog-aplikasi`;

/**
 * 🔹 Ambil daftar aplikasi dari API.
 * Jika kategoriId = 0 → ambil semua data dari semua kategori.
 * Jika kategoriId diberikan → ambil sesuai kategori.
 */
export async function getFeatures(kategoriId?: number): Promise<Feature[]> {
  try {
    // ==============================
    // AMBIL SEMUA KATEGORI
    // ==============================
    if (!kategoriId || kategoriId === 0) {
      console.log("🌀 Mengambil SEMUA aplikasi dari semua kategori...");

      const kategoriRes = await fetch(KATEGORI_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: API_TOKEN,
        },
        cache: "no-store",
      });

      const kategoriJson = await kategoriRes.json();
      const kategoriList: number[] =
        kategoriJson?.data?.map((k: any) => k.id) ?? [];

      const allPromises = kategoriList.map((id) =>
        fetch(`${KATALOG_URL}?kategori=${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: API_TOKEN,
          },
          cache: "no-store",
        })
          .then((r) => (r.ok ? r.json() : {data: []}))
          .catch(() => ({data: []}))
      );

      const allResults = await Promise.all(allPromises);

      const allData = allResults.flatMap((res) =>
        (res.data ?? []).map((item: any) => mapFeature(item))
      );

      console.log(`✅ Total data semua kategori: ${allData.length}`);
      return allData;
    }

    // ==============================
    // KATEGORI SPESIFIK
    // ==============================
    const res = await fetch(`${KATALOG_URL}?kategori=${kategoriId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: API_TOKEN,
      },
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`Gagal fetch kategori ${kategoriId}`);

    const json = await res.json();
    return (json.data ?? []).map(mapFeature);
  } catch (error) {
    console.error("❌ Error fetching features:", error);
    return [];
  }
}

export async function getCategories(): Promise<{id: number; name: string}[]> {
  try {
    const res = await fetch(KATEGORI_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: API_TOKEN,
      },
      cache: "no-store",
    });

    const json = await res.json();

    if (json.success && Array.isArray(json.data)) {
      return [
        {id: 0, name: "All"},
        ...json.data.map((item: any) => ({
          id: item.id,
          name: item.name,
        })),
      ];
    }

    return [{id: 0, name: "All"}];
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    return [{id: 0, name: "All"}];
  }
}
function mapFeature(item: any): Feature {
  return {
    id: String(item.id),
    nomor_registrasi: item.nomor_registrasi || "-",
    nama_aplikasi: item.nama_aplikasi || "Tidak diketahui",
    domain_aplikasi: item.domain_aplikasi || "-",
    kategori: item.kategori?.name || "Umum",
    pengguna: item.pengguna || "-",
    deskripsi: item.deskripsi || "",
    url: item.url || "#",
  };
}
