"use client";

import {useEffect, useMemo, useState} from "react";
import type {LucideIcon} from "lucide-react";
import {
  Accessibility,
  ALargeSmall,
  CalendarDays,
  Clock3,
  CloudSun,
  Contrast,
  Droplets,
  Loader2,
  MapPin,
  Minus,
  Palette,
  Plus,
  RefreshCw,
  RotateCcw,
  Sunrise,
  Sunset,
  Thermometer,
  Type,
  Underline,
  Wind,
  X,
  ZapOff,
} from "lucide-react";

type PanelType = "accessibility" | "weather" | null;

interface AccessibilitySettings {
  textScale: number;
  highContrast: boolean;
  grayscale: boolean;
  underlineLinks: boolean;
  readableFont: boolean;
  spaciousText: boolean;
  reduceMotion: boolean;
}

interface WeatherApiResponse {
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    precipitation_probability: number[];
    weather_code: number[];
    wind_speed_10m: number[];
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
    sunrise: string[];
    sunset: string[];
  };
}

interface HourlyForecast {
  time: string;
  weatherCode: number;
  temperature: number;
  humidity: number;
  rainProbability: number;
  windSpeed: number;
}

interface DailyForecast {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  rainProbabilityMax: number;
  sunrise: string;
  sunset: string;
}

interface WeatherData {
  current: {
    time: string;
    weatherCode: number;
    temperature: number;
    feelsLike: number;
    humidity: number;
    precipitation: number;
    windSpeed: number;
    windDirection: number;
  };
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  updatedAt: string;
}

const SETTINGS_STORAGE_KEY = "sawala-accessibility-v1";
const DEFAULT_SETTINGS: AccessibilitySettings = {
  textScale: 1,
  highContrast: false,
  grayscale: false,
  underlineLinks: false,
  readableFont: false,
  spaciousText: false,
  reduceMotion: false,
};

const MIN_TEXT_SCALE = 0.85;
const MAX_TEXT_SCALE = 1.4;
const TEXT_SCALE_STEP = 0.05;

const ciamisCoordinate = {
  latitude: -7.3318,
  longitude: 108.3536,
};

interface ToggleItem {
  key: Exclude<keyof AccessibilitySettings, "textScale">;
  label: string;
  description: string;
  icon: LucideIcon;
}

const toggleItems: ToggleItem[] = [
  {
    key: "highContrast",
    label: "Kontras tinggi",
    description: "Menaikkan kontras tampilan agar lebih jelas.",
    icon: Contrast,
  },
  {
    key: "grayscale",
    label: "Grayscale",
    description: "Mengubah warna halaman menjadi skala abu-abu.",
    icon: Palette,
  },
  {
    key: "underlineLinks",
    label: "Garis bawah link",
    description: "Menandai semua tautan agar mudah dikenali.",
    icon: Underline,
  },
  {
    key: "readableFont",
    label: "Font ramah-baca",
    description: "Menggunakan font dengan keterbacaan lebih tinggi.",
    icon: Type,
  },
  {
    key: "spaciousText",
    label: "Spasi teks lega",
    description: "Menambah jarak huruf dan baris untuk membantu fokus.",
    icon: ALargeSmall,
  },
  {
    key: "reduceMotion",
    label: "Kurangi animasi",
    description: "Mengurangi animasi dan transisi yang bergerak cepat.",
    icon: ZapOff,
  },
];

function getWeatherLabel(weatherCode: number): {label: string; emoji: string} {
  if (weatherCode === 0) return {label: "Cerah", emoji: "☀️"};
  if ([1, 2].includes(weatherCode)) return {label: "Cerah berawan", emoji: "🌤️"};
  if (weatherCode === 3) return {label: "Berawan", emoji: "☁️"};
  if ([45, 48].includes(weatherCode)) return {label: "Berkabut", emoji: "🌫️"};
  if ([51, 53, 55, 56, 57].includes(weatherCode)) {
    return {label: "Gerimis", emoji: "🌦️"};
  }
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) {
    return {label: "Hujan", emoji: "🌧️"};
  }
  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
    return {label: "Salju", emoji: "❄️"};
  }
  if ([95, 96, 99].includes(weatherCode)) return {label: "Badai petir", emoji: "⛈️"};
  return {label: "Kondisi tidak diketahui", emoji: "🌡️"};
}

function getWindDirectionLabel(degree: number): string {
  const directions = [
    "Utara",
    "Timur Laut",
    "Timur",
    "Tenggara",
    "Selatan",
    "Barat Daya",
    "Barat",
    "Barat Laut",
  ];

  const index = Math.round(degree / 45) % directions.length;
  return directions[index];
}

function formatHour(dateIso: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  }).format(new Date(dateIso));
}

function formatDate(dateIso: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    timeZone: "Asia/Jakarta",
  }).format(new Date(dateIso));
}

