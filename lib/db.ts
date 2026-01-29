import { createClient } from '@libsql/client'

// Configuración de Turso - Validación lazy
function getDb() {
  const tursoUrl = process.env.TURSO_DATABASE_URL
  const tursoAuthToken = process.env.TURSO_AUTH_TOKEN

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

// Inicializar la tabla de suscriptores si no existe
// Solo guarda el correo electrónico
export async function initDatabase() {
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        email TEXT PRIMARY KEY NOT NULL
      )
    `)
    console.log('✅ Base de datos inicializada correctamente')
  } catch (error) {
    console.error('❌ Error al inicializar la base de datos:', error)
    throw error
  }
}
