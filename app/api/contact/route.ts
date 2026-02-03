import { NextResponse } from "next/server"
import { Resend } from "resend"
import { db } from "@/lib/db"
import { getResendApiKey, getResendFrom } from "@/lib/env"
import { validateContactForm } from "@/lib/form-security"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const safe = validateContactForm(body)

    const from = getResendFrom()

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

    // Guardar en Turso (datos ya sanitizados y validados)
    await db.execute({
      sql: `INSERT INTO contact_submissions (nombre, empresa, correo, mensaje) VALUES (?, ?, ?, ?)`,
      args: [safe.nombre, safe.empresa, safe.correo, safe.mensaje],
    })

    // Enviar email con Resend (opcional: si falla, el mensaje ya está guardado en Turso)
    const resendApiKey = getResendApiKey()
    if (resendApiKey && from) {
      const resend = new Resend(resendApiKey)
      const { error } = await resend.emails.send({
        from: from,
        to: [from],
        subject: `[Margora] Contacto: ${safe.nombre} - ${safe.empresa}`,
        html: `
          <h2>Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${escapeHtml(safe.nombre)}</p>
          <p><strong>Empresa:</strong> ${escapeHtml(safe.empresa)}</p>
          <p><strong>Correo:</strong> ${escapeHtml(safe.correo)}</p>
          <p><strong>Mensaje:</strong></p>
          <pre>${escapeHtml(safe.mensaje)}</pre>
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
    const message = err instanceof Error ? err.message : "Error al procesar el mensaje"
    const status = message.includes("enlaces") || message.includes("obligatorio") || message.includes("Máximo") || message === "Required" ? 400 : 500
    return NextResponse.json({ error: message }, { status })
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}
