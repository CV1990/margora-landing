/**
 * Envía el último post del blog por email a todos los suscriptores del newsletter.
 * Usa Turso (newsletter_subscribers) y Resend.
 *
 * Variables de entorno:
 * - TURSO_DATABASE_URL, TURSO_AUTH_TOKEN
 * - RESEND_API_KEY, RESEND_FROM (por defecto info@margora.com)
 * - SITE_URL o NEXT_PUBLIC_SITE_URL (ej: https://margora.com)
 *
 * Uso: node scripts/send-newsletter.js
 * En local: cargar .env.local con scripts/send-newsletter-devlocal.js
 */

const fs = require("fs")
const path = require("path")

const SITE_URL = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://margora.com"
const BASE_URL = SITE_URL.replace(/\/$/, "")
const LOGO_URL = `${BASE_URL}/assets/images/logo.png`

// Icones oficiales desde los dominios de cada red (favicon / iconos de marca)
const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/company/margora-ac/",
    icon: "https://www.linkedin.com/favicon.ico",
  },
  {
    label: "Facebook",
    url: "https://www.facebook.com/margoraConsultora",
    icon: "https://www.facebook.com/favicon.ico",
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com/consultoramargora/",
    icon: "https://img.icons8.com/color/32/instagram-new.png",
  },
  {
    label: "YouTube",
    url: "https://www.youtube.com/@margora-consult",
    icon: "https://www.youtube.com/favicon.ico",
  },
]

function escapeHtml(str) {
  if (typeof str !== "string") return ""
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function buildMotivationalMessage(category) {
  const messages = [
    "Tu tiempo es valioso. Este contenido fue preparado para inspirarte y acercarte a las tendencias que marcan la diferencia.",
    "Seguir aprendiendo es la mejor inversión. Esperamos que esta lectura te motive y te dé ideas para tu día a día.",
    "Cada semana compartimos ideas para que sigas creciendo. Disfruta esta lectura y cuéntanos qué te hubiera gustado profundizar.",
  ]
  const i = Math.abs((category || "").split("").reduce((a, c) => a + c.charCodeAt(0), 0)) % messages.length
  return messages[i]
}

function buildEmailHtml(post, postUrl) {
  const title = escapeHtml(post.title)
  const excerpt = escapeHtml(post.excerpt)
  const category = escapeHtml(post.category || "")
  const motivational = escapeHtml(buildMotivationalMessage(post.category))

  const socialHtml = SOCIAL_LINKS.map(
    (s) =>
      `<a href="${escapeHtml(s.url)}" style="text-decoration: none; margin-right: 12px;" title="${escapeHtml(s.label)}" aria-label="${escapeHtml(s.label)}"><img src="${escapeHtml(s.icon)}" alt="${escapeHtml(s.label)}" width="28" height="28" style="display: inline-block; vertical-align: middle; border: 0;" /></a>`
  ).join("")

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Margora Newsletter</title>
</head>
<body style="font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 24px;">
  <div style="margin-bottom: 24px;">
    <img src="${escapeHtml(LOGO_URL)}" alt="Margora" width="180" height="52" style="display: block; max-width: 180px; height: auto; border: 0;" />
    <p style="margin: 12px 0 0; font-size: 22px; font-weight: 700; color: #0ea5e9;">Margora Newsletter</p>
  </div>
  <p style="margin: 0 0 24px; color: #475569; font-size: 15px;">${motivational}</p>
  <h2 style="font-size: 20px; margin: 0 0 8px;">${title}</h2>
  ${category ? `<p style="color: #64748b; font-size: 14px; margin: 0 0 16px;">${category}</p>` : ""}
  <p style="margin: 0 0 24px;">${excerpt}</p>
  <p style="margin: 0 0 32px;">
    <a href="${escapeHtml(postUrl)}" style="display: inline-block; background: #0ea5e9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;">Leer más</a>
  </p>
  <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;">
  <p style="font-size: 14px; color: #64748b; margin: 0 0 8px;">Síguenos en redes</p>
  <p style="margin: 0; font-size: 14px;">
    ${socialHtml}
  </p>
  <p style="font-size: 12px; color: #94a3b8; margin-top: 24px;">
    Recibes este correo porque te suscribiste al newsletter de Margora.
    <a href="${escapeHtml(SITE_URL)}/cookies" style="color: #0ea5e9;">Gestionar preferencias</a>.
  </p>
</body>
</html>
`.trim()
}

async function main() {
  const tursoUrl = process.env.TURSO_DATABASE_URL
  const tursoToken = process.env.TURSO_AUTH_TOKEN
  const resendKey = process.env.RESEND_API_KEY
  const resendFrom = process.env.RESEND_FROM

  if (!tursoUrl || !tursoToken) {
    console.error("Faltan TURSO_DATABASE_URL o TURSO_AUTH_TOKEN")
    process.exit(1)
  }
  if (!resendKey || !resendFrom) {
    console.error("Faltan RESEND_API_KEY o RESEND_FROM")
    process.exit(1)
  }

  const postsPath = path.join(__dirname, "..", "data", "posts.json")
  if (!fs.existsSync(postsPath)) {
    console.error("No existe data/posts.json")
    process.exit(1)
  }

  const posts = JSON.parse(fs.readFileSync(postsPath, "utf8"))
  const post = posts[0]
  if (!post || !post.id || !post.title) {
    console.error("No hay ningún post en posts.json")
    process.exit(1)
  }
  console.log("Enviando último post:", post.id, "| fecha:", post.date || "(sin fecha)")

  const postUrl = `${SITE_URL.replace(/\/$/, "")}/blog/${post.id}`

  const { createClient } = require("@libsql/client")
  const db = createClient({
    url: tursoUrl,
    authToken: tursoToken,
  })

  await db.execute(`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      email TEXT PRIMARY KEY NOT NULL
    )
  `)

  const result = await db.execute("SELECT email FROM newsletter_subscribers")
  const emails = (result.rows || []).map((r) => r.email).filter(Boolean)

  if (emails.length === 0) {
    console.log("No hay suscriptores. No se envía ningún correo.")
    process.exit(0)
  }

  const { Resend } = require("resend")
  const resend = new Resend(resendKey)
  const subject = `Margora Newsletter: ${post.title}`
  const html = buildEmailHtml(post, postUrl)

  let sent = 0
  let failed = 0

  for (const email of emails) {
    const { error } = await resend.emails.send({
      from: resendFrom,
      to: [email],
      subject,
      html,
    })
    if (error) {
      console.error(`Error enviando a ${email}:`, error.message)
      failed++
    } else {
      sent++
    }
    await new Promise((r) => setTimeout(r, 100))
  }

  console.log(`Newsletter enviado: ${sent} correos. Post: ${post.id}`)
  if (failed > 0) {
    console.warn(`Fallos: ${failed}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
