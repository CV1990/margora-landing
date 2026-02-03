import { describe, it, expect, beforeEach, afterEach } from "vitest"
import {
  getWeb3FormsKey,
  getTursoDatabaseUrl,
  getTursoAuthToken,
  getResendApiKey,
  getResendFrom,
} from "@/lib/env"

describe("lib/env", () => {
  const originalEnv = process.env

  beforeEach(() => {
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it("getWeb3FormsKey devuelve NEXT_PUBLIC_WEB3FORMS_KEY", () => {
    process.env.NEXT_PUBLIC_WEB3FORMS_KEY = "key-123"
    expect(getWeb3FormsKey()).toBe("key-123")
    delete process.env.NEXT_PUBLIC_WEB3FORMS_KEY
    expect(getWeb3FormsKey()).toBeUndefined()
  })

  it("getTursoDatabaseUrl devuelve TURSO_DATABASE_URL", () => {
    process.env.TURSO_DATABASE_URL = "libsql://x.turso.io"
    expect(getTursoDatabaseUrl()).toBe("libsql://x.turso.io")
    delete process.env.TURSO_DATABASE_URL
    expect(getTursoDatabaseUrl()).toBeUndefined()
  })

  it("getTursoAuthToken devuelve TURSO_AUTH_TOKEN", () => {
    process.env.TURSO_AUTH_TOKEN = "token"
    expect(getTursoAuthToken()).toBe("token")
    delete process.env.TURSO_AUTH_TOKEN
    expect(getTursoAuthToken()).toBeUndefined()
  })

  it("getResendApiKey devuelve RESEND_API_KEY", () => {
    process.env.RESEND_API_KEY = "re_xxx"
    expect(getResendApiKey()).toBe("re_xxx")
    delete process.env.RESEND_API_KEY
    expect(getResendApiKey()).toBeUndefined()
  })

  it("getResendFrom devuelve RESEND_FROM o cadena vacía", () => {
    process.env.RESEND_FROM = "from@mail.com"
    expect(getResendFrom()).toBe("from@mail.com")
    delete process.env.RESEND_FROM
    expect(getResendFrom()).toBe("")
  })
})
