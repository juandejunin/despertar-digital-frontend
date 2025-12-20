// src/components/economy-client/CryptoTable.jsx
import { h } from 'preact';

const formatCurrency = (value, currency = 'USD') => {
  if (value === undefined || value === null) return 'N/A';
  if (typeof value === 'string') value = parseFloat(value);
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: value < 1 ? 6 : 2
  }).format(value);
};

const formatPercent = (value) => {
  if (value === undefined || value === null) return 'N/A';
  if (typeof value === 'string') value = parseFloat(value);
  
  const colorClass = value >= 0 ? 'text-green-600' : 'text-red-600';
  const symbol = value >= 0 ? '↗' : '↘';
  
  return (
    <span class={`${colorClass} font-semibold`}>
      {symbol} {Math.abs(value).toFixed(2)}%
    </span>
  );
};

const formatMarketCap = (value) => {
  if (value === undefined || value === null) return 'N/A';
  if (typeof value === 'string') value = parseFloat(value);
  
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return `$${value.toFixed(2)}`;
};

export default function CryptoTable({ data = [], module = 'crypto' }) {
  if (!data || data.length === 0) {
    return (
      <div class="text-center py-8 text-gray-500">
        No hay datos disponibles de criptomonedas.
      </div>
    );
  }

  return (
    <div class="bg-white rounded-lg shadow overflow-hidden w-full">
      <div class="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-3 py-2">
        <h3 class="font-bold text-[13px] leading-tight">💰 Mercado Cripto</h3>
        <p class="text-[9px] opacity-90">Precios en tiempo real - 24h</p>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-xs">
          <thead class="bg-gradient-to-r from-purple-700 to-indigo-800 text-white text-[11px]">
            <tr>
              <th class="w-6 px-1 py-1.5">#</th>
              <th class="px-1 py-1.5 text-left">Cripto</th>
              <th class="w-16 px-1 py-1.5 text-center">Precio</th>
              <th class="w-12 px-1 py-1.5 text-center max-[340px]:hidden">24h %</th>
              <th class="w-16 px-1 py-1.5 text-center max-[380px]:hidden">Cap. Mercado</th>
              <th class="w-12 px-1 py-1.5 text-center hidden md:table-cell">Volumen</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            {data.slice(0, 10).map((crypto, i) => {
              // Datos con valores por defecto para evitar errores
              const symbol = crypto.symbol || crypto.ticker || '---';
              const name = crypto.name || 'Unknown';
              const price = crypto.price || crypto.last_price || crypto.current_price || 0;
              const change24h = crypto.change_24h || crypto.price_change_percentage_24h || 0;
              const marketCap = crypto.market_cap || crypto.market_cap_rank || 0;
              const volume = crypto.volume_24h || crypto.total_volume || 0;
              
              return (
                <tr key={`${symbol}-${i}`} class="hover:bg-gray-50 h-11 group">
                  <td class="px-1 py-1 text-center">
                    <div class="font-bold text-gray-700 text-xs flex items-center justify-center">
                      {i + 1}
                    </div>
                  </td>
                  
                  <td class="px-1 py-1">
                    <div class="flex items-center gap-2">
                      {/* Puedes añadir íconos de criptomonedas aquí */}
                      <div class="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                        <span class="text-white text-[10px] font-bold">
                          {symbol.substring(0, 2)}
                        </span>
                      </div>
                      <div class="min-w-0 flex-1">
                        <div class="font-bold text-gray-900 truncate text-[11px] leading-tight">
                          {name}
                        </div>
                        <div class="text-[8px] text-gray-500 truncate leading-none flex items-center gap-1">
                          <span class="bg-gray-100 px-1 rounded">{symbol.toUpperCase()}</span>
                          {crypto.rank && (
                            <span class="text-[7px] text-gray-400">Rank #{crypto.rank}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td class="px-1 py-1 text-center">
                    <div class="flex flex-col items-center">
                      <span class="font-bold text-gray-900 text-xs">
                        {formatCurrency(price)}
                      </span>
                      {crypto.high_24h && crypto.low_24h && (
                        <div class="text-[8px] text-gray-500 mt-0.5">
                          H:{formatCurrency(crypto.high_24h)} • L:{formatCurrency(crypto.low_24h)}
                        </div>
                      )}
                    </div>
                  </td>
                  
                  <td class="px-1 py-1 text-center max-[340px]:hidden">
                    <div class="flex flex-col items-center">
                      {formatPercent(change24h)}
                      {crypto.price_change_24h && (
                        <div class={`text-[8px] mt-0.5 ${crypto.price_change_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {crypto.price_change_24h >= 0 ? '+' : ''}{formatCurrency(crypto.price_change_24h)}
                        </div>
                      )}
                    </div>
                  </td>
                  
                  <td class="px-1 py-1 text-center text-gray-700 font-medium text-xs max-[380px]:hidden">
                    <div class="flex flex-col items-center">
                      <span class="font-semibold">{formatMarketCap(marketCap)}</span>
                      {crypto.market_cap_change_24h && (
                        <div class={`text-[8px] ${crypto.market_cap_change_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {crypto.market_cap_change_24h >= 0 ? '+' : ''}{formatPercent(crypto.market_cap_change_24h)}
                        </div>
                      )}
                    </div>
                  </td>
                  
                  <td class="px-1 py-1 text-center text-gray-600 text-[10px] hidden md:table-cell">
                    <div class="flex flex-col items-center">
                      <span>{formatMarketCap(volume)}</span>
                      {crypto.circulating_supply && crypto.total_supply && (
                        <div class="w-16 h-1 bg-gray-200 rounded-full overflow-hidden mt-1">
                          <div 
                            class="h-full bg-gradient-to-r from-blue-400 to-cyan-400"
                            style={{ width: `${Math.min(100, (crypto.circulating_supply / crypto.total_supply) * 100)}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer con información adicional */}
      <div class="border-t bg-gradient-to-r from-gray-50 to-gray-100">
        <div class="px-3 py-2 flex flex-wrap justify-between items-center">
          <div class="text-[8px] text-gray-600">
            <span class="font-semibold">Total mercado:</span>{' '}
            {formatMarketCap(data.reduce((sum, crypto) => sum + (crypto.market_cap || 0), 0))}
          </div>
          <div class="text-[8px] text-gray-600 flex items-center gap-2">
            <span class="flex items-center gap-1">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Alza</span>
            </span>
            <span class="flex items-center gap-1">
              <div class="w-2 h-2 rounded-full bg-red-500"></div>
              <span>Baja</span>
            </span>
          </div>
          <div class="text-[8px] text-gray-500">
            Actualizado: {new Date().toLocaleTimeString("es-ES", { 
              hour: "2-digit", 
              minute: "2-digit" 
            })}
          </div>
        </div>
      </div>
    </div>
  );
}