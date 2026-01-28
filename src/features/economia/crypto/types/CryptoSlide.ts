import type { EconomySlideBase } from '../../overview/types/EconomySlideBase';

export interface CryptoSlide extends EconomySlideBase {
  type: 'crypto';
  symbol: string;
  name: string;
  priceUsd?: number;
  change1h?: number;
  change24h?: number;
  change7d?: number;
}
