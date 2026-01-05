// src/lib/types/forex.ts (FRONTEND)

//
// 1️⃣ Tipos de monedas
//

export const currencyNames = {
  AUD: "Dólar australiano",
  BGN: "Lev búlgaro",
  BRL: "Real brasileño",
  CAD: "Dólar canadiense",
  CHF: "Franco suizo",
  CNY: "Yuan chino",
  CLP: "Peso chileno",
  COP: "Peso colombiano",
  CZK: "Corona checa",
  DKK: "Corona danesa",
  EUR: "Euro",
  GBP: "Libra esterlina",
  HKD: "Dólar de Hong Kong",
  HUF: "Forinto húngaro",
  IDR: "Rupia indonesia",
  ILS: "Shekel israelí",
  INR: "Rupia india",
  ISK: "Corona islandesa",
  JPY: "Yen japonés",
  KRW: "Won surcoreano",
  MXN: "Peso mexicano",
  MYR: "Ringgit malayo",
  NOK: "Corona noruega",
  NZD: "Dólar neozelandés",
  PEN: "Sol peruano",
  PHP: "Peso filipino",
  PLN: "Złoty polaco",
  RON: "Leu rumano",
  SEK: "Corona sueca",
  SGD: "Dólar de Singapur",
  THB: "Baht tailandés",
  TRY: "Lira turca",
  UYU: "Peso uruguayo",
  ZAR: "Rand sudafricano",
} as const;

export type CurrencyCode = keyof typeof currencyNames;

//
// 2️⃣ Tipos Forex
//

export interface ForexTrendComparison {
  daysAgo: number;
  date: string;
  rate: number;
}

export interface ForexTrend {
  currency: CurrencyCode;
  today: number;
  comparisons: ForexTrendComparison[];
}

//
// 3️⃣ Respuesta completa del backend
//

export interface ForexTrendsResponse {
  base: string;
  updated: string;
  trends: ForexTrend[];
}

// src/lib/types/forex.ts (FRONTEND, con Zod)
import { z } from "zod";

export const CurrencyCodeSchema = z.enum([
  "AUD","BGN","BRL","CAD","CHF","CNY","CLP","COP","CZK","DKK",
  "EUR","GBP","HKD","HUF","IDR","ILS","INR","ISK","JPY","KRW",
  "MXN","MYR","NOK","NZD","PEN","PHP","PLN","RON","SEK","SGD",
  "THB","TRY","UYU","ZAR"
]);

export const ForexTrendComparisonSchema = z.object({
  daysAgo: z.number(),
  date: z.string(),
  rate: z.number()
});

export const ForexTrendSchema = z.object({
  currency: CurrencyCodeSchema,
  today: z.number(),
  comparisons: z.array(ForexTrendComparisonSchema)
});

export const ForexTrendsResponseSchema = z.object({
  base: z.string(),
  updated: z.string(),
  trends: z.array(ForexTrendSchema)
});
