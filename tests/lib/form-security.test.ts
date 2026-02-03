import { describe, it, expect } from "vitest"
import {
  sanitizeText,
  containsDisallowedLinks,
  assertNoLinksInFields,
  validateContactForm,
  validateNewsletterForm,
  contactFormSchema,
  newsletterSchema,
} from "@/lib/form-security"

describe("form-security", () => {
  describe("sanitizeText", () => {
    it("devuelve cadena vacía si input no es string", () => {
      expect(sanitizeText(null as unknown as string)).toBe("")
      expect(sanitizeText(undefined as unknown as string)).toBe("")
      expect(sanitizeText(123 as unknown as string)).toBe("")
    })

    it("elimina HTML y scripts", () => {
      expect(sanitizeText("<script>alert(1)</script>")).not.toMatch(/<|>/)
      expect(sanitizeText("<b>Hola</b> mundo")).toBe("Hola mundo")
      expect(sanitizeText("  <p>Texto</p>  ")).toBe("Texto")
    })

    it("trimma espacios", () => {
      expect(sanitizeText("  foo  ")).toBe("foo")
    })

    it("elimina tags HTML y deja solo texto plano", () => {
      const html = "<p>solo texto</p>"
      expect(sanitizeText(html)).toMatch(/solo texto/)
      expect(sanitizeText(html)).not.toMatch(/<p>/)
    })
  })

  describe("containsDisallowedLinks", () => {
    it("devuelve false para string vacío o no string", () => {
      expect(containsDisallowedLinks("")).toBe(false)
      expect(containsDisallowedLinks("   ")).toBe(false)
    })

    it("devuelve true para http y https", () => {
      expect(containsDisallowedLinks("visita https://evil.com")).toBe(true)
      expect(containsDisallowedLinks("http://site.com")).toBe(true)
    })

    it("devuelve true para www", () => {
      expect(containsDisallowedLinks("www.ejemplo.com")).toBe(true)
    })

    it("devuelve false para email (dominio.tld con @)", () => {
      expect(containsDisallowedLinks("user@acme.com")).toBe(false)
    })
  })

  describe("assertNoLinksInFields", () => {
    it("no lanza si ningún campo tiene enlaces", () => {
      expect(() => assertNoLinksInFields({ a: "Hola", b: "Mundo" })).not.toThrow()
    })

    it("lanza si algún campo tiene http", () => {
      expect(() => assertNoLinksInFields({ a: "https://x.com" })).toThrow(
        "No se permiten enlaces ni URLs en los campos del formulario."
      )
    })
  })

  describe("contactFormSchema", () => {
    it("acepta datos válidos y sanitiza", () => {
      const result = contactFormSchema.parse({
        nombre: "  Juan  ",
        empresa: "Acme",
        correo: "JUAN@acme.com",
        mensaje: "Hola, quiero info",
      })
      expect(result.nombre).toBe("Juan")
      expect(result.correo).toBe("juan@acme.com")
    })

    it("rechaza nombre vacío", () => {
      expect(() =>
        contactFormSchema.parse({
          nombre: "",
          empresa: "Acme",
          correo: "a@b.com",
          mensaje: "Hola",
        })
      ).toThrow()
    })

    it("rechaza enlaces en mensaje", () => {
      expect(() =>
        contactFormSchema.parse({
          nombre: "Juan",
          empresa: "Acme",
          correo: "a@b.com",
          mensaje: "Visita ejemplo.com",
        })
      ).toThrow(/enlaces/)
    })

    it("rechaza http en correo", () => {
      expect(() =>
        contactFormSchema.parse({
          nombre: "Juan",
          empresa: "Acme",
          correo: "https://x.com",
          mensaje: "Hola",
        })
      ).toThrow()
    })
  })

  describe("newsletterSchema", () => {
    it("acepta email válido y normaliza a minúsculas", () => {
      const result = newsletterSchema.parse({ email: "User@Gmail.COM" })
      expect(result.email).toBe("user@gmail.com")
    })

    it("rechaza email inválido", () => {
      expect(() => newsletterSchema.parse({ email: "no-email" })).toThrow()
    })
  })

  describe("validateContactForm", () => {
    it("devuelve datos validados", () => {
      const data = validateContactForm({
        nombre: "Ana",
        empresa: "Tech",
        correo: "ana@tech.com",
        mensaje: "Consulta",
      })
      expect(data.nombre).toBe("Ana")
      expect(data.correo).toBe("ana@tech.com")
    })

    it("lanza con mensaje de primer campo inválido", () => {
      expect(() => validateContactForm({})).toThrow(/nombre|obligatorio|Revisa|Required/)
      expect(() => validateContactForm({ nombre: "A", empresa: "", correo: "a@b.com", mensaje: "X" })).toThrow(/empresa/)
    })

    it("rechaza campos extra (strict)", () => {
      expect(() =>
        validateContactForm({
          nombre: "A",
          empresa: "B",
          correo: "a@b.com",
          mensaje: "M",
          extra: "x",
        })
      ).toThrow()
    })
  })

  describe("validateNewsletterForm", () => {
    it("devuelve email validado", () => {
      const data = validateNewsletterForm({ email: "user@mail.com" })
      expect(data.email).toBe("user@mail.com")
    })

    it("lanza si email inválido", () => {
      expect(() => validateNewsletterForm({})).toThrow(/obligatorio|válido|Required/)
      expect(() => validateNewsletterForm({ email: "bad" })).toThrow()
    })
  })
})
