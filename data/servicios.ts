export const SERVICIOS_SLUGS = [
  "landing-pages",
  "e-commerce",
  "experiencias-xr",
  "migracion-aws",
  "apps-moviles",
  "desarrollo-web",
] as const

export type ServicioSlug = (typeof SERVICIOS_SLUGS)[number]

export const SERVICIOS: Record<
  ServicioSlug,
  { title: string; description: string; highlights: string[] }
> = {
  "landing-pages": {
    title: "Landing Pages",
    description:
      "Diseñamos landing pages de alto impacto que convierten visitantes en clientes. Diseño responsive, optimizado para SEO y conversión.",
    highlights: [
      "Diseño centrado en conversión",
      "Responsive y rápido",
      "Integración con analytics y formularios",
    ],
  },
  "e-commerce": {
    title: "E-Commerce",
    description:
      "Soluciones de comercio electrónico escalables y seguras: catálogo, carrito, pasarelas de pago y gestión de pedidos.",
    highlights: [
      "Tiendas escalables",
      "Pasarelas de pago integradas",
      "Panel de administración",
    ],
  },
  "experiencias-xr": {
    title: "Experiencias XR",
    description:
      "Realidad extendida (AR/VR) para Meta Quest y entornos inmersivos: showrooms virtuales, formación y experiencias de marca.",
    highlights: [
      "Meta Quest y WebXR",
      "Showrooms y demos de producto",
      "Experiencias de formación",
    ],
  },
  "migracion-aws": {
    title: "Migración AWS",
    description:
      "Migración estratégica a la nube con arquitecturas optimizadas en AWS: seguridad, escalabilidad y control de costos.",
    highlights: [
      "Arquitectura en la nube",
      "Seguridad y cumplimiento",
      "Optimización de costos",
    ],
  },
  "apps-moviles": {
    title: "Apps Móviles",
    description:
      "Aplicaciones móviles nativas y multiplataforma (iOS y Android) con rendimiento y experiencia de usuario de calidad.",
    highlights: [
      "iOS y Android",
      "React Native / nativas",
      "Publicación en tiendas",
    ],
  },
  "desarrollo-web": {
    title: "Desarrollo Web",
    description:
      "Sitios web a la medida y aplicaciones web con las últimas tecnologías: rendimiento, accesibilidad y mantenibilidad.",
    highlights: [
      "Stack moderno (Next.js, etc.)",
      "SEO y rendimiento",
      "Mantenible y escalable",
    ],
  },
}
