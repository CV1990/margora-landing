import { z } from "zod"

// --- Límites de longitud (evitar payloads enormes) ---
const MAX_NOMBRE = 120
const MAX_EMPRESA = 200
const MAX_CORREO = 254
const MAX_MENSAJE = 5000

/** Elimina HTML/scripts para prevenir XSS. Devuelve texto plano seguro. Sin dependencia de isomorphic-dompurify (evita ESM/require en Next.js). */
export function sanitizeText(input: string): string {
  if (typeof input !== "string") return ""
  const trimmed = input.trim()
  const noTags = trimmed.replace(/<[^>]*>/g, "")
  const noScript = noTags.replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "")
  return noScript.trim()
}

/**
 * Detecta si el texto contiene enlaces/URLs (http, https, www).
 * No considera "dominio.tld" suelto para no bloquear emails (user@dominio.com).
 */
export function containsDisallowedLinks(text: string): boolean {
  if (typeof text !== "string" || !text.trim()) return false
  const linkPatterns = [
    /https?:\/\//i,
    /www\./i,
  ]
  return linkPatterns.some((re) => re.test(text))
}

/**
 * Detecta URLs más amplias (incl. dominio.tld sin @), para campos que no son email.
 */
function containsDisallowedLinksStrict(text: string): boolean {
  if (containsDisallowedLinks(text)) return true
  if (typeof text !== "string" || !text.trim()) return false
  // Solo en texto que NO sea un email: rechazar algo como "visita ejemplo.com"
  if (/@/.test(text)) return false
  return /\b[a-z0-9-]+\.(com|net|org|io|co|mx|es)(\/[^\s]*)?/i.test(text)
}

/** Valida que ningún campo de texto contenga enlaces. */
export function assertNoLinksInFields(fields: Record<string, string>): void {
  for (const [name, value] of Object.entries(fields)) {
    if (containsDisallowedLinks(value)) {
      throw new Error("No se permiten enlaces ni URLs en los campos del formulario.")
    }
  }
}

// --- Esquemas Zod para validación y sanitización ---

const noLinksRefine = (val: string) => !containsDisallowedLinks(val)
const noLinksStrictRefine = (val: string) => !containsDisallowedLinksStrict(val)

export const contactFormSchema = z
  .object({
    nombre: z
      .string()
      .min(1, "El nombre es obligatorio")
      .max(MAX_NOMBRE, `Máximo ${MAX_NOMBRE} caracteres`)
      .transform(sanitizeText)
      .refine(noLinksStrictRefine, "No se permiten enlaces en el nombre"),
    empresa: z
      .string()
      .min(1, "La empresa es obligatoria")
      .max(MAX_EMPRESA, `Máximo ${MAX_EMPRESA} caracteres`)
      .transform(sanitizeText)
      .refine(noLinksStrictRefine, "No se permiten enlaces en la empresa"),
    correo: z
      .string()
      .min(1, "El correo es obligatorio")
      .max(MAX_CORREO)
      .email("Correo no válido")
      .transform((s) => s.trim().toLowerCase())
      .refine(noLinksRefine, "No se permiten enlaces (http/www) en el correo"),
    mensaje: z
      .string()
      .min(1, "El mensaje es obligatorio")
      .max(MAX_MENSAJE, `Máximo ${MAX_MENSAJE} caracteres`)
      .transform(sanitizeText)
      .refine(noLinksStrictRefine, "No se permiten enlaces en el mensaje"),
  })
  .strict()

export const newsletterSchema = z
  .object({
    email: z
      .string()
      .min(1, "El correo es obligatorio")
      .max(MAX_CORREO)
      .email("Correo no válido")
      .transform((s) => s.trim().toLowerCase())
      .refine(noLinksRefine, "No se permiten enlaces en el correo"),
  })
  .strict()

export type ContactFormData = z.infer<typeof contactFormSchema>
export type NewsletterFormData = z.infer<typeof newsletterSchema>

/** Valida y sanitiza datos del formulario de contacto. Lanza si hay error. */
export function validateContactForm(raw: unknown): ContactFormData {
  const parsed = contactFormSchema.safeParse(raw)
  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors
    const msg =
      (first.nombre?.[0]) ??
      (first.empresa?.[0]) ??
      (first.correo?.[0]) ??
      (first.mensaje?.[0]) ??
      "Revisa los campos del formulario."
    throw new Error(msg)
  }
  return parsed.data
}

/** Valida y sanitiza el email del newsletter. Lanza si hay error. */
export function validateNewsletterForm(raw: unknown): NewsletterFormData {
  const parsed = newsletterSchema.safeParse(raw)
  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors
    const msg = first.email?.[0] ?? "Correo no válido."
    throw new Error(msg)
  }
  return parsed.data
}
