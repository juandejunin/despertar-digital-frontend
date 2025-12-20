const API_BASE = "https://despertardigital.es";

export interface DollarRate {
  casa: string;
  nombre: string;
  compra: number;
  venta: number;
  fechaActualizacion: string;
}

export async function getArgentinaDollars(): Promise<DollarRate[]> {
  const res = await fetch(`${API_BASE}/api/economy/argentina/dolares`);
  if (!res.ok) throw new Error("Error dólares");
  return res.json();
}

export async function getCryptoTop5() {
  const res = await fetch(`${API_BASE}/api/crypto/top5`);
  if (!res.ok) throw new Error("Error crypto");
  const json = await res.json();
  return json.data;
}

export async function getForexGlobal() {
  const res = await fetch(`${API_BASE}/api/economy/forex/global`);
  if (!res.ok) throw new Error("Error forex");
  return res.json();
}
