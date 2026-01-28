export interface ForexSlide {
  currency: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
}
