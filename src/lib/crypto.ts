import type { Bitcoin } from "@/types/bitcoin";

console.log("crypto.ts cargado");


export async function getBitcoin(): Promise<Bitcoin> {
  const res = await fetch("https://despertardigital.es/api/crypto/bitcoin");

  if (!res.ok) {
    throw new Error("Error al cargar Bitcoin");
  }

  const json = await res.json();
  return json.data;
}
