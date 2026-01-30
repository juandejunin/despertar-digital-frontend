/** @jsxImportSource preact */
import type { ForexSlide } from "../types/ForexSlide";
import type { CryptoSlide } from "../../crypto/types/CryptoSlide";

type Props = {
  item: ForexSlide | CryptoSlide;
};

export default function EconomyItem({ item }: Props) {
  // 🪙 Crypto
  if (item.type === "crypto") {
    return (
      <div class="flex flex-col items-center gap-2 p-4 bg-white rounded-lg shadow-sm border border-gray-100 w-64">
        <p class="text-lg font-bold text-gray-800">{item.symbol}</p>
        <p class="text-gray-600">{item.name}</p>

        {item.priceUsd !== undefined ? (
          <p class="text-xl font-semibold text-gray-900">${item.priceUsd.toFixed(2)}</p>
        ) : (
          <p class="text-sm text-gray-400">Precio no disponible</p>
        )}

        <div class="flex flex-col gap-1 mt-2 w-full text-sm">
          {item.change1h !== undefined && (
            <p class={item.change1h >= 0 ? "text-green-600" : "text-red-600"}>
              1h: {item.change1h.toFixed(2)}%
            </p>
          )}
          {item.change24h !== undefined && (
            <p class={item.change24h >= 0 ? "text-green-600" : "text-red-600"}>
              24h: {item.change24h.toFixed(2)}%
            </p>
          )}
          {item.change7d !== undefined && (
            <p class={item.change7d >= 0 ? "text-green-600" : "text-red-600"}>
              7d: {item.change7d.toFixed(2)}%
            </p>
          )}
        </div>
      </div>
    );
  }

  // 💱 Forex
  if (item.type === "forex") {
    return (
      <div class="flex flex-col items-center gap-2 p-4 bg-white rounded-lg shadow-sm border border-gray-100 w-64">
        <p class="text-lg font-bold text-gray-800">USD / {item.currency}</p>

        <p class="text-xl font-semibold text-gray-900">
          {item.today !== undefined ? item.today.toFixed(4) : "N/A"}
        </p>

        <div class="flex flex-col gap-1 mt-2 w-full text-sm">
          {item.change1d !== undefined && (
            <p class={item.change1d >= 0 ? "text-green-600" : "text-red-600"}>
              24h: {item.change1d.toFixed(2)}%
            </p>
          )}
          {item.change7d !== undefined && (
            <p class={item.change7d >= 0 ? "text-green-600" : "text-red-600"}>
              7d: {item.change7d.toFixed(2)}%
            </p>
          )}
          {item.change30d !== undefined && (
            <p class={item.change30d >= 0 ? "text-green-600" : "text-red-600"}>
              30d: {item.change30d.toFixed(2)}%
            </p>
          )}
          {item.change180d !== undefined && (
            <p class={item.change180d >= 0 ? "text-green-600" : "text-red-600"}>
              180d: {item.change180d.toFixed(2)}%
            </p>
          )}
          {item.change365d !== undefined && (
            <p class={item.change365d >= 0 ? "text-green-600" : "text-red-600"}>
              365d: {item.change365d.toFixed(2)}%
            </p>
          )}
        </div>
      </div>
    );
  }

  return null;
}
