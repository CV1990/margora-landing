import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const CONTACT_EMAIL = "carlos.rivas@margora.com"

export async function POST(request: NextRequest) {
  try {
    const { nombre, empresa, correo, mensaje } = await request.json()

    if (!nombre || !empresa || !correo || !mensaje) {
      return NextResponse.json(
        { error: "Nombre, empresa, correo y mensaje son requeridos." },
        { status: 400 }
      )
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY no configurada")
      return NextResponse.json(
        { error: "Servicio de email no configurado." },
        { status: 503 }
      )
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM ?? "onboarding@resend.dev",
      to: CONTACT_EMAIL,
      replyTo: correo,
      subject: `[Margora Contacto] ${empresa} – ${nombre}`,
      html: `
        <h2>Nuevo mensaje desde el formulario de contacto</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Empresa:</strong> ${empresa}</p>
        <p><strong>Correo:</strong> ${correo}</p>
        <h3>Mensaje</h3>
        <p>${mensaje.replace(/\n/g, "<br />")}</p>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: "Mensaje enviado.", id: data?.id }, { status: 201 })
  } catch (e) {
    console.error("Contact API error:", e)
    return NextResponse.json(
      { error: "No se pudo enviar el mensaje. Intenta de nuevo." },
      { status: 500 }
    )
  }
}
