export interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  high24h?: number; // opcional, porque la API no siempre lo retorna
  low24h?: number;  // opcional
  image: string;
  lastUpdated: string;
}
