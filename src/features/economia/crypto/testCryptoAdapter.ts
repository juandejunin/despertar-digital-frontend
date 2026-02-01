// src/features/economia/crypto/testCryptoAdapter.ts
import type { CryptoData } from './types/crypto';
import type { CryptoSlide } from './types/CryptoSlide';
import { cryptoDataToSlide } from '../adapters/cryptoToEconomySlide';

// Mock de datos como los que devuelve el backend
const mockCryptoData: CryptoData[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'btc',
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
    symbol: 'eth',
    price: 5623,
    change24h: -1.12,
    marketCap: 567890123456,
    volume24h: 2000000000,
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    lastUpdated: '2025-12-19T11:14:00.000Z',
  },
];

// Convertimos los datos a slides usando el adapter
const cryptoSlides: CryptoSlide[] = mockCryptoData.map(cryptoDataToSlide);

// Mostramos los resultados en consola
console.log('=== Crypto Slides ===');
cryptoSlides.forEach(slide => console.log(slide));
