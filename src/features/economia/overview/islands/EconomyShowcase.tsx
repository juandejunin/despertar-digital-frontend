/** @jsxImportSource preact */
import { useEffect, useState } from "preact/hooks";
import type { ForexSlide } from "../types/OverviewForexSlide";
import type { CryptoSlide } from "../../crypto/types/CryptoSlide";
import EconomyItem from "./EconomyItemCard";

interface EconomyShowcaseProps {
  forexSlides?: ForexSlide[];
  cryptoSlides?: CryptoSlide[];
}

export default function EconomyShowcase({ forexSlides, cryptoSlides }: EconomyShowcaseProps = {}) {
  const slides = [...(forexSlides ?? []), ...(cryptoSlides ?? [])];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Carrusel automático
  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000); // cada 5 segundos
    return () => clearInterval(interval);
  }, [slides]);

  if (slides.length === 0) {
    return <div class="text-gray-500 text-center py-8">Cargando datos…</div>;
  }

  const currentSlide = slides[currentIndex];

  return (
    <div class="relative flex justify-center items-center overflow-hidden min-h-[320px] transition-all duration-500 ease-in-out">
      <div
        key={currentSlide.id}
        class="absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-in-out opacity-0 translate-y-5
               animate-[fadeSlideIn_0.7s_ease-in-out_forwards]"
      >
        <EconomyItem item={currentSlide} />
      </div>

      <style>
        {`
          @keyframes fadeSlideIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}
