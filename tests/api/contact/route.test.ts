import { describe, it, expect, vi, beforeEach } from "vitest"
import { POST } from "@/app/api/contact/route"

vi.mock("@/lib/db", () => ({
  db: {
    execute: vi.fn().mockResolvedValue(undefined),
  },
}))

vi.mock("@/lib/env", () => ({
  getResendFrom: vi.fn(() => ""),
  getResendApiKey: vi.fn(() => undefined),
}))

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("devuelve 400 si faltan campos", async () => {
    const res = await POST(new Request("http://localhost", { method: "POST", body: JSON.stringify({}) }))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBeDefined()
  })

  it("devuelve 400 si hay enlaces en el mensaje", async () => {
    const res = await POST(
      new Request("http://localhost", {
        method: "POST",
        body: JSON.stringify({
          nombre: "A",
          empresa: "B",
          correo: "a@b.com",
          mensaje: "Visita https://evil.com",
        }),
      })
    )
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toMatch(/enlaces/i)
  })

  it("devuelve 200 y ok con datos válidos", async () => {
    const res = await POST(
      new Request("http://localhost", {
        method: "POST",
        body: JSON.stringify({
          nombre: "Juan",
          empresa: "Acme",
          correo: "juan@acme.com",
          mensaje: "Hola, consulta",
        }),
      })
    )
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.ok).toBe(true)
  })
})
