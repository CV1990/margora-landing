export const RECURSOS_SLUGS = ["documentacion", "webinars"] as const

export type RecursoSlug = (typeof RECURSOS_SLUGS)[number]

export const RECURSOS: Record<
  RecursoSlug,
  { title: string; description: string; items: { title: string; text: string }[] }
> = {
  documentacion: {
    title: "Documentación",
    description:
      "Guías y recursos técnicos para desarrolladores y equipos que trabajan con nuestras soluciones.",
    items: [
      {
        title: "APIs y integraciones",
        text: "Documentación de endpoints, autenticación y ejemplos de uso para integrar con nuestras plataformas.",
      },
      {
        title: "Guías de despliegue",
        text: "Pasos para desplegar en Vercel, AWS u otros entornos. Variables de entorno y buenas prácticas.",
      },
      {
        title: "Próximamente",
        text: "Estamos preparando más documentación. Si necesitas algo concreto, contáctanos.",
      },
    ],
  },
  webinars: {
    title: "Webinars",
    description:
      "Sesiones en vivo sobre tecnología, metodologías ágiles y tendencias para equipos y empresas.",
    items: [
      {
        title: "Próximos webinars",
        text: "Mantente al día suscribiéndote al newsletter. Anunciamos fechas y temas con antelación.",
      },
      {
        title: "Temas habituales",
        text: "Desarrollo web, e-commerce, cloud (AWS), metodologías ágiles y transformación digital.",
      },
      {
        title: "Solicitar un webinar",
        text: "Si eres empresa o comunidad y quieres una sesión a medida, escríbenos a info@margora.com.",
      },
    ],
  },
}
