import type { EconomySlideBase } from '../../overview/types/EconomySlideBase';

export interface CommoditySlide extends EconomySlideBase {
  type: 'commodity';
  name: string;
  symbol?: string;
  price?: number;
  change1d?: number;
  change1w?: number;
}
