// src/types/crypto.ts
export interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  high24h: number;
  low24h: number;
  image: string;
  lastUpdated: string;
}