function formatFullDateTime(dateIso: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  }).format(new Date(dateIso));
}

function parseWeatherData(rawData: WeatherApiResponse): WeatherData {
  const hourlyEntries: HourlyForecast[] = rawData.hourly.time.map((time, index) => ({
    time,
    weatherCode: rawData.hourly.weather_code[index],
    temperature: rawData.hourly.temperature_2m[index],
    humidity: rawData.hourly.relative_humidity_2m[index],
    rainProbability: rawData.hourly.precipitation_probability[index],
    windSpeed: rawData.hourly.wind_speed_10m[index],
  }));

  const currentTime = Date.now();
  const nextHours = hourlyEntries
    .filter((item) => new Date(item.time).getTime() >= currentTime - 60 * 60 * 1000)
    .slice(0, 8);

  const dailyEntries: DailyForecast[] = rawData.daily.time.map((date, index) => ({
    date,
    weatherCode: rawData.daily.weather_code[index],
    tempMax: rawData.daily.temperature_2m_max[index],
    tempMin: rawData.daily.temperature_2m_min[index],
    rainProbabilityMax: rawData.daily.precipitation_probability_max[index],
    sunrise: rawData.daily.sunrise[index],
    sunset: rawData.daily.sunset[index],
  }));

  return {
    current: {
      time: rawData.current.time,
      weatherCode: rawData.current.weather_code,
      temperature: rawData.current.temperature_2m,
      feelsLike: rawData.current.apparent_temperature,
      humidity: rawData.current.relative_humidity_2m,
      precipitation: rawData.current.precipitation,
      windSpeed: rawData.current.wind_speed_10m,
      windDirection: rawData.current.wind_direction_10m,
    },
    hourly: nextHours,
    daily: dailyEntries.slice(0, 7),
    updatedAt: new Date().toISOString(),
  };
}

function getWeatherApiUrl(): string {
  const params = new URLSearchParams({
    latitude: String(ciamisCoordinate.latitude),
    longitude: String(ciamisCoordinate.longitude),
    current:
      "temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m,apparent_temperature",
    hourly: "temperature_2m,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset",
    timezone: "Asia/Jakarta",
    forecast_days: "7",
  });

  return `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
}

function SettingToggle({
  icon: Icon,
  label,
  description,
  enabled,
  onToggle,
}: {
  icon: LucideIcon;
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="w-full rounded-xl border border-gray-200 bg-white p-3 text-left transition hover:border-emerald-300 hover:bg-emerald-50"
      aria-pressed={enabled}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-start gap-2">
          <span
            className={`mt-1 rounded-md p-1.5 ${
              enabled
                ? "bg-emerald-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <Icon size={14} />
          </span>
          <div>
            <p className="text-sm font-semibold text-gray-900">{label}</p>
            <p className="text-xs text-gray-500">{description}</p>
          </div>
        </div>

        <span
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
            enabled ? "bg-emerald-600" : "bg-gray-300"
          }`}
          aria-hidden
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
              enabled ? "translate-x-5" : "translate-x-1"
            }`}
          />
        </span>
      </div>
    </button>
  );
}

