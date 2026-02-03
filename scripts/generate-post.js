// GEMINI_API_KEY: ver lib/env.ts y .env.example
const fs = require("fs")
const path = require("path")
const { GoogleGenerativeAI } = require("@google/generative-ai")

function getTopicOfTheDay() {
  // Solo temas de negocios, tecnología y noticias (sin backend, código ni arquitectura técnica).
  const categories = {
    tech_news: [
      "Novedades del ecosistema web y su impacto en empresas",
      "El impacto de la computación espacial (XR) en las ventas online",
      "Tendencias de IA en el negocio: qué deben saber las empresas",
      "Nuevas regulaciones de e-commerce y cómo la tecnología debe adaptarse",
      "Noticias sobre startups y financiamiento tecnológico"
    ],
    negocios: [
      "Cómo las empresas adoptan nuevas tecnologías sin ser expertas en código",
      "Transformación digital: casos de éxito en retail y servicios",
      "Tendencias de marketing digital y herramientas no técnicas para equipos"
    ],
    tendencias: [
      "Tendencias en herramientas low-code y no-code para negocios",
      "El futuro del trabajo remoto y las herramientas colaborativas",
      "Sostenibilidad y tecnología: qué están haciendo las empresas"
    ]
  }
  const catKeys = Object.keys(categories)
  const selectedCat = catKeys[Math.floor(Math.random() * catKeys.length)]
  const topicList = categories[selectedCat]
  return topicList[Math.floor(Math.random() * topicList.length)]
}

function buildPrompt() {
  return `
Actúa como experto en negocios y tecnología en "Margora".
Tu misión es escribir sobre novedades tecnológicas, tendencias y noticias para empresas. NO escribas sobre implementación técnica, backend, código ni arquitectura de software.

ESTRUCTURA DE SALIDA (JSON ESTRICTO):
{
  "id": "slug-url-amigable",
  "title": "Título SEO (ej: 'Novedades en...', 'Cómo las empresas...', 'Tendencias de...')",
  "date": "${new Date().toISOString()}",
  "category": "Elegir ÚNICAMENTE entre: Tech News, Negocios o Tendencias",
  "excerpt": "Meta-descripción de 150 caracteres para SEO.",
  "content": "Contenido en HTML (<h3>, <p>, <strong>, <ul>, <li>). Mínimo 600 palabras. NO incluyas bloques de código (<pre><code>)."
}

CONTEXTO DEL TEMA:
Hoy escribirás sobre: ${getTopicOfTheDay()}

DIRECTRICES:
1. Enfoque: impacto en negocios, noticias del sector, tendencias. Nada de guías de programación ni ejemplos de código.
2. Tono: accesible para dueños de negocio y equipos no técnicos; visión estratégica.
3. Evita jerga de desarrollo (APIs, backend, bases de datos, frameworks). Habla de herramientas, productos y tendencias por nombre cuando sea relevante.

IMPORTANTE: Responde ÚNICAMENTE con un objeto JSON válido. Sin markdown, sin \`\`\`json. Solo el JSON.
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

async function main() {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    console.error("Falta GEMINI_API_KEY en el entorno.")
    process.exit(1)
  }

  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

  const prompt = buildPrompt()
  const result = await generateWithRetry(model, prompt)
  const text = result.response ? result.response.text() : null
  if (!text) {
    console.error("Gemini no devolvió texto.")
    process.exit(1)
  }

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
