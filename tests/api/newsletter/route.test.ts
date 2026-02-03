import { describe, it, expect, vi, beforeEach } from "vitest"
import { POST } from "@/app/api/newsletter/route"
import { db } from "@/lib/db"

vi.mock("@/lib/db", () => ({
  db: {
    execute: vi.fn().mockResolvedValue(undefined),
  },
}))

describe("POST /api/newsletter", () => {
  beforeEach(() => {
    vi.mocked(db.execute).mockClear()
    vi.mocked(db.execute).mockResolvedValue(undefined as never)
  })

  it("devuelve 400 si falta email", async () => {
    const res = await POST(new Request("http://localhost", { method: "POST", body: JSON.stringify({}) }))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBeDefined()
    expect(db.execute).not.toHaveBeenCalledWith(
      expect.objectContaining({ sql: expect.stringContaining("INSERT") })
    )
  })

  it("devuelve 400 si email inválido", async () => {
    const res = await POST(
      new Request("http://localhost", { method: "POST", body: JSON.stringify({ email: "no-email" }) })
    )
    expect(res.status).toBe(400)
    expect(db.execute).not.toHaveBeenCalledWith(
      expect.objectContaining({ sql: expect.stringContaining("INSERT") })
    )
  })

  it("devuelve 200 y ok con email válido", async () => {
    const res = await POST(
      new Request("http://localhost", { method: "POST", body: JSON.stringify({ email: "user@mail.com" }) })
    )
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.ok).toBe(true)
  })

  it("guarda el email en la base de datos con INSERT en newsletter_subscribers", async () => {
    const email = "nuevo@ejemplo.com"
    await POST(
      new Request("http://localhost", { method: "POST", body: JSON.stringify({ email }) })
    )

    expect(db.execute).toHaveBeenCalledWith(
      expect.objectContaining({
        sql: expect.stringMatching(/INSERT INTO newsletter_subscribers/i),
        args: [email],
      })
    )
  })

  it("crea la tabla newsletter_subscribers si no existe", async () => {
    await POST(
      new Request("http://localhost", { method: "POST", body: JSON.stringify({ email: "a@b.com" }) })
    )

    expect(db.execute).toHaveBeenCalledWith(
      expect.stringMatching(/CREATE TABLE IF NOT EXISTS newsletter_subscribers/i)
    )
  })
})
