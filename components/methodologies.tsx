import Image from "next/image"
import { Shield, Target, Zap, RefreshCw } from "lucide-react"

const methodologies = [
  {
    icon: Shield,
    name: "PMI",
    title: "Project Management Institute",
    description: "Aplicamos las mejores prácticas del PMBOK para garantizar el éxito de proyectos complejos.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
  },
  {
    icon: RefreshCw,
    name: "Scrum",
    title: "Scrum.org Framework",
    description: "Implementamos Scrum con certificaciones oficiales para entregas incrementales.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
  },
  {
    icon: Zap,
    name: "Kanban",
    title: "Flujo Continuo",
    description: "Optimizamos el flujo de trabajo con visualización clara y métricas de eficiencia.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
  },
  {
    icon: Target,
    name: "Híbrido",
    title: "Enfoque Adaptado",
    description: "Combinamos lo mejor de cada metodología adaptándola a tus necesidades.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
  },
]

export function Methodologies() {
  return (
    <section id="metodologias" className="py-32 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
            Metodologías
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Frameworks probados para el éxito
          </h2>
          <p className="text-muted-foreground text-lg">
            Utilizamos frameworks reconocidos mundialmente para 
            garantizar el éxito de cada proyecto.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {methodologies.map((method, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-3xl overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Imagen de fondo */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={method.image}
                  alt={method.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Overlay para contraste */}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
                
                {/* Icono flotante */}
                <div className="absolute top-4 left-4 p-3 bg-card/90 backdrop-blur-sm rounded-xl shadow-lg group-hover:bg-primary/10 transition-colors">
                  <method.icon className="h-6 w-6 text-primary" />
                </div>
                
                {/* Badge de nombre */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-bold tracking-widest rounded-full uppercase">
                    {method.name}
                  </span>
                </div>
              </div>
              
              {/* Contenido */}
              <div className="p-6">
                <h3 className="font-semibold mb-3 text-foreground text-lg">{method.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {method.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
