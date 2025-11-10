/** @jsxImportSource preact */
import { useEffect, useState } from "preact/hooks";
import { countryCities } from "../data/countryCities";

interface ForecastItem {
  time: string;
  description: string;
  temperature: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
}

interface WeatherResponse {
  location: { country: string; city: string };
  forecast: ForecastItem[];
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

  const getIcon = (desc: string): string => {
    const d = desc.toLowerCase();
    if (d.includes("soleado") || d.includes("despejado")) return "Soleado";
    if (d.includes("nubes") && !d.includes("muy")) return "Nubes";
    if (d.includes("muy nuboso") || d.includes("nublado"))
      return "Nubes densas";
    if (d.includes("lluvia")) return "Lluvia";
    if (d.includes("tormenta")) return "Tormenta";
    return "Nubes";
  };

  useEffect(() => {
    const loadAll = async () => {
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        const countryCode = data.location.country;
        setCountry(countryCode);

        const cities = countryCities[countryCode] || [];
        if (cities.length === 0) {
          setLoading(false);
          return;
        }

        // === AÑADIR AQUÍ ===
        const userCity = localStorage.getItem("userCity");
        let finalCities = cities;

        if (userCity && !cities.includes(userCity)) {
          finalCities = [userCity, ...cities]; // userCity al principio
        }

        const promises = finalCities.map(async (city) => {
          const url = new URL(apiUrl);
          url.searchParams.set("city", city);
          const r = await fetch(url.toString());
          const d = await r.json();
          return { city, forecast: d.forecast.slice(0, 8) };
        });

        const results = await Promise.all(promises);
        setCitiesData(results);

        // 3. Verificar userCity en localStorage

        if (userCity) {
          console.log("userCity encontrada:", userCity);
          // Aquí más adelante haremos fetch
        } else {
          console.log("No hay userCity guardada");
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    loadAll();
  }, [apiUrl]);

  if (loading) {
    return (
      <div class="text-center py-8">
        <p class="text-gray-600 animate-pulse text-sm md:text-base">
          Cargando el tiempo en {country || "España"}...
        </p>
      </div>
    );
  }

  if (!country || citiesData.length === 0) {
    return (
      <p class="text-center text-red-600 py-8 text-sm md:text-base">
        No se pudo cargar el pronóstico.
      </p>
    );
  }

  return (
    <div class="space-y-6 md:space-y-8">
      <h2 class="text-lg md:text-xl font-bold text-center text-lime-900">
        El Tiempo en {country}
      </h2>

      {citiesData.map(({ city, forecast }) => (
        <div
          key={city}
          class={`bg-white rounded-lg md:rounded-xl shadow-sm border overflow-hidden ${
            city === localStorage.getItem("userCity")
              ? "border-lime-700 border-2"
              : "border-gray-200"
          }`}
        >
          <div
            class={`px-3 py-1.5 md:px-4 md:py-2 text-white ${
              city === localStorage.getItem("userCity")
                ? "bg-gradient-to-r from-lime-700 to-lime-800"
                : "bg-gradient-to-r bg-despertar-dark"
            }`}
          >
            <h3 class="text-base md:text-lg font-semibold text-center md:text-left">
              {city === localStorage.getItem("userCity")
                ? `Tu ciudad: ${city}`
                : `Pronóstico en ${city}`}
            </h3>
          </div>

          {/* Tabla responsive */}
          <div class="overflow-x-auto">
            <table class="w-full text-xs md:text-sm">
              <thead class="bg-gray-50 text-gray-600">
                <tr>
                  <th class="px-2 py-1.5 md:px-4 md:py-2 text-left font-medium">
                    Hora
                  </th>
                  <th class="px-2 py-1.5 md:px-4 md:py-2 text-center font-medium">
                    Clima
                  </th>
                  <th class="px-2 py-1.5 md:px-4 md:py-2 text-center font-medium">
                    Temp
                  </th>
                  <th class="px-2 py-1.5 md:px-4 md:py-2 text-center font-medium">
                    Sensación
                  </th>
                  <th class="px-2 py-1.5 md:px-4 md:py-2 text-center font-medium">
                    Humedad
                  </th>
                  <th class="px-2 py-1.5 md:px-4 md:py-2 text-center font-medium">
                    Viento
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                {forecast.map((item) => (
                  <tr
                    key={item.time}
                    class="hover:bg-blue-50 transition-colors"
                  >
                    <td class="px-2 py-2 md:px-4 md:py-2 font-medium text-gray-800 text-xs md:text-sm">
                      {item.time.replace(":00", "h")}
                    </td>
                    <td class="px-2 py-2 md:px-4 md:py-2 text-center text-lg md:text-2xl">
                      {getIcon(item.description)}
                    </td>
                    <td class="px-2 py-2 md:px-4 md:py-2 text-center">
                      <strong class="text-xs md:text-sm">
                        {Math.round(item.temperature)}°C
                      </strong>
                    </td>
                    <td class="px-2 py-2 md:px-4 md:py-2 text-center text-gray-600 text-xs md:text-sm">
                      {Math.round(item.feels_like)}°C
                    </td>
                    <td class="px-2 py-2 md:px-4 md:py-2 text-center text-xs md:text-sm">
                      {item.humidity}%
                    </td>
                    <td class="px-2 py-2 md:px-4 md:py-2 text-center text-gray-600 text-xs md:text-sm">
                      {item.wind_speed.toFixed(1)} m/s
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Pie de página responsive */}
      <p class="text-xs md:text-sm text-center text-gray-500 mt-4 md:mt-6">
        Actualizado:{" "}
        {new Date().toLocaleString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
          day: "numeric",
          month: "short",
        })}
      </p>
    </div>
  );
}
