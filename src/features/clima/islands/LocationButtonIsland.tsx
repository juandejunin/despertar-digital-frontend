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
        setMessage(`¡Ubicación detectada! ${data.city}`);
        onLocationDetected?.(data.city);
        localStorage.setItem("userCity", data.city);
        window.dispatchEvent(
          new CustomEvent("citySelected", { detail: data.city })
        );
      } else {
        throw new Error("Ciudad no encontrada");
      }
    } catch (err) {
      setMessage("No pudimos detectar tu ubicación. Prueba manualmente.");
    } finally {
      setLoading(false);
    }
  };

  const handleGetLocation = () => {
    setMessage(null);
    setLoading(true);

    if (!navigator.geolocation) {
      setMessage("Tu navegador no soporta geolocalización.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchCityByCoords(latitude, longitude);
      },
      () => {
        setMessage("Permiso denegado. Actívalo en ajustes o ingresa tu ciudad manualmente.");
        setLoading(false);
      }
    );
  };

  return (
    <div class="flex flex-col items-center gap-2">
      <button
        onClick={handleGetLocation}
        disabled={loading}
        class={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 shadow-md
          ${loading 
            ? "bg-gray-600 cursor-wait" 
            : "bg-green-900 hover:bg-green-700 text-white"}`}
      >
        {loading ? (
          <>
            <span class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
            Detectando...
          </>
        ) : (
          "Usar mi ubicación actual"
        )}
      </button>

      <div class="min-h-[60px] flex flex-col items-center justify-center w-full max-w-md">
        {message && (
          <p class={`text-sm px-4 py-2 rounded-lg text-center w-full transition-all duration-300
            ${message.includes("¡") ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
            {message}
          </p>
        )}

        {city && (
          <p class="text-xs text-gray-500 italic mt-2">
            Ciudad detectada: <strong>{city}</strong>
          </p>
        )}
      </div>
    </div>
  );
}