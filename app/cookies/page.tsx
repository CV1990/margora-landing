import type { Metadata } from "next"
import Link from "next/link"
import { Cookie, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Cookies",
  description: "Información sobre el uso de cookies en Margora: tipos, finalidad y cómo gestionarlas.",
  robots: "index, follow",
}

const cookiesTable = [
  {
    name: "margora_consent",
    purpose: "Guarda tu elección de consentimiento (necesarias, preferencias, analíticas) para no mostrar el banner de nuevo.",
    duration: "1 año",
    type: "Preferencia",
  },
  {
    name: "theme (next-themes)",
    purpose: "Recuerda si prefieres tema claro, oscuro o del sistema.",
    duration: "1 año",
    type: "Preferencia",
  },
  {
    name: "Vercel Analytics",
    purpose: "Si aceptas analíticas: medición de visitas y uso del sitio de forma agregada (Vercel).",
    duration: "Según proveedor",
    type: "Analítica",
  },
]

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-3 rounded-xl bg-primary/10">
            <Cookie className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Uso de cookies
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Qué guardamos y para qué
            </p>
          </div>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <p className="text-muted-foreground leading-relaxed">
            Este sitio utiliza cookies para el funcionamiento técnico, tus preferencias (por ejemplo el tema claro u oscuro) y, si lo aceptas, analíticas para entender el uso del sitio. Tus datos quedan protegidos y no se usan para publicidad ni se venden a terceros.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Tipos de cookies que usamos
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong className="text-foreground">Necesarias:</strong> imprescindibles para el sitio (incluida la que guarda tu consentimiento). No requieren aceptación explícita.</li>
              <li><strong className="text-foreground">Preferencias:</strong> tema visual y opciones de interfaz. Mejoran tu experiencia.</li>
              <li><strong className="text-foreground">Analíticas:</strong> Vercel Analytics, solo si las aceptas. Sirven para ver visitas y uso en forma agregada.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Tabla de cookies
            </h2>
            <div className="overflow-x-auto rounded-xl border border-border/50">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50 bg-secondary/30">
                    <th className="text-left p-4 font-semibold text-foreground">Nombre</th>
                    <th className="text-left p-4 font-semibold text-foreground">Finalidad</th>
                    <th className="text-left p-4 font-semibold text-foreground">Duración</th>
                    <th className="text-left p-4 font-semibold text-foreground">Tipo</th>
                  </tr>
                </thead>
                <tbody>
                  {cookiesTable.map((row, i) => (
                    <tr key={i} className="border-b border-border/30 last:border-0">
                      <td className="p-4 font-mono text-xs text-foreground">{row.name}</td>
                      <td className="p-4 text-muted-foreground">{row.purpose}</td>
                      <td className="p-4 text-muted-foreground">{row.duration}</td>
                      <td className="p-4 text-muted-foreground">{row.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Cómo gestionar o cambiar preferencias
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Puedes volver a abrir el banner de cookies y cambiar tu elección en cualquier momento. También puedes eliminar o bloquear cookies desde la configuración de tu navegador.
            </p>
            <Button asChild size="sm" className="rounded-full" variant="outline">
              <Link href="/?showBanner=1">Abrir configuración de cookies</Link>
            </Button>
          </section>

          <p className="text-muted-foreground text-sm">
            Para más detalles sobre el tratamiento de datos, consulta nuestra{" "}
            <Link href="/politica-privacidad" className="text-primary hover:underline">
              Política de Privacidad
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  )
}
