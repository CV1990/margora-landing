// GEMINI_API_KEY: ver lib/env.ts y .env.example
const fs = require("fs")
const path = require("path")
const { GoogleGenerativeAI } = require("@google/generative-ai")



function getDynamicPrompt() {
  const topics = [
    {
      theme: "Introducción al GEO para Negocios",
      prompt: "Escribe un post para el blog de Margora sobre por qué el SEO tradicional ha muerto frente al GEO (Generative Engine Optimization). Explica cómo los LLMs como Gemini y GPT-4 consumen información y por qué las empresas necesitan una arquitectura de datos 'AI-Ready'. Menciona a Margora como el partner ideal para esta transición."
    },
    {
      theme: "Optimización Técnica (AIO)",
      prompt: "Genera una guía técnica sobre AIO (AI Optimization). Enfócate en la importancia de los datos estructurados (Schema.org), el uso de Markdown en el contenido web y la configuración de permisos para bots de IA (GPTBot, ClaudeBot). Incluye un ejemplo de código JSON-LD para una entidad de 'Service' que ofrezca Margora."
    },
    {
      theme: "El Futuro de la Búsqueda Conversacional",
      prompt: "Redacta un artículo de opinión técnica sobre cómo las búsquedas de voz y los agentes de IA (como los que desarrollamos en Margora) están cambiando el funnel de ventas. Explica la importancia de la 'Autoridad de Entidad' sobre las 'Keywords' simples."
    }
  ]
  return topics[Math.floor(Math.random() * topics.length)]
}

function buildPrompt() {
  const selectedTopic = getDynamicPrompt()

  return `
Actúa como experto en "Generative Engine Optimization" (GEO) y Arquitecto de Software Senior en "Margora".
Tu misión es escribir artículos técnicos que posicionen a Margora como la autoridad líder en visibilidad para IA.

ESTRUCTURA DE SALIDA (JSON ESTRICTO):
{
  "id": "slug-url-amigable",
  "title": "Título H1 impactante y con la keyword 'AIO' o 'GEO'",
  "date": "${new Date().toISOString()}",
  "category": "Elegir ÚNICAMENTE entre: Tech News, Negocios o Tendencias",
  "excerpt": "Meta-descripción de máximo 150 caracteres para SEO.",
  "content": "Contenido en HTML válido (<h2>, <h3>, <p>, <strong>, <ul>, <li>, <pre><code>). Mínimo 600 palabras."
}

CONTEXTO Y TEMA ESPECÍFICO:
Tema: ${selectedTopic.theme}
Instrucción: ${selectedTopic.prompt}

DIRECTRICES OBLIGATORIAS PARA EL CONTENIDO HTML:
1. Tono: Profesional, vanguardista, directo y altamente técnico pero accionable.
2. Respuesta Directa (Snippet): El PRIMER párrafo debe ser de máximo 40 palabras y responder de forma definitiva "¿Qué es [Tema]?" para que la IA lo use como respuesta directa.
3. Estructura: Piensa en Markdown (H2, H3, listas de puntos, tablas comparativas) pero ENTREGA HTML VÁLIDO. Usa <h2>, <h3>, <ul>, <li> y de ser necesario, puedes usar <table>. NO entregues Markdown crudo en el campo content.
4. Sección Técnica: Debes incluir siempre un ejemplo de código (ej. configuración de robots.txt o JSON-LD relacionado al tema) dentro de etiquetas <pre><code>...</code></pre>.
5. Conclusión: Debe cerrar siempre con un CTA (Call to Action) dirigido a contratar los servicios de consultoría de Margora.

IMPORTANTE: Responde ÚNICAMENTE con un objeto JSON válido. Sin markdown rodeando el JSON, sin \`\`\`json. Solo envía el objeto JSON crudo.
`
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function generateWithRetry(model, prompt, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await model.generateContent(prompt)
      return result
    } catch (err) {
      const is429 =
        err.status === 429 ||
        (err.message && (err.message.includes("429") || err.message.includes("Too Many Requests") || err.message.includes("Resource exhausted")))
      if (is429 && attempt < maxRetries) {
        const delayMs = Math.pow(2, attempt) * 15000 // 30s, 60s, 120s
        console.warn(`Rate limit (429). Reintento ${attempt}/${maxRetries} en ${delayMs / 1000}s...`)
        await sleep(delayMs)
      } else {
        throw err
      }
    }
  }
}

function extractJson(text) {
  let raw = text.trim()
  const jsonBlock = raw.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (jsonBlock) raw = jsonBlock[1].trim()
  return JSON.parse(raw)
}

async function getTextFromResponse(result) {
  if (!result || !result.response) return null
  try {
    if (typeof result.response.text === "function") {
      const out = result.response.text()
      return typeof out?.then === "function" ? await out : out
    }
    const c = result.response.candidates
    if (c && c[0] && c[0].content && c[0].content.parts && c[0].content.parts[0]) {
      const part = c[0].content.parts[0]
      return part.text != null ? part.text : null
    }
  } catch (_) { }
  return null
}

const GEMINI_MODELS = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.5-flash-8b", "gemini-1.5-pro"]

async function main() {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    console.error("Falta GEMINI_API_KEY en el entorno.")
    process.exit(1)
  }

  const genAI = new GoogleGenerativeAI(apiKey)
  const prompt = buildPrompt()

  let text = null
  let usedModel = null

  for (const modelId of GEMINI_MODELS) {
    try {
      const model = genAI.getGenerativeModel({ model: modelId })
      const result = await generateWithRetry(model, prompt)
      text = await getTextFromResponse(result)
      if (text) {
        usedModel = modelId
        break
      }
    } catch (err) {
      console.warn(`Modelo ${modelId} falló:`, err.message)
    }
  }

  if (!text) {
    console.error("Ningún modelo Gemini devolvió texto. Revisa GEMINI_API_KEY y la API de Google AI.")
    process.exit(1)
  }
  if (usedModel) console.log("Modelo usado:", usedModel)

  let post
  try {
    post = extractJson(text)
  } catch (e) {
    console.error("No se pudo parsear el JSON de Gemini:", e.message)
    console.error("Respuesta:", text.slice(0, 500))
    process.exit(1)
  }

  const required = ["id", "title", "date", "category", "excerpt", "content"]
  for (const key of required) {
    if (!post[key]) {
      console.error("El post no tiene el campo requerido:", key)
      process.exit(1)
    }
  }

  const dataPath = path.join(__dirname, "..", "data", "posts.json")
  let posts = []
  if (fs.existsSync(dataPath)) {
    posts = JSON.parse(fs.readFileSync(dataPath, "utf8"))
  }
  posts.unshift(post)
  fs.writeFileSync(dataPath, JSON.stringify(posts, null, 2), "utf8")

  console.log("Post generado y guardado:", post.id)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
