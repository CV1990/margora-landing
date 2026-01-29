"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1920"
          alt="Empresa moderna"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Overlay oscuro para contraste del texto */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/85" />
        {/* Overlay adicional para mejor contraste */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>
      
      {/* Efectos decorativos */}
      <div className="absolute top-40 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl z-10" />
      <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl z-10" />
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border/50 shadow-sm">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Consultoría de Software</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance text-foreground drop-shadow-lg">
                Transformamos ideas en{" "}
                <span className="text-primary drop-shadow-md">soluciones digitales</span> innovadoras
              </h1>
            </div>
            
            <p className="text-lg text-foreground/90 max-w-lg leading-relaxed drop-shadow-md font-medium">
              Somos un colectivo de consultores apasionados y expertos, 
              unidos por nuestro conocimiento tecnológico profundo y nuestra 
              pasión por impulsar la transformación empresarial.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="group rounded-full px-8 shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-shadow">
                <Link href="#contacto-formulario">
                  Agenda una Consulta
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 bg-card hover:bg-secondary">
                <Link href="#servicios">Explorar Servicios</Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-10">
              {[
                { value: "150+", label: "Proyectos" },
                { value: "98%", label: "Satisfacción" },
                { value: "10+", label: "Años" },
              ].map((stat, i) => (
                <div key={i} className="text-center sm:text-left">
                  <p className="text-3xl sm:text-4xl font-bold text-foreground drop-shadow-md">{stat.value}</p>
                  <p className="text-sm text-foreground/80 mt-1 drop-shadow-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-2xl" />
              <div className="relative bg-card rounded-3xl p-8 shadow-2xl shadow-primary/10 border border-border/50">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shadow-inner">
                    <span className="text-primary font-bold text-xl">M</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Margora Consulting</p>
                    <p className="text-sm text-muted-foreground">Transformación Digital</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-3">
                      <span className="text-muted-foreground">Progreso del Proyecto</span>
                      <span className="font-medium text-foreground">80%</span>
                    </div>
                    <div className="h-3 bg-secondary rounded-full overflow-hidden shadow-inner">
                      <div className="h-full w-4/5 bg-gradient-to-r from-primary to-accent rounded-full" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary/50 rounded-2xl p-5 border border-border/30">
                      <p className="text-3xl font-bold text-foreground">24</p>
                      <p className="text-xs text-muted-foreground mt-1">Sprints</p>
                    </div>
                    <div className="bg-secondary/50 rounded-2xl p-5 border border-border/30">
                      <p className="text-3xl font-bold text-foreground">12</p>
                      <p className="text-xs text-muted-foreground mt-1">Módulos</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-card flex items-center justify-center shadow-md">
                          <span className="text-xs font-medium text-primary">{String.fromCharCode(64 + i)}</span>
                        </div>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">+8 miembros</span>
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
