// src/features/economia/forex/types/ForexTrendBackend.ts

export interface ForexComparison {
  daysAgo: number;
  date: string; // YYYY-MM-DD
  rate: number;
}

export interface ForexTrendBackend {
  currency: string;              // ej: "AUD", "BRL"
  today: number;                 // valor actual de la divisa
  comparisons: ForexComparison[]; // histórico de cambios
}
