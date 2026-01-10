import type { CryptoData } from "../types/crypto";

const API_BASE = import.meta.env.PUBLIC_API_URL || "https://despertardigital.es";

export async function getCryptoById(id: string): Promise<CryptoData> {
  const res = await fetch(`${API_BASE}/crypto/${id}`);
  if (!res.ok) throw new Error(`No se pudo cargar la criptomoneda ${id}`);

  const json = await res.json();
  return json.data;
}
