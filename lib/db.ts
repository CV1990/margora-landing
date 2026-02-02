import { createClient } from '@libsql/client'
import { getTursoAuthToken, getTursoDatabaseUrl } from '@/lib/env'

// Configuración de Turso - Validación lazy
function getDb() {
  const tursoUrl = getTursoDatabaseUrl()
  const tursoAuthToken = getTursoAuthToken()

  if (!tursoUrl || !tursoAuthToken) {
    throw new Error('TURSO_DATABASE_URL y TURSO_AUTH_TOKEN deben estar configuradas en las variables de entorno')
  }

  return createClient({
    url: tursoUrl,
    authToken: tursoAuthToken,
  })
}

// Lazy initialization - solo se crea cuando se usa
let dbInstance: ReturnType<typeof getDb> | null = null

export const db = new Proxy({} as ReturnType<typeof getDb>, {
  get(_target, prop) {
    if (!dbInstance) {
      dbInstance = getDb()
    }
    const value = dbInstance[prop as keyof typeof dbInstance]
    return typeof value === 'function' ? value.bind(dbInstance) : value
  }
})

// Inicializar tablas si no existen
export async function initDatabase() {
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        email TEXT PRIMARY KEY NOT NULL
      )
    `)
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
    console.log('✅ Base de datos inicializada correctamente')
  } catch (error) {
    console.error('❌ Error al inicializar la base de datos:', error)
    throw error
  }
}
