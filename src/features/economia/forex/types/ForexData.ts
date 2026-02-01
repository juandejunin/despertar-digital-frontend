// features/economia/forex/types/ForexData.ts
export interface ForexData {
  id: string;          // ej: EURUSD
  pair: string;        // ej: EUR/USD
  change1d: number;    // cambio en 1 día
  change7d: number;    // cambio en 7 días
  change30d: number;   // cambio en 30 días
  change180d: number;  // cambio en 180 días
  change365d: number;  // cambio en 1 año
  lastUpdated: string; // ISO date
}
