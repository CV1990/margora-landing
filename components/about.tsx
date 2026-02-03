import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  "Equipo certificado en AWS, Scrum.org y PMI",
  "Metodologías ágiles adaptadas a tu contexto",
  "Comunicación transparente y continua",
  "Soporte post-implementación garantizado",
]

export function About() {
  return (
    <section id="nosotros" className="py-32 bg-secondary/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div>
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
                Sobre Nosotros
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance text-foreground">
                Innovación, durabilidad y eficiencia en cada proyecto
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                En Margora somos una <strong>empresa de software</strong> y <strong>proveedor de software</strong> líder. 
                Si te preguntas quién me puede hacer un sitio web o dónde hacer un sitio web a la medida, 
                somos la consultora que acompaña a organizaciones en desarrollo web a la medida y transformación digital.
              </p>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border/30 shadow-sm">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <Button size="lg" className="rounded-full px-8 shadow-xl shadow-primary/25">
              Conoce Nuestro Equipo
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {[
              { num: "01", text: "Acompañamos empresas en su transición digital", tall: false },
              { num: "02", text: "Valoramos la innovación con metodologías probadas", tall: true },
              { num: "03", text: "Construimos soluciones escalables para el futuro", tall: true },
              { num: "04", text: "Entregamos resultados medibles con impacto real", tall: false },
            ].map((item, i) => (
              <div 
                key={i} 
                className={`bg-card border border-border/30 rounded-3xl p-6 flex flex-col justify-end shadow-lg shadow-primary/5 hover:shadow-xl hover:shadow-primary/10 transition-shadow ${
                  item.tall ? "h-72" : "h-52"
                } ${i % 2 === 1 ? "mt-8" : ""}`}
              >
                <p className="text-5xl font-bold text-primary/20 mb-3">{item.num}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
