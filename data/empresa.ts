export const EMPRESA_SLUGS = ["casos-de-exito", "equipo", "carreras"] as const

export type EmpresaSlug = (typeof EMPRESA_SLUGS)[number]

export const EMPRESA: Record<
  EmpresaSlug,
  { title: string; description: string; items?: { title: string; text: string }[] }
> = {
  "casos-de-exito": {
    title: "Casos de Éxito",
    description:
      "Proyectos en los que hemos acompañado a empresas en su transformación digital y desarrollo de software.",
    items: [
      {
        title: "E-commerce para retail",
        text: "Plataforma de venta online con catálogo, carrito y pasarela de pago. Aumento de conversión y ventas.",
      },
      {
        title: "App móvil de servicios",
        text: "Aplicación iOS y Android para agendar y gestionar citas. Más de 10k descargas y alta valoración.",
      },
      {
        title: "Migración a la nube",
        text: "Migración de infraestructura on-premise a AWS con reducción de costos y mejor disponibilidad.",
      },
    ],
  },
  equipo: {
    title: "Equipo",
    description:
      "Profesionales con experiencia en desarrollo de software, consultoría y transformación digital.",
    items: [
      {
        title: "Metodologías ágiles",
        text: "Certificaciones en Scrum, PMI y frameworks ágiles para entregar valor de forma iterativa.",
      },
      {
        title: "Stack moderno",
        text: "Experiencia en React, Node.js, AWS y tecnologías cloud para construir soluciones escalables.",
      },
      {
        title: "Enfoque en negocio",
        text: "Comunicación clara con stakeholders y alineación con los objetivos de tu empresa.",
      },
    ],
  },
  carreras: {
    title: "Carreras",
    description:
      "Únete al equipo de Margora. Buscamos personas apasionadas por la tecnología y el trabajo en equipo.",
    items: [
      {
        title: "Desarrollador/a Full Stack",
        text: "React, Node.js, bases de datos. Proyectos variados y entorno ágil.",
      },
      {
        title: "Consultor/a de transformación digital",
        text: "Acompañar a clientes en la adopción de tecnología y mejores prácticas.",
      },
      {
        title: "¿No ves tu perfil?",
        text: "Escríbenos a info@margora.com con tu CV y área de interés.",
      },
    ],
  },
}
