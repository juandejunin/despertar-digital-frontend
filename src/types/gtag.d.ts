// src/types/gtag.d.ts
interface Window {
  dataLayer: unknown[];  // unknown[] es más seguro que any[]
  gtag?: (...args: unknown[]) => void;
}