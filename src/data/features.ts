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

const BASE_URL =
  "https://situ.ciamiskab.go.id/api/v3/simpatik/katalog-aplikasi";
const TOKEN =
  "Bearer 5|6Gd8UP7OfZPQgYbQL03wDeearDauxRkOP7LgGjUDb146b909";

/**
 * 🔹 Ambil daftar aplikasi dari API.
 * Jika kategoriId = 0 → ambil semua data dari semua kategori.
 * Jika kategoriId diberikan → ambil sesuai kategori.
 */
export async function getFeatures(kategoriId?: number): Promise<Feature[]> {
  try {
    // ✅ Kalau kategori = 0 → ambil semua kategori dulu
    if (!kategoriId || kategoriId === 0) {
      console.log("🌀 Mengambil SEMUA aplikasi dari semua kategori...");

      // Ambil semua kategori
      const kategoriRes = await fetch(
        "https://situ.ciamiskab.go.id/api/v3/simpatik/kategori-katalog-aplikasi",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: TOKEN,
          },
          cache: "no-store",
        }
      );

      const kategoriJson = await kategoriRes.json();
      const kategoriList: number[] = kategoriJson?.data?.map((k: any) => k.id) ?? [];

      // Ambil semua fitur dari tiap kategori paralel
      const allPromises = kategoriList.map((id) =>
        fetch(`${BASE_URL}?kategori=${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: TOKEN,
          },
          cache: "no-store",
        })
          .then((r) => (r.ok ? r.json() : { data: [] }))
          .catch(() => ({ data: [] }))
      );

      const allResults = await Promise.all(allPromises);

      // Gabungkan semua hasil
      const allData = allResults.flatMap((res) =>
        (res.data ?? []).map((item: any) => ({
          id: String(item.id),
          nomor_registrasi: item.nomor_registrasi || "-",
          nama_aplikasi: item.nama_aplikasi || "Tidak diketahui",
          domain_aplikasi: item.domain_aplikasi || "-",
          kategori: item.kategori?.name || "Umum",
          pengguna: item.pengguna || "-",
          deskripsi: item.deskripsi || "",
          url: item.url || "#",
        }))
      );

      console.log(`✅ Total data semua kategori: ${allData.length}`);
      return allData;
    }

    // ✅ Kalau kategori spesifik
    const res = await fetch(`${BASE_URL}?kategori=${kategoriId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`Gagal fetch kategori ${kategoriId}`);

    const json = await res.json();
    const items = json.data ?? [];

    return items.map((item: any) => ({
      id: String(item.id),
      nomor_registrasi: item.nomor_registrasi || "-",
      nama_aplikasi: item.nama_aplikasi || "Tidak diketahui",
      domain_aplikasi: item.domain_aplikasi || "-",
      kategori: item.kategori?.name || "Umum",
      pengguna: item.pengguna || "-",
      deskripsi: item.deskripsi || "",
      url: item.url || "#",
    }));
  } catch (error) {
    console.error("❌ Error fetching features:", error);
    return [];
  }
}

/**
 * 🔹 Ambil daftar kategori dari API
 */
export async function getCategories(): Promise<{ id: number; name: string }[]> {
  try {
    const res = await fetch(
      "https://situ.ciamiskab.go.id/api/v3/simpatik/kategori-katalog-aplikasi",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: TOKEN,
        },
        cache: "no-store",
      }
    );

    const json = await res.json();

    if (json.success && Array.isArray(json.data)) {
      // tambahkan kategori “All” di paling atas
      return [
        { id: 0, name: "All" },
        ...json.data.map((item: any) => ({
          id: item.id,
          name: item.name,
        })),
      ];
    }

    return [{ id: 0, name: "All" }];
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    return [{ id: 0, name: "All" }];
  }
}
