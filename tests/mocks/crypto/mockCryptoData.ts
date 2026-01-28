// src/features/economia/crypto/mocks/mockCryptoData.ts
import type { CryptoData } from '@/features/economia/crypto/types/crypto';

export const mockCryptoData: CryptoData[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 87432,
    change24h: 2.15,
    marketCap: 1712345678901,
    volume24h: 5000000000,
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    lastUpdated: '2025-12-19T11:14:00.000Z',
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 5623,
    change24h: -1.12,
    marketCap: 567890123456,
    volume24h: 2000000000,
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    lastUpdated: '2025-12-19T11:14:00.000Z',
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    price: 1.23,
    change24h: 0.45,
    marketCap: 40012345678,
    volume24h: 150000000,
    image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
    lastUpdated: '2025-12-19T11:14:00.000Z',
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    price: 123.45,
    change24h: 3.2,
    marketCap: 23456789012,
    volume24h: 350000000,
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    lastUpdated: '2025-12-19T11:14:00.000Z',
  },
];
