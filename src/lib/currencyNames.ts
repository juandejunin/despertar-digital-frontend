// src/lib/currencyNames.ts
/**
 * Mapa de códigos ISO 4217 a nombres completos de monedas en español.
 * Usado en la tabla de Forex para mostrar nombres cuando hay espacio.
 */
export const currencyNames = {
  AUD: 'Dólar Australiano',
  BGN: 'Lev Búlgaro',
  BRL: 'Real Brasileño',
  CAD: 'Dólar Canadiense',
  CHF: 'Franco Suizo',
  CNY: 'Yuan Chino',
  CZK: 'Corona Checa',
  DKK: 'Corona Danesa',
  EUR: 'Euro',
  GBP: 'Libra Esterlina',
  HKD: 'Dólar Hongkonés',
  HUF: 'Forinto Húngaro',
  IDR: 'Rupia Indonesia',
  ILS: 'Séquel Israelí',
  INR: 'Rupia India',
  ISK: 'Corona Islandesa',
  JPY: 'Yen Japonés',
  KRW: 'Won Surcoreano',
  MXN: 'Peso Mexicano',
  MYR: 'Ringgit Malayo',
  NOK: 'Corona Noruega',
  NZD: 'Dólar Neozelandés',
  PHP: 'Peso Filipino',
  PLN: 'Zloty Polaco',
  RON: 'Leu Rumano',
  SEK: 'Corona Sueca',
  SGD: 'Dólar de Singapur',
  THB: 'Baht Tailandés',
  TRY: 'Lira Turca',
  ZAR: 'Rand Sudafricano',
} as const;

export type CurrencyCode = keyof typeof currencyNames;