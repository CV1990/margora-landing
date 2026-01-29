"use client"

import React from "react"
import { useState } from "react"
import { Send, CheckCircle, Mail, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al suscribirse')
      }

      setIsSubscribed(true)
      setEmail("")
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al suscribirse')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contacto" className="py-32 bg-secondary/30 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-[2rem] p-10 lg:p-14 text-center border border-border/50 shadow-2xl shadow-primary/10">
            <div className="inline-flex p-4 bg-primary/10 rounded-2xl mb-8">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
              Mantente al día
            </h2>
            <p className="text-muted-foreground mb-10 text-lg">
              Suscríbete y recibe insights sobre transformación 
              digital, metodologías ágiles y cloud computing.
            </p>

            {isSubscribed ? (
              <div className="flex items-center justify-center gap-4 p-6 bg-primary/10 rounded-2xl">
                <div className="p-2 bg-primary/20 rounded-xl">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <p className="text-foreground font-medium">
                  ¡Gracias por suscribirte! Pronto recibirás nuestras novedades.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-14 px-6 rounded-2xl bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary"
                  />
                  {error && (
                    <p className="text-sm text-red-500 mt-2 text-left">{error}</p>
                  )}
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isLoading}
                  className="h-14 px-8 rounded-2xl group shadow-xl shadow-primary/25"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Suscribiendo...
                    </>
                  ) : (
                    <>
                      Suscribirse
                      <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </form>
            )}

            <p className="text-xs text-muted-foreground mt-6">
              Al suscribirte, aceptas nuestra política de privacidad. No spam, lo prometemos.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
