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

En **Settings → Secrets and variables → Actions** del repo configura estos secrets. El workflow se ejecuta cada día a las **16:00 UTC (10:00 AM México)** y también en cada push a `main` o al dispararlo manualmente (Actions → Margora CI/CD → Run workflow).

| Secret | Descripción | Necesario para |
|--------|-------------|-----------------|
| `GEMINI_API_KEY` | API key de Google AI (Gemini). [Google AI Studio](https://aistudio.google.com/apikey). | Crear nuevo post del blog |
| `TURSO_DATABASE_URL` | URL de Turso (ya usado en deploy) | Newsletter blog/podcast y commit |
| `TURSO_AUTH_TOKEN` | Token Turso | Newsletter |
| `RESEND_API_KEY` | API key de Resend | Enviar correos (blog y podcast) |
| `RESEND_FROM` | Email remitente verificado en Resend | Enviar correos |
| `PODCAST_FEED_URL` | URL del feed RSS del podcast (misma que en Vercel) | Enviar correo cuando hay episodio nuevo |
| `SITE_URL` | URL del sitio (ej. `https://margora.com`). Opcional. | Links en los emails |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Para el build en CI | Build |

**Comportamiento de los correos:**  
- **Blog:** Se envía un correo a los suscriptores **solo cuando se genera un post nuevo** (paso de IA exitoso).  
- **Podcast:** Se consulta el feed RSS; si el último episodio es distinto al último ya notificado, se envía un correo con el nuevo episodio. El estado “último notificado” se guarda en Turso.

> **Importante:** Las variables con prefijo `NEXT_PUBLIC_` son accesibles en el cliente. Las demás solo en el servidor (API routes, `lib/db.ts`, etc.).

### Si no se generan blogs ni llegan los correos del newsletter

1. **Ejecuta el workflow a mano**  
   GitHub → repo → **Actions** → **Margora CI/CD - Auto Blog & Deploy** → **Run workflow** → **Run workflow**. Así ves si falla y dónde.

2. **Revisa el paso "0. Diagnóstico de secrets"**  
   En el log de la ejecución, abre ese paso. Ahí sale si cada secret está **OK** o **FALTA**. Si alguno dice FALTA, añádelo en **Settings → Secrets and variables → Actions** del repositorio.

3. **Secrets que deben estar en Actions (no solo en Vercel):**
   - **GEMINI_API_KEY** – Sin este no se genera el post. Crea uno en [Google AI Studio](https://aistudio.google.com/apikey).
   - **TURSO_DATABASE_URL** y **TURSO_AUTH_TOKEN** – Para leer los emails de suscriptores.
   - **RESEND_API_KEY** y **RESEND_FROM** – Para enviar los correos (dominio verificado en Resend).
   - **PODCAST_FEED_URL** – Para que se envíe correo cuando haya un episodio nuevo en el podcast (la misma URL del feed RSS que uses en Vercel).

4. **Workflow deshabilitado**  
   En **Actions**, si el workflow sale como "disabled", actívalo (el cron solo corre si está habilitado y el archivo está en la rama por defecto, normalmente `main`).

5. **El cron no ha corrido**  
   Los cron de GitHub pueden retrasarse. Para tener post y newsletter ya, usa **Run workflow** manual.

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
