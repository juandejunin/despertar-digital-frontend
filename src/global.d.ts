/// <reference types="preact" />

declare namespace JSX {
  interface IntrinsicElements {
    // todos los elementos HTML se permiten
    [elemName: string]: any;
  }
}
