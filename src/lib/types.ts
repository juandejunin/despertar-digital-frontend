export interface CryptoCurrency {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
}

export interface MajorRates {
  EUR: number;
  GBP: number;
  JPY: number;
  CHF: number;
  CAD: number;
  AUD: number;
  base: string;
  updated: string;
}

export interface LatinAmericaRates {
  BRL: number;
  MXN: number;
  base: string;
  updated: string;
}

export interface ForexGlobalResponse {
  success: boolean;
  majorCurrencies: MajorRates;
  latinAmerica: LatinAmericaRates;
  provider: string;
  timestamp: string;
}
