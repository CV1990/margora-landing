"use client"

import Image from "next/image"
import { 
  Globe, 
  ShoppingCart, 
  Glasses, 
  Cloud, 
  Smartphone, 
  Code2, 
  Megaphone, 
  Bot, 
  GraduationCap,
  Users,
  UserPlus,
  ArrowUpRight
} from "lucide-react"

const services = [
  {
    icon: Globe,
    title: "Landing Pages",
    description: "Diseñamos landing pages de alto impacto que convierten visitantes en clientes.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    description: "Soluciones de comercio electrónico escalables y seguras para tu negocio.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800",
  },
  {
    icon: Glasses,
    title: "Experiencias XR",
    description: "Experiencias inmersivas de realidad extendida para Meta Quest.",
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=800",
  },
  {
    icon: Cloud,
    title: "Migración AWS",
    description: "Migración estratégica a la nube con arquitecturas optimizadas.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
  },
  {
    icon: Smartphone,
    title: "Apps Móviles",
    description: "Aplicaciones móviles nativas y multiplataforma de alta calidad.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
  },
  {
    icon: Code2,
    title: "Desarrollo a Medida",
    description: "Sitio web a la medida y aplicaciones web personalizadas. Desarrollo web a la medida con las últimas tecnologías.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
  },
  {
    icon: Megaphone,
    title: "Marketing Digital",
    description: "Estrategias data-driven que amplifican tu presencia online.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
  },
  {
    icon: Bot,
    title: "Agentes Digitales",
    description: "Agentes de IA y chatbots que automatizan la atención al cliente.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
  },
  {
    icon: GraduationCap,
    title: "Coaching Tech",
    description: "Coaching en planeación y desarrollo de soluciones de software.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
  },
  {
    icon: Users,
    title: "Gestión Ágil",
    description: "Implementación de metodologías PMI, Scrum y frameworks ágiles.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
  },
  {
    icon: UserPlus,
    title: "Staffing",
    description: "Servicios de staffing y gestión de personal técnico especializado.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800",
  },
]

export function Services() {
  return (
    <section id="servicios" className="py-32 bg-background relative scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
            Nuestros Servicios
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance text-foreground">
            Soluciones tecnológicas para cada etapa de tu transformación
          </h2>
          <p className="text-muted-foreground text-lg">
            Como <strong>empresa de software</strong> y <strong>proveedor de desarrollo web a la medida</strong>, 
            ofrecemos sitios web a la medida, desarrollo de software y apps. ¿Buscas quién te haga un sitio web? Aquí lo tienes.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-0 bg-card rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Imagen del servicio */}
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                <div className="absolute top-4 left-4 p-3 bg-card/90 backdrop-blur-sm rounded-xl group-hover:bg-primary/10 transition-colors shadow-sm">
                  <service.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <ArrowUpRight className="absolute top-4 right-4 h-4 w-4 text-muted-foreground/0 group-hover:text-primary transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 bg-card/90 backdrop-blur-sm p-2 rounded-lg" />
              </div>
              
              {/* Contenido del servicio */}
              <div className="p-6">
                <h3 className="font-semibold mb-2 text-foreground">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
