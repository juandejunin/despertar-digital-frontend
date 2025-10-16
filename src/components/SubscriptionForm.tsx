import { useState } from 'preact/hooks';

export default function SubscriptionForm() {
  const [city, setCity] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    alert(`Te suscribiste para recibir el informe en ${city} a las ${time}`);
  };

  return (
    <form onSubmit={handleSubmit} class="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4">
      <h2 class="text-xl font-semibold text-center mb-4">Recibí tu informe diario</h2>

      <div>
        <label htmlFor="city" class="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
        <select
          id="city"
          value={city}
          onInput={(e) => setCity((e.target as HTMLSelectElement).value)}
          class="w-full border-gray-300 rounded-lg p-2"
          required
        >
          <option value="">Seleccioná tu ciudad</option>
          <option value="Buenos Aires">Buenos Aires</option>
          <option value="Córdoba">Córdoba</option>
          <option value="Rosario">Rosario</option>
          <option value="Mendoza">Mendoza</option>
        </select>
      </div>

      <div>
        <label htmlFor="time" class="block text-sm font-medium text-gray-700 mb-1">Horario</label>
        <select
          id="time"
          value={time}
          onInput={(e) => setTime((e.target as HTMLSelectElement).value)}
          class="w-full border-gray-300 rounded-lg p-2"
          required
        >
          <option value="">Seleccioná el horario</option>
          <option value="07:00">07:00</option>
          <option value="08:00">08:00</option>
          <option value="09:00">09:00</option>
          <option value="10:00">10:00</option>
        </select>
      </div>

      <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
        Suscribirme
      </button>

      <p class="text-center text-xs text-gray-500 mt-2">
        Recibirás el informe cada día en el horario elegido.
      </p>
    </form>
  );
}
