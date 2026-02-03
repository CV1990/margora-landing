/**
 * Variables de entorno usadas en el proyecto.
 * Definir en .env.local (desarrollo) o en el host (Vercel, etc.).
 *
 * Cliente (NEXT_PUBLIC_*):
 * - NEXT_PUBLIC_WEB3FORMS_KEY → formulario de contacto y newsletter (Web3Forms)
 *
 * Servidor:
 * - TURSO_DATABASE_URL, TURSO_AUTH_TOKEN → Turso/libSQL (API contact, newsletter)
 * - RESEND_API_KEY, RESEND_FROM → envío de emails (API contact)
 * - PODCAST_FEED_URL → URL del feed RSS del podcast (API podcast)
 *
 * Scripts (Node, no usan este módulo):
 * - GEMINI_API_KEY → scripts/generate-post.js
 */

/** Clave de Web3Forms (cliente). Usada en formulario de contacto y newsletter. */
export function getWeb3FormsKey(): string | undefined {
  return process.env.NEXT_PUBLIC_WEB3FORMS_KEY
}

/** URL de la base Turso (servidor). */
export function getTursoDatabaseUrl(): string | undefined {
  return process.env.TURSO_DATABASE_URL
}

/** Token de autenticación Turso (servidor). */
export function getTursoAuthToken(): string | undefined {
  return process.env.TURSO_AUTH_TOKEN
}

/** API key de Resend (servidor). */
export function getResendApiKey(): string | undefined {
  return process.env.RESEND_API_KEY
}

/** Email remitente verificado en Resend (servidor). */
export function getResendFrom(): string {
  return process.env.RESEND_FROM ?? ""
}

/** URL del feed RSS del podcast (servidor). Para sección Podcast en la web. */
export function getPodcastFeedUrl(): string | undefined {
  return process.env.PODCAST_FEED_URL
}
