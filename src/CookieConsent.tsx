// /** @jsxImportSource preact */
// import { useState, useEffect } from "preact/hooks";

// export default function CookieConsentModal() {
//   const [visible, setVisible] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);

//   useEffect(() => {
//     const consent = localStorage.getItem("cookieConsent");
//     if (!consent) setVisible(true);
//   }, []);

//   const handleConsent = (choice: "all" | "none" | "custom") => {
//     localStorage.setItem("cookieConsent", choice);
//     setVisible(false);
//     if (choice === "all") {
//       console.log("✅ Cookies aceptadas: se pueden cargar anuncios.");
//       // Aquí podrías activar scripts de publicidad o analítica
//     }
//   };

//   if (!visible) return null;

//   return (
//     <div class="fixed inset-0 bg-[#161617]/90 backdrop-blur-sm flex items-center justify-center z-50">
//       <div class="bg-[#161617] text-gray-100 rounded-2xl shadow-2xl max-w-lg w-[90%] p-6 border border-gray-800">
//         {!showSettings ? (
//           <>
//             <h2 class="text-xl font-semibold mb-3 text-center text-white">
//               Despertar Digital se preocupa por tu privacidad
//             </h2>
//             <p class="text-sm text-gray-300 leading-snug mb-4 text-center">
//               Nosotros y nuestros socios usamos cookies para almacenar y acceder
//               a información como identificadores únicos con el fin de ofrecer,
//               mantener y mejorar nuestros servicios y anuncios. Puedes aceptar
//               todo, rechazar todo o configurar tus preferencias.
//             </p>

//             <div class="flex flex-col sm:flex-row justify-center gap-3 mt-4">
//               <button
//                 onClick={() => handleConsent("none")}
//                 class="bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded-full text-gray-100 transition"
//               >
//                 Rechazar todo
//               </button>
//               <button
//                 onClick={() => setShowSettings(true)}
//                 class="border border-green-500 text-green-400 hover:bg-green-500/10 px-5 py-2 rounded-full transition"
//               >
//                 Configurar preferencias
//               </button>
//               <button
//                 onClick={() => handleConsent("all")}
//                 class="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-full text-white font-medium transition"
//               >
//                 Aceptar todo
//               </button>
//             </div>

//             <p class="text-xs text-gray-400 text-center mt-4">
//               <a
//                 href="/politica-privacidad"
//                 class="text-green-400 hover:underline"
//               >
//                 Ver lista de socios y política de privacidad
//               </a>
//             </p>
//           </>
//         ) : (
//           <>
//             <h3 class="text-lg font-semibold mb-3 text-center text-white">
//               Configurar preferencias
//             </h3>
//             <p class="text-sm text-gray-300 mb-3 text-center">
//               Puedes elegir qué tipos de cookies permitir. Tus elecciones se
//               aplicarán solo a este sitio.
//             </p>

//             <div class="flex flex-col gap-2 text-sm mb-5 text-gray-200">
//               <label class="flex items-center gap-2">
//                 <input type="checkbox" checked disabled /> Esenciales (requeridas)
//               </label>
//               <label class="flex items-center gap-2">
//                 <input type="checkbox" /> Analíticas
//               </label>
//               <label class="flex items-center gap-2">
//                 <input type="checkbox" /> Publicitarias / Personalización
//               </label>
//             </div>

//             <div class="flex justify-center gap-3">
//               <button
//                 onClick={() => setShowSettings(false)}
//                 class="bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded-full text-gray-100 transition"
//               >
//                 Volver
//               </button>
//               <button
//                 onClick={() => handleConsent("custom")}
//                 class="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-full text-white font-medium transition"
//               >
//                 Guardar preferencias
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

/** @jsxImportSource preact */
import { useState, useEffect } from "preact/hooks";

export default function CookieConsentModal() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    const currentPath = window.location.pathname;

    if (!consent && currentPath !== "/politica-privacidad") {
      setVisible(true);
    }
  }, []);

  const handleConsent = (choice: "all" | "none" | "custom") => {
    localStorage.setItem("cookieConsent", choice);
    setVisible(false);
    if (choice === "all") {
      console.log("✅ Cookies aceptadas: se pueden cargar anuncios.");
      // Aquí podrías activar scripts de publicidad o analítica
    }
  };

  if (!visible) return null;

  return (
    <div class="fixed inset-0 bg-[#161617]/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="bg-[#161617] text-gray-100 rounded-2xl shadow-2xl max-w-lg w-[90%] p-6 border border-gray-800">
        {!showSettings ? (
          <>
            <h2 class="text-xl font-semibold mb-3 text-center text-white">
              Despertar Digital se preocupa por tu privacidad
            </h2>
            <p class="text-sm text-gray-300 leading-snug mb-4 text-center">
              Nosotros y nuestros socios usamos cookies para almacenar y acceder
              a información como identificadores únicos con el fin de ofrecer,
              mantener y mejorar nuestros servicios y anuncios. Puedes aceptar
              todo, rechazar todo o configurar tus preferencias.
            </p>

            <div class="flex flex-col sm:flex-row justify-center gap-3 mt-4">
              <button
                onClick={() => handleConsent("none")}
                class="bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded-full text-gray-100 transition"
              >
                Rechazar todo
              </button>
              <button
                onClick={() => setShowSettings(true)}
                class="border border-green-500 text-green-400 hover:bg-green-500/10 px-5 py-2 rounded-full transition"
              >
                Configurar preferencias
              </button>
              <button
                onClick={() => handleConsent("all")}
                class="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-full text-white font-medium transition"
              >
                Aceptar todo
              </button>
            </div>

            <p class="text-xs text-gray-400 text-center mt-4">
              <a
                href="/politica-privacidad"
                target="_blank"
                rel="noopener noreferrer"
                class="text-green-400 hover:underline"
              >
                Ver lista de socios y política de privacidad
              </a>
            </p>
          </>
        ) : (
          <>
            <h3 class="text-lg font-semibold mb-3 text-center text-white">
              Configurar preferencias
            </h3>
            <p class="text-sm text-gray-300 mb-3 text-center">
              Puedes elegir qué tipos de cookies permitir. Tus elecciones se
              aplicarán solo a este sitio.
            </p>

            <div class="flex flex-col gap-2 text-sm mb-5 text-gray-200">
              <label class="flex items-center gap-2">
                <input type="checkbox" checked disabled /> Esenciales
                (requeridas)
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" /> Analíticas
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" /> Publicitarias / Personalización
              </label>
            </div>

            <div class="flex justify-center gap-3">
              <button
                onClick={() => setShowSettings(false)}
                class="bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded-full text-gray-100 transition"
              >
                Volver
              </button>
              <button
                onClick={() => handleConsent("custom")}
                class="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-full text-white font-medium transition"
              >
                Guardar preferencias
              </button>
            </div>

            <p class="text-xs text-gray-400 text-center mt-4">
              <a
                href="/politica-privacidad"
                target="_blank"
                rel="noopener noreferrer"
                class="text-green-400 hover:underline"
              >
                Ver lista de socios y política de privacidad
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
