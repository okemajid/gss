const FALLBACK_SITE_URL = "https://sawala.ciamiskab.go.id";

const normalizeSiteUrl = (value?: string): URL => {
  const raw = value?.trim();
  if (!raw) {
    return new URL(FALLBACK_SITE_URL);
  }

  try {
    return new URL(raw);
  } catch {
    return new URL(`https://${raw}`);
  }
};

export const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
export const siteName = "SAWALA";
export const siteTitle = "Sistem Aplikasi dan Wadah Layanan";
export const siteDescription =
  "SAWALA adalah portal layanan digital terpadu Pemerintah Kabupaten Ciamis untuk memudahkan masyarakat mengakses informasi dan aplikasi layanan publik.";
export const ogImagePath = "/images/hero2.png";
