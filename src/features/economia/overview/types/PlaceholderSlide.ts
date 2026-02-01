// PlaceholderSlide.ts
// Slide temporal para mostrar mientras llegan los datos del backend
// Mantiene la estructura de EconomySlide, pero con información mínima

export type PlaceholderSlide = {
  type: 'placeholder'; // identificador del slide
  title?: string;      // título opcional, por ejemplo "Cargando..."
  description?: string; // descripción opcional
  icon?: string;        // icono representativo (puede ser un emoji o clase de icono)
};
