// src/components/economy-client/ForexTable.jsx
import { h } from 'preact';

const formatValue = (value, decimals = 2) => {
  if (value === undefined || value === null) return 'N/A';
  return typeof value === 'number' ? value.toFixed(decimals) : value;
};

const formatChange = (change) => {
  if (change === undefined || change === null) return 'N/A';
  const changeNum = typeof change === 'number' ? change : parseFloat(change);
  return `${changeNum >= 0 ? '+' : ''}${changeNum.toFixed(2)}%`;
};

export default function ForexTable({ data = [], module = 'forex' }) {
  if (!data || data.length === 0) {
    return (
      <div class="text-center py-8 text-gray-500">
        No hay datos disponibles para {module}.
      </div>
    );
  }

  return (
    <div class="bg-white rounded-lg shadow overflow-hidden w-full">
      <div class="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-2">
        <h3 class="font-bold text-[13px] leading-tight">Mercado Forex</h3>
        <p class="text-[9px] opacity-90">Tipos de cambio en tiempo real</p>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-xs">
          <thead class="bg-blue-600 text-white text-[11px]">
            <tr>
              <th class="w-6 px-1 py-1.5">#</th>
              <th class="px-1 py-1.5 text-left">Par</th>
              <th class="w-16 px-1 py-1.5 text-center">Último Precio</th>
              <th class="w-16 px-1 py-1.5 text-center max-[340px]:hidden">Cambio 24h</th>
              <th class="w-16 px-1 py-1.5 text-center max-[380px]:hidden">Alta/Baja 24h</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            {data.slice(0, 10).map((item, i) => {
              const symbol = item.symbol || `${item.base || ''}/${item.quote || ''}`;
              const displayName = item.name || symbol;
              const price = item.last_price || item.price;
              const change = item.change_24h;
              
              return (
                // AQUÍ SÍ NECESITAS EL KEY (Preact/React)
                <tr key={`${symbol}-${i}`} class="hover:bg-gray-50 h-11">
                  <td class="px-1 py-1 text-center font-bold text-gray-700 text-xs">{i + 1}</td>
                  <td class="px-1 py-1 flex items-center gap-1">
                    <div class="min-w-0 flex-1">
                      <div class="font-medium text-gray-900 truncate text-[11px] leading-tight">
                        {symbol}
                      </div>
                      <div class="text-[8px] text-gray-500 truncate leading-none">
                        {displayName}
                      </div>
                    </div>
                  </td>
                  <td class="px-1 py-1 text-center">
                    <span class="inline-flex items-center justify-center w-14 h-6 rounded bg-blue-100 text-blue-700 font-bold text-xs">
                      {formatValue(price)}
                    </span>
                  </td>
                  <td class={`px-1 py-1 text-center font-medium text-xs max-[340px]:hidden ${
                    change === undefined ? 'text-gray-600' : 
                    parseFloat(change) >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatChange(change)}
                  </td>
                  <td class="px-1 py-1 text-center text-gray-700 text-[10px] max-[380px]:hidden">
                    {formatValue(item.high_24h)} / {formatValue(item.low_24h)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div class="px-2 py-1 text-[8px] text-gray-500 text-center border-t bg-gray-50">
        Actualizado: {new Date().toLocaleTimeString("es-ES", { 
          hour: "2-digit", 
          minute: "2-digit" 
        })}
      </div>
    </div>
  );
}