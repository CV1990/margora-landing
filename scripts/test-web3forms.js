/**
 * Prueba directa a la API de Web3Forms con la clave de .env.local.
 * Ejecutar: npm run test:web3forms
 * Sirve para ver el error real de la API (clave inválida, rate limit, etc.).
 */

const fs = require("fs")
const path = require("path")
const https = require("https")

const envPath = path.join(__dirname, "..", ".env.local")
if (!fs.existsSync(envPath)) {
  console.error("No existe .env.local en la raíz del proyecto.")
  process.exit(1)
}

const content = fs.readFileSync(envPath, "utf8")
let NEXT_PUBLIC_WEB3FORMS_KEY = ""
for (const line of content.split("\n")) {
  const trimmed = line.trim()
  if (trimmed.startsWith("NEXT_PUBLIC_WEB3FORMS_KEY=")) {
    const val = trimmed.slice("NEXT_PUBLIC_WEB3FORMS_KEY=".length).trim()
    NEXT_PUBLIC_WEB3FORMS_KEY = val.replace(/^["']|["']$/g, "")
    break
  }
}

if (!NEXT_PUBLIC_WEB3FORMS_KEY) {
  console.error("NEXT_PUBLIC_WEB3FORMS_KEY no está definida en .env.local")
  process.exit(1)
}

console.log("Clave leída (primeros 8 chars):", NEXT_PUBLIC_WEB3FORMS_KEY.slice(0, 8) + "...")
console.log("Enviando POST a https://api.web3forms.com/submit ...")

const body = JSON.stringify({
  access_key: NEXT_PUBLIC_WEB3FORMS_KEY,
  subject: "[Margora] Test desde script",
  from_name: "Test",
  name: "Test",
  email: "test@test.com",
  message: "Mensaje de prueba",
})

const req = https.request(
  {
    hostname: "api.web3forms.com",
    path: "/submit",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(body),
    },
  },
  (res) => {
    let data = ""
    res.on("data", (chunk) => (data += chunk))
    res.on("end", () => {
      console.log("Status:", res.statusCode)
      try {
        const json = JSON.parse(data)
        console.log("Respuesta:", JSON.stringify(json, null, 2))
        if (json.success) {
          console.log("\n✅ La API aceptó la clave. El problema no es la clave ni la API.")
        } else {
          console.log("\n❌ La API rechazó:", json.message || json)
        }
      } catch {
        console.log("Body:", data)
      }
    })
  }
)

req.on("error", (err) => {
  console.error("Error de red:", err.message)
  process.exit(1)
})

req.write(body)
req.end()
