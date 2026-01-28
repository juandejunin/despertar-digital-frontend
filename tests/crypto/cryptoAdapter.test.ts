// test/cryptoAdapter.test.ts
import type { CryptoData } from '@/features/economia/crypto/types/crypto';
import type { CryptoSlide } from '@/features/economia/crypto/types/CryptoSlide';
import { cryptoDataToSlide } from '@/features/economia/adapters/cryptoToEconomySlide';

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

describe('cryptoDataToSlide Adapter', () => {
  it('should convert CryptoData to CryptoSlide correctly', () => {
    const slides: CryptoSlide[] = mockCryptoData.map(cryptoDataToSlide);

    expect(slides).toHaveLength(2);

    // Chequeamos el primer slide
    expect(slides[0]).toMatchObject({
      id: 'bitcoin',
      kind: 'crypto',
      type: 'crypto',
      symbol: 'BTC',
      name: 'Bitcoin',
      priceUsd: 87432,
      change24h: 2.15,
    });

    // Chequeamos el segundo slide
    expect(slides[1]).toMatchObject({
      id: 'ethereum',
      kind: 'crypto',
      type: 'crypto',
      symbol: 'ETH',
      name: 'Ethereum',
      priceUsd: 5623,
      change24h: -1.12,
    });
  });
});
