/**
 * Cookie de consentimiento: nombre, tipo y helpers para usar en cliente.
 * Solo usar en componentes "use client" o en useEffect.
 */

export const CONSENT_COOKIE_NAME = "margora_consent"
/** Evento que se dispara al guardar consentimiento (para que AnalyticsWithConsent reaccione). */
export const COOKIE_CONSENT_UPDATED = "cookie-consent-updated"
const CONSENT_MAX_AGE_DAYS = 365

export type ConsentState = {
  necessary: boolean
  preferences: boolean
  analytics: boolean
  updated: string
}

export const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  preferences: true,
  analytics: false,
  updated: new Date().toISOString(),
}

export function getConsentFromCookie(): ConsentState | null {
  if (typeof document === "undefined") return null
  const value = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_COOKIE_NAME}=`))
    ?.split("=")[1]
  if (!value) return null
  try {
    const parsed = JSON.parse(decodeURIComponent(value)) as ConsentState
    if (typeof parsed.necessary !== "boolean") return null
    return {
      necessary: true,
      preferences: typeof parsed.preferences === "boolean" ? parsed.preferences : DEFAULT_CONSENT.preferences,
      analytics: typeof parsed.analytics === "boolean" ? parsed.analytics : DEFAULT_CONSENT.analytics,
      updated: typeof parsed.updated === "string" ? parsed.updated : new Date().toISOString(),
    }
  } catch {
    return null
  }
}

export function setConsentCookie(state: ConsentState): void {
  if (typeof document === "undefined") return
  const value = encodeURIComponent(JSON.stringify(state))
  const maxAge = CONSENT_MAX_AGE_DAYS * 24 * 60 * 60
  document.cookie = `${CONSENT_COOKIE_NAME}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`
}

export function clearConsentCookie(): void {
  if (typeof document === "undefined") return
  document.cookie = `${CONSENT_COOKIE_NAME}=; path=/; max-age=0`
}
