import type { EconomySlideBase } from '../../overview/types/EconomySlideBase';

export interface CountryEconomySlide extends EconomySlideBase {
  type: 'country-economy';
  country: string;
  currency: string;
  gdp?: number;
  inflation?: number;
  unemployment?: number;
  lastUpdated?: string;
}
