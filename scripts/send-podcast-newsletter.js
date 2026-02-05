/**
 * Envía un correo a los suscriptores del newsletter cuando hay un episodio nuevo en el podcast.
 * Compara el último episodio del feed RSS con el último ya notificado (guardado en Turso).
 *
 * Variables de entorno:
 * - PODCAST_FEED_URL (obligatorio)
 * - TURSO_DATABASE_URL, TURSO_AUTH_TOKEN
 * - RESEND_API_KEY, RESEND_FROM
 * - SITE_URL (opcional)
 *
 * Uso: node scripts/send-podcast-newsletter.js
 */

const Parser = require("rss-parser")

const SITE_URL = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://margora.com"
const BASE_URL = SITE_URL.replace(/\/$/, "")
const LOGO_URL = `${BASE_URL}/assets/images/logo.png`
const PODCAST_PAGE_URL = `${BASE_URL}/podcast`

const SOCIAL_LINKS = [
  { label: "LinkedIn", url: "https://www.linkedin.com/company/margora-ac/", icon: "https://www.linkedin.com/favicon.ico" },
  { label: "Facebook", url: "https://www.facebook.com/margoraConsultora", icon: "https://www.facebook.com/favicon.ico" },
  { label: "Instagram", url: "https://www.instagram.com/consultoramargora/", icon: "https://img.icons8.com/color/32/instagram-new.png" },
  { label: "YouTube", url: "https://www.youtube.com/@margora-consult", icon: "https://www.youtube.com/favicon.ico" },
]

