import { NextRequest, NextResponse } from 'next/server'
import { db, initDatabase } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validar email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email es requerido' },
        { status: 400 }
      )
    }

    // Validar formato de email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Asegurar que la tabla existe
    await initDatabase()

    // Insertar el email en la base de datos
    try {
      await db.execute({
        sql: 'INSERT INTO newsletter_subscribers (email) VALUES (?)',
        args: [email.toLowerCase().trim()],
      })

      return NextResponse.json(
        { message: 'Suscripción exitosa', email },
        { status: 201 }
      )
    } catch (error: any) {
      // Si el email ya existe (UNIQUE constraint)
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE' || error.message?.includes('UNIQUE')) {
        return NextResponse.json(
          { error: 'Este email ya está suscrito' },
          { status: 409 }
        )
      }
      throw error
    }
  } catch (error: any) {
    console.error('Error al procesar suscripción:', error)
    
    // Si faltan las variables de entorno
    if (error.message?.includes('TURSO_DATABASE_URL') || error.message?.includes('TURSO_AUTH_TOKEN')) {
      return NextResponse.json(
        { error: 'Configuración de base de datos no encontrada. Por favor, configura las variables de entorno.' },
        { status: 503 }
      )
    }
    
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// Endpoint para obtener todos los suscriptores (útil para envíos masivos)
export async function GET(request: NextRequest) {
  try {
    await initDatabase()
    
    const result = await db.execute({
      sql: 'SELECT email FROM newsletter_subscribers ORDER BY email ASC',
    })

    return NextResponse.json({
      subscribers: result.rows.map((row) => row.email as string),
      total: result.rows.length,
    })
  } catch (error: any) {
    console.error('Error al obtener suscriptores:', error)
    
    // Si faltan las variables de entorno
    if (error.message?.includes('TURSO_DATABASE_URL') || error.message?.includes('TURSO_AUTH_TOKEN')) {
      return NextResponse.json(
        { error: 'Configuración de base de datos no encontrada. Por favor, configura las variables de entorno.' },
        { status: 503 }
      )
    }
    
    return NextResponse.json(
      { error: 'Error al obtener suscriptores' },
      { status: 500 }
    )
  }
}
