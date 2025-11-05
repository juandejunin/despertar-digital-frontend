import { useEffect, useState } from "preact/hooks";

function getWindDirection(deg) {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
  return dirs[Math.round(deg / 45) % 8];
}

function getBackground(description = "") {
  description = description.toLowerCase();
  if (description.includes("claro") || description.includes("despejado")) return "from-blue-100 to-white";
  if (description.includes("nubes") || description.includes("nublado")) return "from-gray-100 to-white";
  if (description.includes("lluv")) return "from-indigo-100 to-white";
  return "from-indigo-100 to-white";
}

// Tarjeta de placeholder mientras llega la info
function PlaceholderCard() {
  return (
    <div class="bg-gray-200 rounded-2xl shadow-md p-6 text-center animate-pulse border border-gray-100">
      <div class="h-6 bg-gray-300 rounded w-2/3 mx-auto mb-2"></div>
      <div class="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-4"></div>
      <div class="h-12 bg-gray-300 rounded w-1/3 mx-auto mb-2"></div>
      <div class="h-4 bg-gray-300 rounded w-1/4 mx-auto mb-5"></div>
      <div class="flex justify-center space-x-4 border-t border-gray-200 pt-3">
        <div class="h-4 bg-gray-300 rounded w-12"></div>
        <div class="h-4 bg-gray-300 rounded w-12"></div>
        <div class="h-4 bg-gray-300 rounded w-12"></div>
      </div>
    </div>
  );
}

export default function WeatherIsland() {
  const [city, setCity] = useState("Cargando ciudad...");
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch("https://despertardigital.es/api/weather/forecast");
        if (!res.ok) throw new Error("Error en la petición");
        const data = await res.json();
        setCity(data.city || data.location?.city || "Desconocida");
        setForecast(data.forecast || []);
      } catch (err) {
        setError("No se pudo obtener el clima.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, []);

  return (
    <div class="text-center">
      <div class="bg-white rounded-2xl shadow-xl p-10 mb-8">
        <p class="text-3xl font-serif text-black 700">{city}</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading && forecast.length === 0
          ? Array.from({ length: 4 }).map((_, i) => <PlaceholderCard key={i} />)
          : forecast.map((hour) => (
        <div
        key={hour.time}
        class={`bg-gradient-to-b ${getBackground(hour.description)} rounded-2xl shadow-md hover:shadow-lg p-6 text-center transition-all duration-300 border border-gray-100`}
        >
        <h3 class="text-xl font-serif font-semibold text-gray-900 mb-1">{hour.time}</h3>
        <p class="text-gray-700 italic mb-4 capitalize font-medium">{hour.description}</p>

        <div class="text-4xl font-serif font-bold text-blue-700 mb-2">{hour.temperature.toFixed(1)}°C</div>
        <p class="text-sm text-gray-700 mb-5 font-medium">Sensación {hour.feels_like.toFixed(1)}°C</p>

        <div class="flex justify-center text-sm text-gray-700 space-x-4 border-t border-gray-200 pt-3 font-medium">
            <span>💧 {hour.humidity}%</span>
            <span>🌬️ {hour.wind_speed.toFixed(1)} m/s</span>
            <span>🧭 {getWindDirection(hour.wind_deg)}</span>
        </div>
        </div>

            ))}
      </div>

      {loading && forecast.length > 0 && (
        <p class="mt-4 text-gray-500">Actualizando pronóstico...</p>
      )}

      {error && <p class="text-red-600 mt-4">{error}</p>}
    </div>
  );
}
