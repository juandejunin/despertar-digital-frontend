// src/features/economia/forex/mocks/mockForexData.ts  (o en tests/mocks/forex/)
// Este mock simula el OUTPUT del adapter forexTrendToSlide()
// Es decir: array de ForexSlide[] listo para usar

import type { ForexSlide } from "@/features/economia/forex/types/ForexSlide";

export const mockForexSlides: ForexSlide[] = [
  // Dólar Blue (custom, no viene del backend Frankfurter, pero lo agregamos manual)
  {
    type: "forex",
    pair: "USD/ARS_BLUE",
    today: 1475,                    // venta blue actual
    change1d: -0.34,
    change7d: -3.9,
    change30d: -3.9,
    change180d: -10.5,              // aproximado
    change365d: 20.0,               // anual aproximado
    id: "forex-ars-blue",
    kind: "forex",                  // o "dolar-blue" si kind es más específico en tu base
  },

  // Oficial (similar, custom)
  {
    type: "forex",
    pair: "USD/ARS_OFICIAL",
    today: 1465,
    change1d: 0.0,
    change7d: -1.0,
    change30d: -1.0,
    change180d: -5.0,
    change365d: 15.0,
    id: "forex-ars-oficial",
    kind: "forex",
  },

  // MEP y CCL (custom)
  {
    type: "forex",
    pair: "USD/ARS_MEP",
    today: 1460,
    change1d: 0.1,
    change7d: -1.5,
    change30d: -2.0,
    id: "forex-ars-mep",
    kind: "forex",
  },
  {
    type: "forex",
    pair: "USD/ARS_CCL",
    today: 1505,
    change1d: -0.8,
    change7d: -2.0,
    change30d: -4.0,
    id: "forex-ars-ccl",
    kind: "forex",
  },

  // Pares del backend (Frankfurter) – formato 1 USD = X moneda extranjera
  {
    type: "forex",
    pair: "USD/EUR",
    today: 0.839,                   // directo del JSON
    change1d: -0.50,                // aproximado real del día
    change7d: 0.80,
    change30d: 2.10,
    change180d: 12.50,
    change365d: 15.20,
    id: "forex-eur",
    kind: "forex",
  },
  {
    type: "forex",
    pair: "USD/BRL",
    today: 5.2213,
    change1d: 0.35,
    change7d: -1.20,
    change30d: -3.80,
    id: "forex-brl",
    kind: "forex",
  },
  {
    type: "forex",
    pair: "USD/MXN",
    today: 17.2817,
    change1d: -0.15,
    change7d: -2.5,
    change30d: -5.0,
    id: "forex-mxn",
    kind: "forex",
  },

  // Agregá más del currencyNames si querés (GBP, JPY, etc.)
  {
    type: "forex",
    pair: "USD/GBP",
    today: 0.72674,
    change1d: -0.20,
    change7d: 1.0,
    id: "forex-gbp",
    kind: "forex",
  },
];