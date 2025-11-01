import { useState, useEffect } from "preact/hooks";

interface CurrencyRates {
  base: string;
  date: string;
  rates: {
    USD?: number;
    EUR?: number;
    BRL?: number;
    MXN?: number;
    ARS_oficial?: number;
    ARS_blue?: number;
    EUR_oficial?: number;
    EUR_blue?: number;
  };
}

interface Props {
  url: string;
}

export default function CurrencyCard({ url }: Props) {
  const [rates, setRates] = useState<CurrencyRates | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setRates(data))
      .catch((err) => {
        console.error("Error al obtener cotizaciones:", err);
        setError("No se pudieron cargar las cotizaciones");
      });
  }, [url]);

  return (
    <div class="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center space-y-4">
      <h3 class="text-xl font-semibold text-gray-800">Cotizaciones del día</h3>

      {error && <p class="text-red-600">{error}</p>}

      {rates ? (
        <>
          <div class="flex flex-wrap justify-center gap-4 text-gray-700">
            <span>USD → EUR: <strong>{rates.rates.EUR?.toFixed(2)}</strong></span>
            <span>USD → BRL: <strong>{rates.rates.BRL?.toFixed(2)}</strong></span>
            <span>USD → MXN: <strong>{rates.rates.MXN?.toFixed(2)}</strong></span>
            <span>ARS oficial: <strong>{rates.rates.ARS_oficial}</strong></span>
            <span>ARS blue: <strong>{rates.rates.ARS_blue}</strong></span>
            <span>EUR oficial: <strong>{rates.rates.EUR_oficial}</strong></span>
            <span>EUR blue: <strong>{rates.rates.EUR_blue}</strong></span>
          </div>
          <span class="text-gray-400 text-sm">
            Última actualización: {new Date(rates.date).toLocaleDateString()}
          </span>
        </>
      ) : (
        <span class="text-gray-500 animate-pulse">Cargando cotizaciones…</span>
      )}
    </div>
  );
}
