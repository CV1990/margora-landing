"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Send, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useWeb3FormsKey } from "@/components/env-provider"
import { validateContactForm } from "@/lib/form-security"

export function ContactForm() {
  const web3FormsKey = useWeb3FormsKey()
  const [nombre, setNombre] = useState("")
  const [empresa, setEmpresa] = useState("")
  const [correo, setCorreo] = useState("")
  const [mensaje, setMensaje] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const accessKey = web3FormsKey
      if (!accessKey) {
        throw new Error("Formulario no configurado")
      }

      const safe = validateContactForm({ nombre, empresa, correo, mensaje })

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `[Margora] Contacto: ${safe.nombre} - ${safe.empresa}`,
          from_name: safe.nombre,
          name: safe.nombre,
          email: safe.correo,
          empresa: safe.empresa,
          message: safe.mensaje,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!data.success) throw new Error(data.message ?? "Error al enviar")
      setIsSent(true)
      setNombre("")
      setEmpresa("")
      setCorreo("")
      setMensaje("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo enviar el mensaje. Intenta de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contacto-formulario" className="py-32 bg-background relative scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
              Contacto
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
              Agenda una consulta
            </h2>
            <p className="text-muted-foreground text-lg">
              Cuéntanos tu proyecto y te respondemos a la brevedad.
            </p>
          </div>

          <div className="bg-card rounded-[2rem] p-10 lg:p-14 border border-border/50 shadow-2xl shadow-primary/10">
            {isSent ? (
              <div className="flex flex-col items-center justify-center gap-6 py-12 text-center">
                <div className="p-4 bg-primary/10 rounded-2xl">
                  <CheckCircle className="h-12 w-12 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Mensaje enviado
                  </h3>
                  <p className="text-muted-foreground">
                    Gracias por contactarnos. Te responderemos pronto.
                  </p>
                </div>
                <div className="flex flex-col gap-3 justify-center items-center">
                  <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={() => setIsSent(false)}
                  >
                    Enviar otro mensaje
                  </Button>
                  <Button asChild variant="ghost" className="rounded-full" size="sm">
                    <Link href="#servicios">Visita nuestros servicios</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input
                      id="nombre"
                      type="text"
                      placeholder="Tu nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                      maxLength={120}
                      disabled={isSubmitting}
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="empresa">Empresa</Label>
                    <Input
                      id="empresa"
                      type="text"
                      placeholder="Nombre de tu empresa"
                      value={empresa}
                      onChange={(e) => setEmpresa(e.target.value)}
                      required
                      maxLength={200}
                      disabled={isSubmitting}
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="correo">Correo</Label>
                  <Input
                    id="correo"
                    type="email"
                    placeholder="tu@email.com"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                    maxLength={254}
                    disabled={isSubmitting}
                    className="h-12 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mensaje">Mensaje</Label>
                  <Textarea
                    id="mensaje"
                    placeholder="Describe tu proyecto o consulta..."
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    required
                    maxLength={5000}
                    disabled={isSubmitting}
                    rows={5}
                    className="rounded-xl resize-none"
                  />
                </div>

                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto h-14 px-10 rounded-2xl group shadow-xl shadow-primary/25"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar mensaje
                      <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
