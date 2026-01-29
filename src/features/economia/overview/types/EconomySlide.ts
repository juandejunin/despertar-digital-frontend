import type { ForexSlide } from '../../forex/types/ForexSlide';
import type { CryptoSlide } from '../../crypto/types/CryptoSlide';
import type { PlaceholderSlide } from './PlaceholderSlide';

export type EconomySlide =
  | ForexSlide
  | CryptoSlide
  | PlaceholderSlide;
// | CountryEconomySlide
// | CommoditySlide
