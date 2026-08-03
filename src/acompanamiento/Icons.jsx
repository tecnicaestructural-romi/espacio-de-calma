import React from "react";

/* Set de íconos delicados y minimalistas (trazo fino) para la
   Rueda de acompañamiento y sus categorías. Todos heredan el color
   del texto (currentColor) para adaptarse a cada tarjeta. */

const base = {
  width: 26,
  height: 26,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function IconAnsiedad(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2.5M12 19v2.5M4.5 12H2M22 12h-2.5M6 6l1.6 1.6M16.4 16.4L18 18M18 6l-1.6 1.6M7.6 16.4L6 18" />
    </svg>
  );
}

export function IconTristeza(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3c3.5 3.2 7 6.6 7 10.5A7 7 0 1 1 5 13.5C5 9.6 8.5 6.2 12 3Z" />
      <path d="M9.5 20.5c0-1.2 1.1-2 2.5-2s2.5.8 2.5 2" />
    </svg>
  );
}

export function IconMiedo(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.5c4 1.4 7 2 7 6.5 0 6-3 10-7 12.5-4-2.5-7-6.5-7-12.5 0-4.5 3-5.1 7-6.5Z" />
      <path d="M12 8.5v4M12 15.5h.01" />
    </svg>
  );
}

export function IconEnojo(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="13" r="8" />
      <path d="M8.5 10.5l2 1M15.5 10.5l-2 1M9 16c1-1 4-1 6 0" />
    </svg>
  );
}

export function IconEstres(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12c1.5-3 3-4.5 4.5-4.5S11 9 12 12s2 4.5 3.5 4.5S18 15 19.5 12" />
      <circle cx="12" cy="12" r="9.5" opacity="0.35" />
    </svg>
  );
}

export function IconSoledad(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="8.5" r="3.2" />
      <path d="M6 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" />
      <path d="M3 5l1.6 1.6M21 5l-1.6 1.6" opacity="0.5" />
    </svg>
  );
}

export function IconCansancio(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 15.5c1.6-4.5 4.8-7 8-7s6.4 2.5 8 7" />
      <path d="M4 15.5h16M9 9.5l-1-2M15 9.5l1-2" />
    </svg>
  );
}

export function IconDormir(props) {
  return (
    <svg {...base} {...props}>
      <path d="M20 13.2A8.5 8.5 0 1 1 10.8 4a6.8 6.8 0 0 0 9.2 9.2Z" />
    </svg>
  );
}

export function IconRespiracion(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4c-3 2.5-3 6-1 8s1 5.5-2 8" />
      <path d="M12 4c3 2.5 3 6 1 8s-1 5.5 2 8" opacity="0.55" />
    </svg>
  );
}

export const ESTADO_ICONS = {
  ansiedad: IconAnsiedad,
  tristeza: IconTristeza,
  miedo: IconMiedo,
  enojo: IconEnojo,
  estres: IconEstres,
  soledad: IconSoledad,
  cansancio: IconCansancio,
  dormir: IconDormir,
};
