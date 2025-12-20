// src/components/economy-client/ArgentinaTable.jsx
import { h } from 'preact';

export default function ArgentinaTable({ data = [], module = 'argentina' }) {
  if (!data || data.length === 0) {
    return (
      <div class="text-center py-8 text-gray-500">
        No hay datos disponibles del mercado argentino.
      </div>
    );
  }

  // Ordenar por tipo de dólar
  const sortedData = [...data].sort((a, b) => {
    const order = ['blue', 'oficial', 'ccl', 'mep', 'merval'];
    return order.indexOf(a.tipo) - order.indexOf(b.tipo);
  });

  return (
    <div class="bg-white rounded-lg shadow overflow-hidden w-full">
      <div class="bg-gradient-to-r from-sky-600 to-blue-700 text-white px-3 py-2">
        <h3 class="font-bold text-[13px] leading-tight">🇦🇷 Mercado Argentino</h3>
        <p class="text-[9px] opacity-90">Dólares y MERVAL en tiempo real</p>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-xs">
          <thead class="bg-gradient-to-r from-sky-700 to-blue-800 text-white text-[11px]">
            <tr>
              <th class="px-1 py-1.5 text-left">Tipo</th>
              <th class="w-16 px-1 py-1.5 text-center">Compra</th>
              <th class="w-16 px-1 py-1.5 text-center">Venta</th>
              <th class="w-12 px-1 py-1.5 text-center max-[340px]:hidden">Var.</th>
              <th class="w-20 px-1 py-1.5 text-center max-[380px]:hidden">Spread</th>
              <th class="w-20 px-1 py-1.5 text-center hidden sm:table-cell">Actualizado</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            {sortedData.map((item, i) => {
              const tipo = item.tipo || 'dolar';
              const compra = item.compra || item.buy || 0;
              const venta = item.venta || item.sell || 0;
              const variacion = item.variacion || item.change || 0;
              const spread = venta - compra;
              const spreadPercent = compra > 0 ? ((spread / compra) * 100).toFixed(2) : 0;
              
              // Colores según el tipo
              const getTipoColor = (tipo) => {
                switch(tipo.toLowerCase()) {
                  case 'blue': return 'bg-blue-100 text-blue-800';
                  case 'oficial': return 'bg-green-100 text-green-800';
                  case 'ccl': return 'bg-purple-100 text-purple-800';
                  case 'mep': return 'bg-orange-100 text-orange-800';
                  case 'merval': return 'bg-red-100 text-red-800';
                  default: return 'bg-gray-100 text-gray-800';
                }
              };
              
              return (
                <tr key={`${tipo}-${i}`} class="hover:bg-gray-50 h-11">
                  <td class="px-1 py-1">
                    <div class="flex items-center gap-2">
                      <span class={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getTipoColor(tipo)}`}>
                        {tipo.toUpperCase()}
                      </span>
                      {item.nombre && (
                        <span class="text-[10px] text-gray-600 truncate hidden sm:inline">
                          {item.nombre}
                        </span>
                      )}
                    </div>
                  </td>
                  
                  <td class="px-1 py-1 text-center">
                    <div class="font-bold text-gray-900">
                      ${typeof compra === 'number' ? compra.toFixed(2) : compra}
                    </div>
                  </td>
                  
                  <td class="px-1 py-1 text-center">
                    <div class="font-bold text-gray-900">
                      ${typeof venta === 'number' ? venta.toFixed(2) : venta}
                    </div>
                  </td>
                  
                  <td class="px-1 py-1 text-center max-[340px]:hidden">
                    <div class={`font-semibold ${variacion >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {variacion >= 0 ? '↗' : '↘'} {Math.abs(variacion).toFixed(2)}%
                    </div>
                  </td>
                  
                  <td class="px-1 py-1 text-center max-[380px]:hidden">
                    <div class="flex flex-col items-center">
                      <span class="text-gray-700 font-medium">${spread.toFixed(2)}</span>
                      <span class="text-[8px] text-gray-500">({spreadPercent}%)</span>
                    </div>
                  </td>
                  
                  <td class="px-1 py-1 text-center text-gray-600 text-[10px] hidden sm:table-cell">
                    {item.fecha_actualizacion || item.updated_at || 'Hoy'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div class="border-t bg-gradient-to-r from-gray-50 to-gray-100">
        <div class="px-3 py-2">
          <div class="text-[8px] text-gray-600 flex justify-between items-center">
            <div>
              <span class="font-semibold">Referencia:</span>{' '}
              Blue: Informal • Oficial: Banco • CCL: Contado con Liquidación • MEP: Bolsa
            </div>
            <div class="text-gray-500">
              {new Date().toLocaleDateString("es-ES")} {new Date().toLocaleTimeString("es-ES", { 
                hour: "2-digit", 
                minute: "2-digit" 
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}