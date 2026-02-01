/** @jsxImportSource preact */
import { useEffect, useState } from "preact/hooks";

interface Location {
  ip: string;
  city: string;
  country: string;
}

interface Weather {
  description: string;
  temperature: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  wind_deg: number;
  pressure: number;
  visibility: number;
}

interface Air {
  aqi: number;
  label: string;
  emoji: string;
  formatted: string;
  components: Record<string, number>;
  timestamp: number;
}

interface WeatherAirResponse {
  location: Location;
  weather: Weather;
  air: Air;
}

interface Props {
  apiUrl: string; // URL del endpoint: today-air o forecast
  city?: string; // ciudad opcional, si se cambia dinámicamente
}

export default function WeatherCard({ apiUrl, city }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<WeatherAirResponse | null>(null);

  const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutos

  const cacheKey = (city?: string) => `weather-air:${city || "auto"}`;

  const readCache = (city?: string) => {
    const raw = sessionStorage.getItem(cacheKey(city));
    if (!raw) return null;
    try {
      const { ts, data } = JSON.parse(raw);
      if (Date.now() - ts < CACHE_TTL_MS) return data as WeatherAirResponse;
    } catch {}
    return null;
  };

  const writeCache = (city: string | undefined, data: WeatherAirResponse) => {
    sessionStorage.setItem(
      cacheKey(city),
      JSON.stringify({ ts: Date.now(), data })
    );
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    const effectiveCity = city || localStorage.getItem("userCity") || undefined;

    // Intentar caché
    const cached = readCache(effectiveCity);
    if (cached) {
      setData(cached);
      setLoading(false);
      // refrescar en background
      refreshInBackground(effectiveCity);
      return;
    }

    try {
      const url = new URL(apiUrl);
      if (effectiveCity) url.searchParams.set("city", effectiveCity);

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: WeatherAirResponse = await res.json();
      setData(json);
      writeCache(effectiveCity, json);
    } catch (err) {
      console.error(err);
      setError("No se pudo obtener el clima");
    } finally {
      setLoading(false);
    }
  };

  const refreshInBackground = async (city?: string) => {
    const effectiveCity = city || localStorage.getItem("userCity") || undefined;
    try {
      const url = new URL(apiUrl);
      if (effectiveCity) url.searchParams.set("city", effectiveCity);
      const res = await fetch(url.toString());
      if (!res.ok) return;
      const json: WeatherAirResponse = await res.json();
      writeCache(effectiveCity, json);
      setData(json);
    } catch {
      // silencioso
    }
  };

  useEffect(() => {
    fetchData();
  }, [city]);

  const formatNumber = (n: number | undefined | null, digits = 0) => {
    if (n == null) return "—";
    return n.toLocaleString(undefined, {
      maximumFractionDigits: digits,
      minimumFractionDigits: digits,
    });
  };

  if (loading)
    return <div class="p-5 text-center text-gray-500">🔄 Cargando clima…</div>;
  if (error) return <div class="p-5 text-center text-red-600">{error}</div>;
  if (!data) return null;

  const { location, weather, air } = data;

  return (
    <div class=" flex flex-col gap-2 text-center min-h-32">
      <div class="font-semibold text-lg">
         {location.city}
        {location.country ? `, ${location.country}` : ""}
      </div>
      <div>🌤️ {weather.description}</div>
      <div>
        🌡️ {formatNumber(weather.temperature)}°C{" "}
        <span class="text-gray-900">
          / se siente {formatNumber(weather.feels_like)}°C
        </span>
      </div>
      <div>💧 Humedad: {formatNumber(weather.humidity)}%</div>
      <div>💨 Viento: {formatNumber(weather.wind_speed, 1)} m/s</div>
      <div title="Calidad del aire">
        🌫️ {air.formatted || `${air.emoji} ${air.label} (AQI ${air.aqi})`}
      </div>
    </div>
  );
}
