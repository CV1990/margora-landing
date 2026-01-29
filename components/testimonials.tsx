import { Quote } from "lucide-react"

const testimonials = [
  {
    quote: "Margora transformó completamente nuestra operación digital. Su equipo superó nuestras expectativas en calidad y funcionalidad.",
    author: "María González",
    role: "CTO",
    company: "TechStart MX",
  },
  {
    quote: "La migración a AWS fue impecable. El equipo demostró un conocimiento profundo de la arquitectura cloud.",
    author: "Carlos Ramírez",
    role: "Director de TI",
    company: "Finanzas Plus",
  },
  {
    quote: "El coaching en metodologías ágiles cambió la forma en que nuestro equipo trabaja. Ahora somos más eficientes.",
    author: "Ana Martínez",
    role: "Product Manager",
    company: "InnovaLab",
  },
]

export function Testimonials() {
  return (
    <section id="testimonios" className="py-32 bg-secondary/30 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-primary/5 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
            Testimonios
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-muted-foreground text-lg">
            Historias de éxito de empresas que han transformado su negocio con nosotros.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-3xl p-8 relative border border-border/50 shadow-xl shadow-primary/5 hover:shadow-2xl hover:shadow-primary/10 transition-shadow"
            >
              <div className="absolute top-6 right-6 p-3 bg-primary/10 rounded-2xl">
                <Quote className="h-5 w-5 text-primary" />
              </div>
              <p className="text-muted-foreground leading-relaxed mb-8 pt-8">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shadow-inner">
                  <span className="text-primary font-bold text-lg">
                    {testimonial.author.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
