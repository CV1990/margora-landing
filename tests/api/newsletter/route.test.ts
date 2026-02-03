import { describe, it, expect, vi, beforeEach } from "vitest"
import { POST } from "@/app/api/newsletter/route"

vi.mock("@/lib/db", () => ({
  db: {
    execute: vi.fn().mockResolvedValue(undefined),
  },
}))

describe("POST /api/newsletter", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("devuelve 400 si falta email", async () => {
    const res = await POST(new Request("http://localhost", { method: "POST", body: JSON.stringify({}) }))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBeDefined()
  })

  it("devuelve 400 si email inválido", async () => {
    const res = await POST(
      new Request("http://localhost", { method: "POST", body: JSON.stringify({ email: "no-email" }) })
    )
    expect(res.status).toBe(400)
  })

  it("devuelve 200 y ok con email válido", async () => {
    const res = await POST(
      new Request("http://localhost", { method: "POST", body: JSON.stringify({ email: "user@mail.com" }) })
    )
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.ok).toBe(true)
  })
})
