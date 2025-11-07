/** @jsxImportSource preact */
import { useEffect, useState } from "preact/hooks";
import WeatherCard from "./WeatherCard";

interface WeatherData {
  location: { city: string; country: string };
  weather: { description: string; temperature: number; feels_like: number; humidity: number; wind_speed: number };
  air: { formatted: string };
}

interface Props {
  apiUrl: string;
}

export default function WeatherShowcase({ apiUrl }: Props) {
  const [country, setCountry] = useState<string | null>(null);
  const [cities, setCities] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userCity, setUserCity] = useState<string | null>(null);

  const countryCities: Record<string, string[]> = {
    AR: ["Buenos Aires", "La Quiaca", "Tierra del Fuego"],
    UY: ["Montevideo", "Punta del Este", "Salto"],
    PY: ["Asunción", "Ciudad del Este", "Encarnación"],
    BO: ["La Paz", "Cochabamba", "Santa Cruz de la Sierra"],
    PE: ["Lima", "Cusco", "Arequipa"],
    ES: ["Madrid", "Barcelona", "Sevilla", "Bilbao", "Valencia"],
  };

    // 🛰️ Función reutilizable para cargar ciudades
  const loadCities = (savedCity?: string | null) => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data: WeatherData) => {
        const countryCode = data?.location?.country;
        console.log("🌎 País detectado:", countryCode);
        setCountry(countryCode);
        const list = countryCities[countryCode] || [];
        const combined = savedCity ? [savedCity, ...list.filter(c => c !== savedCity)] : list;
        setCities(combined);
      })
      .catch((err) => console.error("Error obteniendo país:", err));
  };

  // 🔹 Carga inicial
  useEffect(() => {
    const savedCity = localStorage.getItem("userCity");
    setUserCity(savedCity);
    loadCities(savedCity);
  }, []);

  // 🔁 Carrusel automático
  useEffect(() => {
    if (cities.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cities.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [cities]);

  // 🔔 Nuevo: escucha cuando el usuario selecciona una nueva ciudad
  useEffect(() => {
    const handleCitySelected = (e: CustomEvent) => {
      console.log("📍 Nueva ciudad seleccionada:", e.detail);
      const newCity = e.detail;
      setUserCity(newCity);
      localStorage.setItem("userCity", newCity);
      loadCities(newCity);
    };

    window.addEventListener("citySelected", handleCitySelected as EventListener);
    return () =>
      window.removeEventListener("citySelected", handleCitySelected as EventListener);
  }, []);

  if (cities.length === 0) {
    return <div class="text-gray-500 text-center py-8">Cargando ciudades…</div>;
  }

  const currentCity = cities[currentIndex];
  return (
    <div class="relative flex justify-center items-center overflow-hidden min-h-[320px] transition-all duration-500 ease-in-out">
      <div
        key={currentCity}
        class="absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-in-out opacity-0 translate-y-5
               animate-[fadeSlideIn_0.7s_ease-in-out_forwards]"
      >
        <WeatherCard apiUrl={apiUrl} city={currentCity} />
        <p class="text-sm text-gray-500 text-center mt-2">
          {currentCity === userCity ? "Tu ciudad" : `🌍 ${currentCity}`}
        </p>
      </div>

      <style>
        {`
          @keyframes fadeSlideIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}
