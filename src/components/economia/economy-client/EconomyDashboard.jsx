// src/components/economy-client/EconomyDashboard.jsx
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import ForexTable from './ForexTable.jsx';
import CryptoTable from './CryptoTable.jsx';
import ArgentinaTable from './ArgentinaTable.jsx';

export default function EconomyDashboard() {
  const [activeTab, setActiveTab] = useState('forex');
  const [forexData, setForexData] = useState([]);
  const [cryptoData, setCryptoData] = useState([]);
  const [argentinaData, setArgentinaData] = useState([]);
  const [loading, setLoading] = useState({ forex: true, crypto: true, argentina: true });
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const tabs = [
    { id: 'forex', label: '💱 Forex', color: 'from-blue-500 to-cyan-500' },
    { id: 'crypto', label: '₿ Crypto', color: 'from-purple-500 to-pink-500' },
    { id: 'argentina', label: '🇦🇷 Argentina', color: 'from-sky-500 to-blue-500' },
  ];

  const fetchData = async (endpoint) => {
    try {
      const response = await fetch(`https://despertardigital.es/api/${endpoint}`);
      if (!response.ok) throw new Error(`Error ${response.status}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      return [];
    }
  };

  const loadAllData = async () => {
    const [forex, crypto, argentina] = await Promise.all([
      fetchData('forex'),
      fetchData('crypto'),
      fetchData('argentina')
    ]);
    
    setForexData(forex);
    setCryptoData(crypto);
    setArgentinaData(argentina);
    setLoading({ forex: false, crypto: false, argentina: false });
    setLastUpdate(new Date());
  };

  useEffect(() => {
    loadAllData();
    // Actualizar cada 30 segundos
    const interval = setInterval(loadAllData, 30000);
    return () => clearInterval(interval);
  }, []);

  const renderTable = () => {
    switch(activeTab) {
      case 'forex':
        return <ForexTable data={forexData} />;
      case 'crypto':
        return <CryptoTable data={cryptoData} />;
      case 'argentina':
        return <ArgentinaTable data={argentinaData} />;
      default:
        return <ForexTable data={forexData} />;
    }
  };

  return (
    <div class="w-full max-w-6xl mx-auto p-2">
      {/* Tabs de navegación */}
      <div class="flex flex-wrap gap-1 mb-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            class={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              activeTab === tab.id 
                ? `bg-gradient-to-r ${tab.color} text-white shadow-md` 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
        
        {/* Indicador de actualización */}
        <div class="ml-auto flex items-center gap-2">
          <div class={`w-2 h-2 rounded-full ${
            Object.values(loading).some(l => l) 
              ? 'bg-yellow-400 animate-pulse' 
              : 'bg-green-500'
          }`} />
          <span class="text-[10px] text-gray-500">
            {lastUpdate.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </div>

      {/* Contenido de la tabla */}
      <div class="bg-white rounded-xl shadow-lg p-3">
        {renderTable()}
      </div>

      {/* Loading states */}
      {loading[activeTab] && (
        <div class="text-center py-8">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
          <p class="mt-2 text-sm text-gray-600">Cargando datos...</p>
        </div>
      )}
    </div>
  );
}