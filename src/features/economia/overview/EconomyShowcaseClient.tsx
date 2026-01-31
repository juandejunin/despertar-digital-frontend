// EconomyShowcaseClient.tsx
/** @jsxImportSource preact */
import { useState, useEffect } from "preact/hooks";
import EconomyShowcase from "./islands/EconomyShowcase";
import { cryptoDataToSlide } from "@/features/economia/adapters/cryptoToEconomySlide";
import type { CryptoSlide } from "../../economia/crypto/types/CryptoSlide";
import type { ForexSlide } from "../../economia/forex/types/ForexSlide";

export default function EconomyShowcaseClient() {
  const CRYPTO_API = "https://despertardigital.es/api/crypto/top?limit=10";
  const FOREX_API = "https://despertardigital.es/api/forex/global";

  const [cryptoSlides, setCryptoSlides] = useState<CryptoSlide[]>([]);
  const [forexSlides, setForexSlides] = useState<ForexSlide[]>([]);

  useEffect(() => {
    fetch(CRYPTO_API)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setCryptoSlides(data.data.map(cryptoDataToSlide));
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch(FOREX_API)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setForexSlides(
            data.data.map((f: any) => ({
              ...f,
              currency: f.pair.split("/")[1],
              type: "forex",
            }))
          );
        }
      })
      .catch(console.error);
  }, []);

  return <EconomyShowcase cryptoSlides={cryptoSlides} forexSlides={forexSlides} />;
}
