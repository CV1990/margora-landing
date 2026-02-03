"use client"

import { useState, useEffect } from "react"
import { Analytics } from "@vercel/analytics/next"
import { getConsentFromCookie, COOKIE_CONSENT_UPDATED } from "@/lib/cookie-consent"

/**
 * Renderiza Vercel Analytics solo si el usuario ha aceptado cookies de analíticas.
 * Se suscribe al evento cookie-consent-updated para montar Analytics al guardar consentimiento.
 */
export function AnalyticsWithConsent() {
  const [allow, setAllow] = useState<boolean | null>(null)

  useEffect(() => {
    const consent = getConsentFromCookie()
    setAllow(consent?.analytics ?? false)
  }, [])

  useEffect(() => {
    const handler = () => {
      const consent = getConsentFromCookie()
      setAllow(consent?.analytics ?? false)
    }
    window.addEventListener(COOKIE_CONSENT_UPDATED, handler)
    return () => window.removeEventListener(COOKIE_CONSENT_UPDATED, handler)
  }, [])

  if (allow !== true) return null
  return <Analytics />
}
