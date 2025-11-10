// /** @jsxImportSource preact */
// import { useState } from "preact/hooks";

// interface Props {
//   apiBase: string;
//   onLocationDetected?: (city: string) => void; // callback opcional
// }

// export default function LocationButtonIsland({
//   apiBase,
//   onLocationDetected,
// }: Props) {
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState<string | null>(null);
//   const [city, setCity] = useState<string>("");

//   const fetchCityByCoords = async (lat: number, lon: number) => {
//     try {
//       // 🔒 Normalizamos apiBase
//       const cleanBase = apiBase.replace(/\/+$/, ""); // quita barras finales
//       const url = `${cleanBase}/config/location/city?lat=${lat}&lon=${lon}`;

//       const res = await fetch(url);
//       if (!res.ok) throw new Error(`Error: ${res.statusText}`);
//       const data = await res.json();

//       if (data?.city) {
//         setCity(data.city);
//         setMessage(`✅ Ubicación detectada: ${data.city}`);
//         onLocationDetected?.(data.city); // notifica al componente padre
//         // 🟢 Guarda la ciudad para que otros componentes (como WeatherBar) puedan leerla
//         localStorage.setItem("userCity", data.city);

//         // 🟢 Lanza un evento global para actualizar el clima en vivo
//         window.dispatchEvent(
//           new CustomEvent("citySelected", { detail: data.city })
//         );
//       } else {
//         throw new Error("Ciudad no encontrada");
//       }
//     } catch (err) {
//       setMessage("⚠️ No se pudo obtener la ubicación.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGetLocation = () => {
//     setMessage(null);
//     setLoading(true);

//     if (!navigator.geolocation) {
//       setMessage("🌍 Tu navegador no soporta geolocalización.");
//       setLoading(false);
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         fetchCityByCoords(latitude, longitude);
//       },
//       () => {
//         setMessage(
//           "⚠️ No se pudo acceder a tu ubicación. Verifica los permisos."
//         );
//         setLoading(false);
//       }
//     );
//   };

//   return (
//     <div class="flex flex-col items-center gap-2">
//       <button
//         onClick={handleGetLocation}
//         class="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full transition duration-200 shadow-md"
//       >
//         {loading ? "🔄 Detectando ubicación..." : " Usar mi ubicación"}
//       </button>

//       {message && (
//         <p class="text-green-700 bg-green-100 border border-green-300 px-3 py-2 rounded-lg text-sm text-center w-full max-w-md">
//           {message}
//         </p>
//       )}

//       {city && (
//         <p class="text-sm text-gray-600 italic mt-1">
//           Ciudad actual: <strong>{city}</strong>
//         </p>
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
      const cleanBase = apiBase.replace(/\/+$/, "");
      const url = `${cleanBase}/config/location/city?lat=${lat}&lon=${lon}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Error: ${res.statusText}`);
      const data = await res.json();

      if (data?.city) {
        setCity(data.city);
        setMessage(`✅ Ubicación detectada: ${data.city}`);
        onLocationDetected?.(data.city);
        localStorage.setItem("userCity", data.city);
        window.dispatchEvent(
          new CustomEvent("citySelected", { detail: data.city })
        );
      } else {
        throw new Error("Ciudad no encontrada");
      }
    } catch {
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
        class="flex items-center gap-2 bg-green-900 hover:bg-green-600 text-white px-5 py-2 rounded-full transition duration-200 shadow-md"
      >
        {loading ? "🔄 Detectando ubicación..." : "Usar mi ubicación"}
      </button>

      {/* 🟢 Contenedor con altura fija para mensajes */}
      <div class="min-h-[60px] flex flex-col items-center justify-center w-full max-w-md transition-all duration-200">
        {message ? (
          <p class="text-green-700 px-3 py-2 rounded-lg text-sm text-center w-full">
            {message}
          </p>
        ) : (
          <div class="h-[38px]" /> // Espacio reservado cuando no hay mensaje
        )}

        {city && (
          <p class="text-sm text-gray-600 italic mt-1">
            Ciudad actual: <strong>{city}</strong>
          </p>
        )}
      </div>
    </div>
  );
}
