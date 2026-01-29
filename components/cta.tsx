import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-primary/5 via-card to-accent/5 rounded-[2.5rem] overflow-hidden border border-border/50 shadow-2xl shadow-primary/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
          
          <div className="relative grid lg:grid-cols-2 gap-12 p-10 lg:p-20">
            <div className="space-y-8">
              <span className="inline-block px-4 py-2 bg-card text-primary text-sm font-medium rounded-full border border-border/50">
                Únete a nosotros
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance text-foreground">
                ¿Quieres ser parte del colectivo?
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Somos los artesanos tecnológicos de Margora. En nuestro colectivo, 
                siempre hay espacio para personas con curiosidad y energía contagiosa.
              </p>
              <Button size="lg" className="group rounded-full px-8 shadow-xl shadow-primary/25">
                Únete al colectivo
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-[2rem] blur-2xl" />
                <div className="relative bg-card rounded-3xl p-10 flex flex-col justify-center items-center text-center border border-border/50 shadow-xl">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-8 shadow-lg shadow-primary/20">
                    <span className="text-primary text-4xl font-bold">M</span>
                  </div>
                  <p className="text-2xl font-bold mb-2 text-foreground">Margora Team</p>
                  <p className="text-muted-foreground text-sm mb-8">
                    +50 expertos en tecnología
                  </p>
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/15 to-accent/15 border-3 border-card flex items-center justify-center shadow-md"
                      >
                        <span className="text-xs font-medium text-primary">
                          {String.fromCharCode(64 + i)}
                        </span>
                      </div>
                    ))}
                    <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center border-3 border-card shadow-lg">
                      <span className="text-xs text-primary-foreground font-bold">+45</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