export default function LeftFloatingWidgets() {
  const [activePanel, setActivePanel] = useState<PanelType>(null);
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS);
  const [isSettingsReady, setIsSettingsReady] = useState(false);

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<AccessibilitySettings>;
        setSettings((previous) => ({
          ...previous,
          ...parsed,
          textScale:
            typeof parsed.textScale === "number"
              ? Math.min(MAX_TEXT_SCALE, Math.max(MIN_TEXT_SCALE, parsed.textScale))
              : previous.textScale,
        }));
      }
    } catch {
      // Abaikan jika localStorage tidak tersedia/invalid.
    } finally {
      setIsSettingsReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isSettingsReady) return;

    const root = document.documentElement;

    root.style.setProperty("--a11y-text-scale", settings.textScale.toString());
    root.classList.toggle("a11y-high-contrast", settings.highContrast);
    root.classList.toggle("a11y-grayscale", settings.grayscale);
    root.classList.toggle("a11y-underline-links", settings.underlineLinks);
    root.classList.toggle("a11y-readable-font", settings.readableFont);
    root.classList.toggle("a11y-spacious-text", settings.spaciousText);
    root.classList.toggle("a11y-reduce-motion", settings.reduceMotion);

    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));

    return () => {
      root.classList.remove(
        "a11y-high-contrast",
        "a11y-grayscale",
        "a11y-underline-links",
        "a11y-readable-font",
        "a11y-spacious-text",
        "a11y-reduce-motion"
      );
      root.style.setProperty("--a11y-text-scale", "1");
    };
  }, [isSettingsReady, settings]);

  const loadWeather = async () => {
    setWeatherLoading(true);
    setWeatherError(null);

    try {
      const response = await fetch(getWeatherApiUrl(), {cache: "no-store"});
      if (!response.ok) {
        throw new Error("Gagal mengambil data cuaca.");
      }

      const rawData = (await response.json()) as WeatherApiResponse;
      setWeatherData(parseWeatherData(rawData));
    } catch {
      setWeatherError("Data cuaca belum dapat diambil. Coba muat ulang.");
    } finally {
      setWeatherLoading(false);
    }
  };

  useEffect(() => {
    void loadWeather();

    const refreshInterval = window.setInterval(() => {
      void loadWeather();
    }, 15 * 60 * 1000);

    return () => {
      window.clearInterval(refreshInterval);
    };
  }, []);

  const currentWeather = useMemo(() => {
    if (!weatherData) return null;
    return getWeatherLabel(weatherData.current.weatherCode);
  }, [weatherData]);

  const handleToggle = (key: Exclude<keyof AccessibilitySettings, "textScale">) => {
    setSettings((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  const handleScale = (delta: number) => {
    setSettings((previous) => ({
      ...previous,
      textScale: Number(
        Math.min(MAX_TEXT_SCALE, Math.max(MIN_TEXT_SCALE, previous.textScale + delta)).toFixed(2)
      ),
    }));
  };

  const resetAccessibility = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <>
      <div className="fixed left-2 top-1/2 z-[80] -translate-y-1/2">
        <div className="flex flex-col gap-2 rounded-2xl bg-white/90 p-1.5 shadow-2xl backdrop-blur">
          <button
            type="button"
            onClick={() =>
              setActivePanel((current) =>
                current === "accessibility" ? null : "accessibility"
              )
            }
            className={`flex h-11 w-11 items-center justify-center rounded-xl border transition ${
              activePanel === "accessibility"
                ? "border-emerald-700 bg-emerald-600 text-white"
                : "border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50"
            }`}
            aria-label="Buka panel aksesibilitas"
          >
            <Accessibility size={19} />
          </button>

          <button
            type="button"
            onClick={() =>
              setActivePanel((current) => (current === "weather" ? null : "weather"))
            }
            className={`flex h-11 w-11 items-center justify-center rounded-xl border transition ${
              activePanel === "weather"
                ? "border-sky-700 bg-sky-600 text-white"
                : "border-sky-200 bg-white text-sky-700 hover:bg-sky-50"
            }`}
            aria-label="Buka panel cuaca Ciamis"
          >
            <CloudSun size={19} />
          </button>
        </div>
      </div>

      {activePanel && (
        <aside className="fixed left-16 top-1/2 z-[85] max-h-[85vh] w-[min(92vw,380px)] -translate-y-1/2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
          <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-500">
                Pintasan
              </p>
              <h2 className="text-sm font-bold text-gray-900">
                {activePanel === "accessibility" ? "Aksesibilitas" : "Cuaca Ciamis"}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setActivePanel(null)}
              className="rounded-lg p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
              aria-label="Tutup panel"
            >
              <X size={18} />
            </button>
          </header>

          {activePanel === "accessibility" ? (
            <div className="space-y-3 overflow-y-auto p-4">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Ukuran teks
                </p>

                <div className="mt-2 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => handleScale(-TEXT_SCALE_STEP)}
                    className="rounded-lg border border-gray-300 p-2 text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={settings.textScale <= MIN_TEXT_SCALE}
                    aria-label="Kecilkan ukuran teks"
                  >
                    <Minus size={16} />
                  </button>

                  <p className="flex-1 text-center text-sm font-semibold text-gray-700">
                    {Math.round(settings.textScale * 100)}%
                  </p>

                  <button
                    type="button"
                    onClick={() => handleScale(TEXT_SCALE_STEP)}
                    className="rounded-lg border border-gray-300 p-2 text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={settings.textScale >= MAX_TEXT_SCALE}
                    aria-label="Besarkan ukuran teks"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {toggleItems.map((item) => (
                <SettingToggle
                  key={item.key}
                  icon={item.icon}
                  label={item.label}
                  description={item.description}
                  enabled={settings[item.key]}
                  onToggle={() => handleToggle(item.key)}
                />
              ))}

              <button
                type="button"
                onClick={resetAccessibility}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
              >
                <RotateCcw size={15} />
                Reset Pengaturan
              </button>
            </div>
          ) : (
            <div className="space-y-4 overflow-y-auto p-4">
              <div className="rounded-xl border border-sky-200 bg-sky-50 p-3 text-sky-900">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-sky-700">
                    <MapPin size={12} />
                    Ciamis, Jawa Barat
                  </div>

                  <button
                    type="button"
                    onClick={() => void loadWeather()}
                    className="rounded-md bg-white p-1.5 text-sky-700 transition hover:bg-sky-100"
                    aria-label="Muat ulang cuaca"
                  >
                    <RefreshCw size={14} />
                  </button>
                </div>

                {weatherLoading ? (
                  <div className="flex items-center gap-2 text-sm text-sky-700">
                    <Loader2 size={15} className="animate-spin" />
                    Memuat data cuaca...
                  </div>
                ) : weatherError ? (
                  <p className="rounded-md bg-red-100 p-2 text-xs text-red-700">{weatherError}</p>
                ) : weatherData && currentWeather ? (
                  <>
                    <div className="flex items-end gap-2">
                      <span className="text-3xl" aria-hidden>
                        {currentWeather.emoji}
                      </span>
                      <div>
                        <p className="text-2xl font-bold leading-none">
                          {Math.round(weatherData.current.temperature)}°C
                        </p>
                        <p className="text-sm font-semibold">{currentWeather.label}</p>
                      </div>
                    </div>

                    <p className="mt-2 text-[11px] text-sky-700/80">
                      Diperbarui: {formatFullDateTime(weatherData.updatedAt)} WIB
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-sky-700">Data cuaca belum tersedia.</p>
                )}
              </div>

              {weatherData && !weatherError && (
                <>
                  <section className="grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-lg border border-gray-200 p-2">
                      <p className="mb-1 inline-flex items-center gap-1 text-gray-500">
                        <Thermometer size={13} />
                        Terasa
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        {Math.round(weatherData.current.feelsLike)}°C
                      </p>
                    </div>

                    <div className="rounded-lg border border-gray-200 p-2">
                      <p className="mb-1 inline-flex items-center gap-1 text-gray-500">
                        <Droplets size={13} />
                        Kelembapan
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        {Math.round(weatherData.current.humidity)}%
                      </p>
                    </div>

                    <div className="rounded-lg border border-gray-200 p-2">
                      <p className="mb-1 inline-flex items-center gap-1 text-gray-500">
                        <Wind size={13} />
                        Angin
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        {Math.round(weatherData.current.windSpeed)} km/jam
                      </p>
                      <p className="text-[11px] text-gray-500">
                        {getWindDirectionLabel(weatherData.current.windDirection)}
                      </p>
                    </div>

                    <div className="rounded-lg border border-gray-200 p-2">
                      <p className="mb-1 inline-flex items-center gap-1 text-gray-500">
                        <CloudSun size={13} />
                        Presipitasi
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        {weatherData.current.precipitation.toFixed(1)} mm
                      </p>
                    </div>
                  </section>

                  <section className="rounded-xl border border-gray-200 p-3">
                    <p className="mb-2 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      <Clock3 size={13} />
                      8 jam ke depan
                    </p>

                    <div className="space-y-1.5">
                      {weatherData.hourly.map((hour) => {
                        const weather = getWeatherLabel(hour.weatherCode);

                        return (
                          <div
                            key={hour.time}
                            className="grid grid-cols-[56px_1fr_auto_auto] items-center gap-2 rounded-md bg-gray-50 px-2 py-1.5 text-xs"
                          >
                            <p className="font-semibold text-gray-700">{formatHour(hour.time)}</p>
                            <p className="truncate text-gray-600">
                              {weather.emoji} {weather.label}
                            </p>
                            <p className="font-semibold text-gray-900">
                              {Math.round(hour.temperature)}°
                            </p>
                            <p className="text-gray-500">{Math.round(hour.rainProbability)}%</p>
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  <section className="rounded-xl border border-gray-200 p-3">
                    <p className="mb-2 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      <CalendarDays size={13} />
                      7 hari ke depan
                    </p>

                    <div className="space-y-2">
                      {weatherData.daily.map((day) => {
                        const weather = getWeatherLabel(day.weatherCode);

                        return (
                          <div
                            key={day.date}
                            className="rounded-md border border-gray-100 bg-gray-50 p-2"
                          >
                            <div className="flex items-center justify-between gap-2 text-xs">
                              <p className="font-semibold text-gray-800">{formatDate(day.date)}</p>
                              <p className="text-gray-600">
                                {weather.emoji} {weather.label}
                              </p>
                            </div>

                            <div className="mt-1 flex items-center justify-between text-xs text-gray-700">
                              <p>
                                {Math.round(day.tempMin)}° - {Math.round(day.tempMax)}°C
                              </p>
                              <p>Peluang hujan {Math.round(day.rainProbabilityMax)}%</p>
                            </div>

                            <div className="mt-1 flex items-center justify-between text-[11px] text-gray-500">
                              <p className="inline-flex items-center gap-1">
                                <Sunrise size={12} />
                                {formatHour(day.sunrise)}
                              </p>
                              <p className="inline-flex items-center gap-1">
                                <Sunset size={12} />
                                {formatHour(day.sunset)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                </>
              )}
            </div>
          )}
        </aside>
      )}
    </>
  );
}
