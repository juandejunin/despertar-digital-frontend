import { cryptoDataToSlide } from '@/features/economia/adapters/cryptoToEconomySlide';
import type { CryptoSlide } from '@/features/economia/crypto/types/CryptoSlide';
import { mockCryptoData } from '../mocks/crypto/mockCryptoData'

describe('Adaptador cryptoDataToSlide', () => {
  it('debería convertir correctamente un CryptoData a CryptoSlide', () => {
    const slides: CryptoSlide[] = mockCryptoData.map(cryptoDataToSlide);

    expect(slides).toHaveLength(mockCryptoData.length);

    expect(slides[0]).toMatchObject({
      id: 'bitcoin',
      kind: 'crypto',
      type: 'crypto',
      symbol: 'BTC',
      name: 'Bitcoin',
      priceUsd: 87432,
      change24h: 2.15,
    });

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
