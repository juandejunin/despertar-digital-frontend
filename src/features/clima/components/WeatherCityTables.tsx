/** @jsxImportSource preact */
import { useEffect, useState } from "preact/hooks";
import { countryCities } from "../../../data/countryCities";  // asegúrate de que esté en el lugar correcto

interface ForecastItem {
  time: string;
  description: string;
  temperature: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
}

interface CityData {
  city: string;
  forecast: ForecastItem[];
}

interface Props {
  apiUrl: string;
}

export default function WeatherCityTables({ apiUrl }: Props) {
  const [country, setCountry] = useState<string | null>(null);
  const [citiesData, setCitiesData] = useState<CityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getIcon = (desc: string): string => {
    const d = desc.toLowerCase();
    if (d.includes("soleado") || d.includes("despejado")) return "☀️";
    if (d.includes("nubes") && !d.includes("muy")) return "⛅";
    if (d.includes("muy nuboso") || d.includes("nublado")) return "☁️";
    if (d.includes("lluvia")) return "🌧️";
    if (d.includes("tormenta")) return "⛈️";
    return "☁️";
  };

  useEffect(() => {
    const loadAll = async () => {
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Error al cargar pronóstico base");
        const data = await res.json();
        const countryCode = data.location?.country || "ES";
        setCountry(countryCode);

        const cities = countryCities[countryCode] || [];
        if (cities.length === 0) {
          setError("No se encontraron ciudades para este país");
          setLoading(false);
          return;
        }

        // Priorizar ciudad del usuario
        const userCity = localStorage.getItem("userCity");
        let finalCities = cities;
        if (userCity && !cities.includes(userCity)) {
          finalCities = [userCity, ...cities];
        }

        const promises = finalCities.map(async (city) => {
          const url = new URL(apiUrl);
          url.searchParams.set("city", city);
          const r = await fetch(url.toString());
          if (!r.ok) throw new Error(`Error en ${city}`);
          const d = await r.json();
          return { city, forecast: d.forecast?.slice(0, 8) || [] };
        });

        const results = await Promise.all(promises);
        setCitiesData(results.filter(r => r.forecast.length > 0));

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("No pudimos cargar el pronóstico. Intenta más tarde.");
        setLoading(false);
      }
    };

    loadAll();
  }, [apiUrl]);

  if (loading) {
    return (
      <div class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-10 w-10 border-4 border-green-500 border-t-transparent"></div>
        <p class="mt-4 text-gray-600">Cargando el tiempo en España...</p>
      </div>
    );
  }

  if (error || !country || citiesData.length === 0) {
    return (
      <p class="text-center text-red-600 py-12 text-base">
        {error || "No se pudo cargar el pronóstico."}
      </p>
    );
  }

  return (
    <div class="space-y-8">
      <h2 class="text-2xl font-bold text-center text-gray-800">
        El Tiempo en {country}
      </h2>

      {citiesData.map(({ city, forecast }) => (
        <div
          key={city}
          class={`bg-white rounded-xl shadow-md border overflow-hidden transition-all duration-300
            ${city === localStorage.getItem("userCity") 
              ? "border-2 border-green-500 ring-2 ring-green-200" 
              : "border-gray-200 hover:shadow-lg"}`}
        >
          <div class={`px-4 py-3 text-white font-semibold text-center md:text-left
            ${city === localStorage.getItem("userCity")
              ? "bg-gradient-to-r from-green-600 to-green-800"
              : "bg-gradient-to-r from-gray-700 to-gray-900"}`}>
            {city === localStorage.getItem("userCity") 
              ? `Tu ciudad: ${city}` 
              : `Pronóstico en ${city}`}
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-gray-50 text-gray-600">
                <tr>
                  <th class="px-4 py-2 text-left font-medium">Hora</th>
                  <th class="px-4 py-2 text-center font-medium">Clima</th>
                  <th class="px-4 py-2 text-center font-medium">Temp</th>
                  <th class="px-4 py-2 text-center font-medium">Sens.</th>
                  <th class="px-4 py-2 text-center font-medium">Humedad</th>
                  <th class="px-4 py-2 text-center font-medium">Viento</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                {forecast.map((item) => (
                  <tr key={item.time} class="hover:bg-blue-50 transition-colors">
                    <td class="px-4 py-3 font-medium text-gray-800">{item.time.replace(":00", "h")}</td>
                    <td class="px-4 py-3 text-center text-2xl">{getIcon(item.description)}</td>
                    <td class="px-4 py-3 text-center">
                      <strong>{Math.round(item.temperature)}°C</strong>
                    </td>
                    <td class="px-4 py-3 text-center text-gray-600">{Math.round(item.feels_like)}°C</td>
                    <td class="px-4 py-3 text-center text-gray-600">{item.humidity}%</td>
                    <td class="px-4 py-3 text-center text-gray-600">{item.wind_speed.toFixed(1)} m/s</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <p class="text-sm text-center text-gray-500 mt-6">
        Actualizado: {new Date().toLocaleString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
          day: "numeric",
          month: "short",
        })}
      </p>
    </div>
  );
}