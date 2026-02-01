import type { EconomySlideBase } from "./EconomySlideBase";

export interface ForexSlide extends EconomySlideBase {
  type: 'forex';
  currency: string;          // ej: AUD, BRL
  today: number;             // valor actual
  trend?: 'up' | 'down' | 'stable';
  change1d?: number;
  change7d?: number;
  change30d?: number;
  change180d?: number;
  change365d?: number;
}

