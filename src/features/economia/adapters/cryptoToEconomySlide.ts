import type { CryptoData } from '../crypto/types/crypto';
import type { CryptoSlide } from '../crypto/types/CryptoSlide';

export function cryptoDataToSlide(data: CryptoData): CryptoSlide {
  return {
    id: data.id,           // usamos el id de la cripto
    kind: 'crypto',        // obligatorio para EconomySlideBase
    type: 'crypto',
    symbol: data.symbol.toUpperCase(),
    name: data.name,
    priceUsd: data.price,      // mapeamos price a priceUsd
    change24h: data.change24h,
    change1h: undefined,      // no lo tenemos aún
    change7d: undefined,      // no lo tenemos aún
  };
}