function escapeHtml(str) {
  if (typeof str !== "string") return ""
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function buildEmailHtml(episode, feedTitle) {
  const title = escapeHtml(episode.title)
  const description = escapeHtml((episode.description || "").slice(0, 280))
  const feedName = escapeHtml(feedTitle || "Podcast Margora")
  const episodeUrl = episode.link || PODCAST_PAGE_URL

  const socialHtml = SOCIAL_LINKS.map(
    (s) =>
      `<a href="${escapeHtml(s.url)}" style="text-decoration: none; margin-right: 12px;" title="${escapeHtml(s.label)}"><img src="${escapeHtml(s.icon)}" alt="${escapeHtml(s.label)}" width="28" height="28" style="display: inline-block; vertical-align: middle; border: 0;" /></a>`
  ).join("")

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuevo episodio - Margora Podcast</title>
</head>
<body style="font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 24px;">
  <div style="margin-bottom: 24px;">
    <img src="${escapeHtml(LOGO_URL)}" alt="Margora" width="180" height="52" style="display: block; max-width: 180px; height: auto; border: 0;" />
    <p style="margin: 12px 0 0; font-size: 22px; font-weight: 700; color: #0ea5e9;">Margora Podcast</p>
  </div>
  <p style="margin: 0 0 24px; color: #475569; font-size: 15px;">Hay un nuevo episodio que no te quieres perder.</p>
  <h2 style="font-size: 20px; margin: 0 0 8px;">${title}</h2>
  <p style="color: #64748b; font-size: 14px; margin: 0 0 16px;">${feedName}</p>
  ${description ? `<p style="margin: 0 0 24px;">${description}</p>` : ""}
  <p style="margin: 0 0 32px;">
    <a href="${escapeHtml(episodeUrl)}" style="display: inline-block; background: #0ea5e9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;">Escuchar episodio</a>
    <a href="${escapeHtml(PODCAST_PAGE_URL)}" style="display: inline-block; margin-left: 12px; color: #0ea5e9; padding: 12px 0;">Ver todos los episodios</a>
  </p>
  <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;">
  <p style="font-size: 14px; color: #64748b; margin: 0 0 8px;">Síguenos en redes</p>
  <p style="margin: 0; font-size: 14px;">${socialHtml}</p>
  <p style="font-size: 12px; color: #94a3b8; margin-top: 24px;">
    Recibes este correo porque te suscribiste al newsletter de Margora.
    <a href="${escapeHtml(SITE_URL)}/cookies" style="color: #0ea5e9;">Gestionar preferencias</a>.
  </p>
</body>
</html>
`.trim()
}

async function fetchLatestEpisode(feedUrl) {
  const parser = new Parser({ timeout: 10000, headers: { "User-Agent": "MargoraPodcast/1.0" } })
  const feed = await parser.parseURL(feedUrl)
  const item = feed.items && feed.items[0]
  if (!item) return { feed: null, episode: null }

  const enclosure = item.enclosures?.find(
    (e) => e.type?.startsWith("audio/") || (e.url && /\.(mp3|m4a|ogg|wav)(\?|$)/i.test(e.url))
  )
  const guid = item.guid || item.link || item.title
  const id = typeof guid === "string" ? guid : (guid && guid._) || item.link || item.title || ""

  return {
    feed: { title: feed.title || "Podcast" },
    episode: {
      id: id.trim() || "latest",
      title: item.title || "Nuevo episodio",
      link: item.link || PODCAST_PAGE_URL,
      description: (item.contentSnippet || (item.content || "").replace(/<[^>]+>/g, "").trim()).slice(0, 400),
    },
  }
}

const STATE_KEY_LAST_PODCAST_ID = "last_podcast_episode_id"

async function main() {
  const feedUrl = process.env.PODCAST_FEED_URL
  const tursoUrl = process.env.TURSO_DATABASE_URL
  const tursoToken = process.env.TURSO_AUTH_TOKEN
  const resendKey = process.env.RESEND_API_KEY
  const resendFrom = process.env.RESEND_FROM

  if (!feedUrl) {
    console.log("PODCAST_FEED_URL no configurado. No se envía newsletter de podcast.")
    process.exit(0)
  }
  if (!tursoUrl || !tursoToken) {
    console.error("Faltan TURSO_DATABASE_URL o TURSO_AUTH_TOKEN")
    process.exit(1)
  }
  if (!resendKey || !resendFrom) {
    console.error("Faltan RESEND_API_KEY o RESEND_FROM")
    process.exit(1)
  }

  const { createClient } = require("@libsql/client")
  const db = createClient({ url: tursoUrl, authToken: tursoToken })

  await db.execute(`
    CREATE TABLE IF NOT EXISTS newsletter_state (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT
    )
  `)
  await db.execute(`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      email TEXT PRIMARY KEY NOT NULL
    )
  `)

  const { feed, episode } = await fetchLatestEpisode(feedUrl)
  if (!episode || !episode.id) {
    console.log("No se pudo obtener el último episodio del feed. No se envía correo.")
    process.exit(0)
  }

  const stateResult = await db.execute(
    "SELECT value FROM newsletter_state WHERE key = ?",
    [STATE_KEY_LAST_PODCAST_ID]
  )
  const lastNotifiedId = (stateResult.rows && stateResult.rows[0] && stateResult.rows[0].value) || ""

  if (lastNotifiedId === episode.id) {
    console.log("No hay episodio nuevo. Último ya notificado:", episode.id)
    process.exit(0)
  }

  const subscribersResult = await db.execute("SELECT email FROM newsletter_subscribers")
  const emails = (subscribersResult.rows || []).map((r) => r.email).filter(Boolean)
  if (emails.length === 0) {
    console.log("No hay suscriptores. Se marca episodio como notificado.")
    await db.execute(
      "INSERT OR REPLACE INTO newsletter_state (key, value) VALUES (?, ?)",
      [STATE_KEY_LAST_PODCAST_ID, episode.id]
    )
    process.exit(0)
  }

  const { Resend } = require("resend")
  const resend = new Resend(resendKey)
  const subject = `Nuevo episodio: ${episode.title}`
  const html = buildEmailHtml(episode, feed && feed.title)

  let sent = 0
  let failed = 0
  for (const email of emails) {
    const { error } = await resend.emails.send({ from: resendFrom, to: [email], subject, html })
    if (error) {
      console.error(`Error enviando a ${email}:`, error.message)
      failed++
    } else {
      sent++
    }
    await new Promise((r) => setTimeout(r, 100))
  }

  await db.execute(
    "INSERT OR REPLACE INTO newsletter_state (key, value) VALUES (?, ?)",
    [STATE_KEY_LAST_PODCAST_ID, episode.id]
  )

  console.log(`Newsletter podcast enviado: ${sent} correos. Episodio: ${episode.id}`)
  if (failed > 0) console.warn(`Fallos: ${failed}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
