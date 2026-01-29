const fs = require("fs")
const path = require("path")
const { GoogleGenerativeAI } = require("@google/generative-ai")

function getTopicOfTheDay() {
  const categories = {
    javascript: [
      "Optimización de renders en React 19",
      "Patrones avanzados de Web Components para CDNs",
      "Gestión de estado: Cuándo salir de Redux y usar Context o Zustand"
    ],
    java: [
      "Arquitectura de Microservicios con Spring Boot y Java 21",
      "Seguridad en APIs: Implementando OAuth2 y JWT",
      "Testing integral: De JUnit a Testcontainers para bases de datos"
    ],
    python_ai: [
      "Automatización de flujos de trabajo con Python y APIs de IA",
      "Scraping ético y análisis de precios en Mercado Libre con Python",
      "Despliegue de modelos de lenguaje en Cloudflare Workers"
    ],
    databases: [
      "Turso y libSQL: El futuro de las bases de datos en el Edge",
      "PostgreSQL vs SQLite: Cuándo priorizar la latencia sobre la consistencia",
      "Modelado de datos para sistemas de inventario en tiempo real"
    ],
    news_trends: [
      "Análisis de las novedades en el ecosistema Web (noticia del día)",
      "Nuevas regulaciones de e-commerce y cómo la tecnología debe adaptarse",
      "El impacto de la computación espacial (XR) en las ventas online"
    ]
  }
  const catKeys = Object.keys(categories)
  const selectedCat = catKeys[Math.floor(Math.random() * catKeys.length)]
  const topicList = categories[selectedCat]
  return topicList[Math.floor(Math.random() * topicList.length)]
}

function buildPrompt() {
  return `
Actúa como un CTO y Arquitecto de Software líder en "Margora".
Tu misión es documentar el ecosistema tecnológico actual y tendencias de negocio.

ESTRUCTURA DE SALIDA (JSON ESTRICTO):
{
  "id": "slug-url-amigable",
  "title": "Título SEO (ej: 'Guía de...', 'Por qué usar...', 'Novedades en...')",
  "date": "${new Date().toISOString()}",
  "category": "Elegir entre: Frontend, Backend, Architecture, Databases, AI Automation o Tech News",
  "excerpt": "Meta-descripción de 150 caracteres para SEO técnico.",
  "content": "Contenido en HTML (<h3>, <p>, <strong>, <ul>, <li>, <pre><code> para snippets). Mínimo 800 palabras."
}

CONTEXTO DEL TEMA:
Hoy escribirás sobre: ${getTopicOfTheDay()}

DIRECTRICES TÉCNICAS:
1. Si es documentación (JS, Java, Python): Incluye un ejemplo de código práctico (<pre><code>).
2. Si es noticia/tendencia: Analiza el impacto para empresas de E-commerce.
3. Si es arquitectura: Usa conceptos de Clean Architecture o patrones de diseño.
4. Tono: De experto a experto (Tech Lead), pero con visión de negocio para Margora.

IMPORTANTE: Responde ÚNICAMENTE con un objeto JSON válido. Sin markdown, sin \`\`\`json. Solo el JSON.
`
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
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

  const prompt = buildPrompt()
  const result = await model.generateContent(prompt)
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
