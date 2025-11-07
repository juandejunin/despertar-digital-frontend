// /** @jsxImportSource preact */
// import { useState } from 'preact/hooks';

// interface CitySuggestion {
//   name: string;
//   country: string;
//   state?: string;
//   lat: number;
//   lon: number;
// }

// export default function CitySearchIsland({ apiBase }: { apiBase: string }) {
//   const [query, setQuery] = useState('');
//   const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
//   const [loading, setLoading] = useState(false);

//   async function handleInput(e: Event) {
//     const value = (e.target as HTMLInputElement).value;
//     setQuery(value);

//     if (value.length < 2) {
//       setSuggestions([]);
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch(`${apiBase}/config/cities?q=${encodeURIComponent(value)}`);
//       const data: CitySuggestion[] = await res.json();
//       setSuggestions(data);
//     } catch (err) {
//       console.error("Error fetching cities:", err);
//       setSuggestions([]);
//     } finally {
//       setLoading(false);
//     }
//   }

//   function handleSelect(cityName: string) {
//     setQuery(cityName);
//     setSuggestions([]);
//   }

//   return (
//     <div class="relative w-full max-w-md mx-auto">
//       <input
//         type="text"
//         value={query}
//         onInput={handleInput}
//         placeholder="Buscar ciudad..."
//         class="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
//       />

//       {!loading && suggestions.length > 0 && (
//         <ul class="absolute w-full bg-white border rounded-md mt-1 shadow-lg z-10">
//           {suggestions.map((s) => (
//             <li
//               class="p-2 hover:bg-blue-100 cursor-pointer"
//               onClick={() => handleSelect(s.name)}
//             >
//               {s.name}, {s.state ? `${s.state}, ` : ''}{s.country}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

/** @jsxImportSource preact */
import { useState } from "preact/hooks";

interface Props {
  apiBase: string;
  onLocationDetected?: (city: string) => void;
}

export default function LocationButtonIsland({
  apiBase,
  onLocationDetected,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [city, setCity] = useState<string>("");

  const fetchCityByCoords = async (lat: number, lon: number) => {
    try {
      const res = await fetch(
        `${apiBase}/config/location/city?lat=${lat}&lon=${lon}`
      );
      if (!res.ok) throw new Error(`Error: ${res.statusText}`);
      const data = await res.json();

      if (data?.city) {
        setCity(data.city);
        setMessage(`✅ Ubicación detectada: ${data.city}`);
        onLocationDetected?.(data.city);

        // 🟢 Nuevo: guardar en localStorage
        try {
          localStorage.setItem("userCity", data.city);
        } catch (e) {
          console.warn("No se pudo guardar la ciudad en localStorage:", e);
        }

        // 🟢 Nuevo: emitir evento global
        try {
          window.dispatchEvent(
            new CustomEvent("citySelected", { detail: data.city })
          );
        } catch (e) {
          console.warn("Error enviando evento citySelected:", e);
        }
      } else {
        throw new Error("Ciudad no encontrada");
      }
    } catch (err) {
      console.error("Error obteniendo ciudad:", err);
      setMessage("⚠️ No se pudo obtener la ubicación.");
    } finally {
      setLoading(false);
    }
  };

  const handleGetLocation = () => {
    setMessage(null);
    setLoading(true);

    if (!navigator.geolocation) {
      setMessage("🌍 Tu navegador no soporta geolocalización.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchCityByCoords(latitude, longitude);
      },
      () => {
        setMessage(
          "⚠️ No se pudo acceder a tu ubicación. Verifica los permisos."
        );
        setLoading(false);
      }
    );
  };

  return (
    <div class="flex flex-col items-center gap-1">
      <button
        onClick={handleGetLocation}
        class="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full transition duration-200 shadow-md"
      >
        {loading ? "🔄 Detectando ubicación..." : "📍 Usar mi ubicación"}
      </button>

      {message && (
        <p class="text-green-700 bg-green-100 border border-green-300 px-3 py-2 rounded-lg text-sm text-center w-full max-w-md">
          {message}
        </p>
      )}

      {city && (
        <p class="text-sm text-gray-600 italic mt-1">
          Ciudad actual: <strong>{city}</strong>
        </p>
      )}
    </div>
  );
}
