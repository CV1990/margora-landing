# Despliegue en Vercel

Este documento describe cómo desplegar Margora en Vercel con Node.js y variables de entorno.

## Requisitos previos

- Cuenta en [Vercel](https://vercel.com)
- Repositorio del proyecto en GitHub/GitLab/Bitbucket (recomendado para deploys automáticos)

## Pasos para desplegar

### 1. Conectar el repositorio

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Click en **Add New** → **Project**
3. Importa tu repositorio (conecta GitHub/GitLab si aún no está vinculado)
4. Vercel detectará automáticamente Next.js

### 2. Configurar variables de entorno

En el proyecto de Vercel, ve a **Settings** → **Environment Variables** y añade:

#### Obligatorias (para API y base de datos)

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `TURSO_DATABASE_URL` | URL de la base Turso (libsql) | `libsql://xxx.turso.io` |
| `TURSO_AUTH_TOKEN` | Token de autenticación Turso | `eyJhbGc...` |

#### Cliente (formulario y newsletter vía Web3Forms)

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | API key de Web3Forms | `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` |

#### Opcionales (envío de emails con Resend)

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `RESEND_API_KEY` | API key de Resend | `re_xxxxxxxxxxxx` |
| `RESEND_FROM` | Email remitente verificado en Resend | `contacto@tudominio.com` |

#### Solo para scripts locales

| Variable | Descripción |
|----------|-------------|
| `GEMINI_API_KEY` | Para `generate-post` (no hace falta en Vercel) |

#### GitHub Actions (blog-cron: generar post y enviar newsletter)

En **Settings → Secrets and variables → Actions** del repo, configura además (para que el step "Enviar newsletter" funcione):

| Secret | Descripción |
|--------|-------------|
| `TURSO_DATABASE_URL` | URL de Turso (ya usado en deploy) |
| `TURSO_AUTH_TOKEN` | Token Turso |
| `RESEND_API_KEY` | API key de Resend |
| `RESEND_FROM` | Email remitente Resend |
| `SITE_URL` | URL del sitio (ej. `https://margora.com`). Opcional; si no está, se usa `https://margora.com` por defecto |

> **Importante:** Las variables con prefijo `NEXT_PUBLIC_` son accesibles en el cliente. Las demás solo en el servidor (API routes, `lib/db.ts`, etc.).

### 3. Entornos (Production, Preview, Development)

Puedes asignar variables a:

- **Production** – deploys desde `main` (o la rama de producción)
- **Preview** – deploys de PRs y otras ramas
- **Development** – entorno local con `vercel dev`

Configura al menos Production con todas las variables necesarias.

### 4. Deploy

Tras guardar las variables:

- Si conectaste un repo: cada push a la rama principal hará deploy automático
- Para deploy manual: `vercel` o `vercel --prod` (tras instalar la CLI)

## Comandos útiles

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy de preview
vercel

# Deploy a producción
vercel --prod

# Ejecutar localmente con variables de Vercel
vercel dev
```

## Verificar que todo funciona

1. **Formulario de contacto** – Usa `NEXT_PUBLIC_WEB3FORMS_KEY` (cliente) o las API routes internas con Turso + Resend
2. **Newsletter** – Igual que el contacto
3. **Base de datos** – Turso debe tener `TURSO_DATABASE_URL` y `TURSO_AUTH_TOKEN` correctos
4. **Blog** – Las rutas dinámicas (`/blog/[slug]`) funcionan sin configuración extra

## Diferencias con HostGator (static export)

Este proyecto está configurado para **Vercel** (modo Node.js/serverless):

- `output: 'export'` fue removido de `next.config.mjs`
- Las API routes (`/api/contact`, `/api/newsletter`) funcionan como funciones serverless
- Las variables de entorno se leen en runtime (no solo en build)
- Para hosting estático (HostGator, Netlify static, etc.) se necesita otra configuración
