"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  getConsentFromCookie,
  setConsentCookie,
  DEFAULT_CONSENT,
  COOKIE_CONSENT_UPDATED,
  type ConsentState,
} from "@/lib/cookie-consent"

export function CookieConsentBanner() {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [openCustomize, setOpenCustomize] = useState(false)
  const [preferences, setPreferences] = useState(DEFAULT_CONSENT.preferences)
  const [analytics, setAnalytics] = useState(DEFAULT_CONSENT.analytics)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const consent = getConsentFromCookie()
    const search = typeof window !== "undefined" ? window.location.search : ""
    const showFromUrl = search.includes("showBanner=1")
    if (showFromUrl) {
      window.history.replaceState({}, "", window.location.pathname)
    }
    setVisible(!consent || showFromUrl)
  }, [mounted])

  const save = (state: ConsentState) => {
    setConsentCookie(state)
    setVisible(false)
    setOpenCustomize(false)
    window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_UPDATED))
  }

  const acceptAll = () => {
    save({
      necessary: true,
      preferences: true,
      analytics: true,
      updated: new Date().toISOString(),
    })
  }

  const acceptNecessaryOnly = () => {
    save({
      necessary: true,
      preferences: false,
      analytics: false,
      updated: new Date().toISOString(),
    })
  }

  const saveCustomize = () => {
    save({
      necessary: true,
      preferences,
      analytics,
      updated: new Date().toISOString(),
    })
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 bg-card border-t border-border shadow-lg"
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
    >
      <div className="max-w-4xl mx-auto">
        <h2 id="cookie-banner-title" className="sr-only">
          Aviso de cookies
        </h2>
        <p id="cookie-banner-desc" className="text-sm text-muted-foreground mb-4">
          Usamos cookies necesarias para el funcionamiento del sitio, de preferencias (por ejemplo tema claro/oscuro) y analíticas (Vercel Analytics) para entender el uso. Puedes aceptar todas, solo las necesarias o configurar.
        </p>

        {!openCustomize ? (
          <div className="flex flex-wrap gap-3">
            <Button size="sm" className="rounded-full" onClick={acceptAll}>
              Aceptar todas
            </Button>
            <Button size="sm" variant="outline" className="rounded-full" onClick={acceptNecessaryOnly}>
              Solo necesarias
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="rounded-full"
              onClick={() => setOpenCustomize(true)}
            >
              Configurar
            </Button>
            <Link
              href="/cookies"
              className="inline-flex items-center justify-center rounded-full border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              Más información
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 rounded-lg border border-border/50 p-4 bg-background/50">
              <div>
                <Label htmlFor="cookie-prefs" className="text-sm font-medium cursor-pointer">
                  Preferencias
                </Label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Tema claro/oscuro y preferencias de interfaz
                </p>
              </div>
              <Switch
                id="cookie-prefs"
                checked={preferences}
                onCheckedChange={setPreferences}
              />
            </div>
            <div className="flex items-center justify-between gap-4 rounded-lg border border-border/50 p-4 bg-background/50">
              <div>
                <Label htmlFor="cookie-analytics" className="text-sm font-medium cursor-pointer">
                  Analíticas
                </Label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Vercel Analytics: visitas y uso del sitio (agregado)
                </p>
              </div>
              <Switch
                id="cookie-analytics"
                checked={analytics}
                onCheckedChange={setAnalytics}
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <Button size="sm" className="rounded-full" onClick={saveCustomize}>
                Guardar preferencias
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="rounded-full"
                onClick={() => setOpenCustomize(false)}
              >
                Volver
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
