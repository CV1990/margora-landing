import { describe, it, expect, vi, beforeEach } from "vitest"

vi.mock("@/lib/env", () => ({
  getTursoDatabaseUrl: vi.fn(() => undefined),
  getTursoAuthToken: vi.fn(() => undefined),
}))

vi.mock("@libsql/client", () => ({
  createClient: vi.fn(() => ({
    execute: vi.fn().mockResolvedValue(undefined),
  })),
}))

describe("lib/db", () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it("lanza si faltan TURSO_DATABASE_URL y TURSO_AUTH_TOKEN", async () => {
    const { db } = await import("@/lib/db")
    expect(() => db.execute("SELECT 1")).toThrow(/TURSO_DATABASE_URL|variables de entorno/)
  })
})
