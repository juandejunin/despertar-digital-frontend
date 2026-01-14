// features/economia/services/getForexTrends.ts
import type { ForexTrendsResponse } from "../types/forex";
import { ForexTrendsResponseSchema } from "../types/forex";

export async function getForexTrends(): Promise<ForexTrendsResponse> {
  const t0 = performance.now();
  try {
    const res = await fetch(
      "https://despertardigital.es/api/forex/trends?days=1,7,30,180,365"
    );

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const json = await res.json();

    if (!json?.success || !json?.data) {
      throw new Error("Respuesta inválida del backend Forex");
    }

    // 👇 VALIDAMOS SOLO `data`
    return ForexTrendsResponseSchema.parse(json.data);
  } catch (err) {
    console.error("Error fetching Forex trends:", err);
    throw err;
  }
}
