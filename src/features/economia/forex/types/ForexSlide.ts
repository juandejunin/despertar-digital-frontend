import type { EconomySlideBase } from "../../overview/types/EconomySlideBase";

export interface ForexSlide extends EconomySlideBase {
  type: "forex";
  pair: string;       // ej: USD/EUR
  today: number;  
  change1d?: number;
  change7d?: number;
  change30d?: number;
  change180d?: number;
  change365d?: number;
}
