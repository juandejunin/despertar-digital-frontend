


// src/features/economia/cripto/services/getTopCryptos.ts
import type { CryptoData } from "../types/crypto";

const API_BASE = import.meta.env.PUBLIC_API_URL || "https://despertardigital.es";

export async function getTopCryptos(): Promise<CryptoData[]> {
  const res = await fetch(`${API_BASE}/crypto/top`);
  if (!res.ok) throw new Error("Error al cargar criptos");
  const json = await res.json();
  return json.data;
}

