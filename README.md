# Despertar Digital - Portal Informativo en Tiempo Real

**Live**: https://despertardigital.es

Portal informativo ultrarrápido con datos actualizados de **tiempo**, **economía** y **deportes**.  
Carga en menos de 1 segundo · 100 % responsive · Modo oscuro · Sin trackers invasivos.

![Astro](https://img.shields.io/badge/Astro-4+-000000.svg?style=flat&logo=astro)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4.svg?style=flat&logo=tailwind-css)
![Nginx](https://img.shields.io/badge/Nginx-Proxy-009639.svg?style=flat&logo=nginx)
![Website](https://img.shields.io/website/https/despertardigital.es?label=despertardigital.es)

---

## Arquitectura de producción

Usuario  
↓ HTTPS (Let’s Encrypt)  
Nginx (reverse proxy + compresión)  
├── Frontend estático → /var/www/despertardigital.es (Astro build)  
└── Backend propio → localhost:5000  
↓ Base de datos (caché inteligente)  
↓ APIs externas solo cuando el caché ha expirado

- **Frontend**: Astro 4+ (HTML estático puro + hidratación mínima)  
- **Backend propio**: middleware que protege y cachea todas las APIs externas  
- **Base de datos**: almacena resultados para no superar límites gratuitos  
- **Cookies**: preferencias de usuario (ciudad del tiempo, tema, etc.)  
- **Servidor**: VPS único con Nginx sirviendo front + back  
- **Caché inteligente**: evita consultas innecesarias → siempre rápido y gratis  

---

## Frontend: Arquitectura por Features

El frontend está organizado **por features**, siguiendo principios de **arquitectura limpia**:

- Cada feature encapsula:
  - **Tipos y modelos de dominio** (ej: `CryptoSlide`, `CountryEconomySlide`, `CommoditySlide`)
  - **Adapters** para transformar datos del backend al modelo de dominio
  - **Servicios** que consumen APIs específicas de la feature
  - **Tests** unitarios con Jest (`ts-jest`)
- Esto permite **modularidad, escalabilidad y testabilidad**.

### Economía / Slides

- Información económica se muestra en **slides** (`EconomySlide`) que permiten **carruseles y tarjetas dinámicas**.
- Todos los slides extienden de `EconomySlideBase` (`id`, `kind`).
- Tipos de slides:
  - `CryptoSlide` → criptomonedas
  - `ForexSlide` → divisas
  - `CountryEconomySlide` → economías de países (futuro)
  - `CommoditySlide` → commodities como oro y petróleo (futuro)
  - `PlaceholderSlide` → placeholder mientras se cargan datos
- Los slides se renderizan con **BaseCard**:
  - Layout uniforme para todos los slides
  - Soporte para placeholders
  - Carga progresiva de información (UX fluida)

### Testeo

- Los tests se centralizan en `tests/` y cada feature puede tener su propio subdirectorio
- Adaptadores y servicios son **fáciles de testear** gracias al desacoplamiento
- Jest + TypeScript (`ts-jest`) se utiliza para pruebas unitarias

---

## Secciones activas

| Sección     | Fuente de datos                     | Frecuencia de actualización |
|-------------|-------------------------------------|-----------------------------|
| Tiempo      | OpenWeatherMap / AEMET / etc.       | Cada 10-15 min (caché)      |
| Economía    | Alpha Vantage, Yahoo Finance, etc.  | Cada 1-5 min (caché)        |
| Deportes    | API-Football, TheSportsDB, etc.     | Según competición (caché)   |

---

## Stack completo

| Capa           | Tecnología                          | Motivo                                          |
|----------------|-------------------------------------|------------------------------------------------|
| Frontend       | Astro + Tailwind CSS + TypeScript   | Velocidad extrema y SEO perfecto               |
| Backend        | Node.js (Express)                   | Middleware + control total                     |
| Base de datos  | MongoDb                             | Persistencia del caché                          |
| Web Server     | Nginx                               | Reverse proxy, SSL, compresión                  |
| Hosting        | VPS propio                          | Coste fijo y control absoluto                   |

