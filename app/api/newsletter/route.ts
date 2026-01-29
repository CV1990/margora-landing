import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = typeof body?.email === "string" ? body.email.trim() : ""

    if (!email) {
      return NextResponse.json(
        { error: "El correo es obligatorio" },
        { status: 400 }
      )
    }

    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!re.test(email)) {
      return NextResponse.json(
        { error: "Correo no válido" },
        { status: 400 }
      )
    }

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
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}
