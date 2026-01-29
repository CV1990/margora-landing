import { NextResponse } from "next/server"
import { Resend } from "resend"
import { db } from "@/lib/db"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nombre, empresa, correo, mensaje } = body

    if (!nombre || !empresa || !correo || !mensaje) {
      return NextResponse.json(
        { error: "Faltan campos: nombre, empresa, correo, mensaje" },
        { status: 400 }
      )
    }

    const from = process.env.RESEND_FROM ?? ""

    // Asegurar que la tabla existe en Turso
    await db.execute(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        empresa TEXT NOT NULL,
        correo TEXT NOT NULL,
        mensaje TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now'))
      )
    `)

    // Guardar en Turso
    await db.execute({
      sql: `INSERT INTO contact_submissions (nombre, empresa, correo, mensaje) VALUES (?, ?, ?, ?)`,
      args: [nombre.trim(), empresa.trim(), correo.trim(), mensaje.trim()],
    })

    // Enviar email con Resend (opcional: si falla, el mensaje ya está guardado en Turso)
    if (process.env.RESEND_API_KEY && from) {
      const { error } = await resend.emails.send({
        from: from,
        to: [from],
        subject: `[Margora] Contacto: ${nombre} - ${empresa}`,
        html: `
          <h2>Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Empresa:</strong> ${empresa}</p>
          <p><strong>Correo:</strong> ${correo}</p>
          <p><strong>Mensaje:</strong></p>
          <pre>${mensaje}</pre>
        `,
      })
      if (error) {
        console.error("Resend error (mensaje ya guardado en Turso):", error)
        // Si el dominio no está verificado en Resend, ver: https://resend.com/domains
      }
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Contact API error:", err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error al procesar el mensaje" },
      { status: 500 }
    )
  }
}
