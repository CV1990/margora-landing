import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { validateNewsletterForm } from "@/lib/form-security"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = validateNewsletterForm(body)

    await db.execute(`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        email TEXT PRIMARY KEY NOT NULL
      )
    `)

    await db.execute({
      sql: `INSERT INTO newsletter_subscribers (email) VALUES (?)`,
      args: [email],
    })

    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error al suscribirse"
    if (String(message).includes("UNIQUE constraint")) {
      return NextResponse.json({ ok: true })
    }
    console.error("Newsletter API error:", err)
    const status = String(message).includes("enlaces") || String(message).includes("obligatorio") || String(message).includes("válido") || String(message) === "Required" ? 400 : 500
    return NextResponse.json(
      { error: message },
      { status }
    )
  }
}
