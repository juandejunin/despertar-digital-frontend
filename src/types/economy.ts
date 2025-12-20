// src/types/economy.ts
export interface ForexItem {
  symbol: string;
  name: string;
  last_price: number;
  change_24h: number;
  high_24h: number;
  low_24h: number;
  base?: string;
  quote?: string;
}

export interface CryptoItem {
  symbol: string;
  name: string;
  price: number;
  change_24h: number;
  market_cap: number;
  volume_24h: number;
}

export interface ArgentinaItem {
  tipo: string;
  compra: number;
  venta: number;
  variacion: number;
  fecha_actualizacion: string;
}