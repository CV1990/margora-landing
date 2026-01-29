# Desplegar en HostGator (export estático)

HostGator sirve **archivos estáticos y PHP** (Apache). No ejecuta Node.js. Por eso usamos **export estático** de Next.js: se genera la carpeta **`out/`** con HTML, CSS y JS que Apache puede servir directamente.

## 1. Modificar `next.config` (ya aplicado)

En `next.config.mjs` está configurado:

```js
output: 'export'
```

Eso hace que `npm run build` genere **`out/`** en lugar de solo `.next/`.

## 2. API de contacto y newsletter (NestJS/Railway)

Las rutas **`/api/contact`** y **`/api/newsletter`** se han eliminado de este proyecto. El front estático en HostGator debe llamar a tu **API en NestJS (Railway)**.

- Configura **`NEXT_PUBLIC_API_BASE_URL`** con la URL base de tu API (ej. `https://api-margora.railway.app`).
- El formulario de contacto hace **POST** a `{NEXT_PUBLIC_API_BASE_URL}/contact`.
- El newsletter hace **POST** a `{NEXT_PUBLIC_API_BASE_URL}/newsletter`.

Si no configuras `NEXT_PUBLIC_API_BASE_URL`, los botones de envío se deshabilitan y se muestra un aviso. Para producción en HostGator, **siempre** define esta variable al hacer el build.

## 3. Build local

**Cierra `next dev`** (y cualquier proceso que use `.next`) antes de hacer el build para evitar errores de permisos.

```bash
# Opcional: definir la API para el build
set NEXT_PUBLIC_API_BASE_URL=https://api-margora.railway.app   # Windows CMD
# o
$env:NEXT_PUBLIC_API_BASE_URL="https://api-margora.railway.app"  # PowerShell

npm run build
```

Comprueba que exista la carpeta **`out/`** y dentro **`index.html`**. Para validar:

```bash
npm run build:check
```

## 4. Preparar el ZIP para HostGator

1. Entra en la carpeta **`out/`**.
2. Selecciona **todo lo que hay dentro** (no la carpeta `out` en sí, sino su contenido).
3. Crea un archivo **ZIP** con ese contenido (por ejemplo `margora-hostgator.zip`).

Ese ZIP debe contener en la raíz `index.html`, carpetas `_next/`, etc.

## 5. Subir a HostGator

1. **Limpia `public_html`**: borra todo lo que haya (WordPress, etc.).
2. **Sube el ZIP** a `public_html` (p. ej. por File Manager o FTP).
3. **Descomprime** el ZIP en `public_html`.

El sitio debería verse en tu dominio (ej. `https://tudominio.com`).

## 6. Qué se pierde al usar export estático

- No hay **API routes** de Next.js (por eso se usan NestJS/Railway).
- No hay **`getServerSideProps`** ni **SSR**.
- No hay **rutas dinámicas** con servidor.

El front en HostGator es 100 % estático; los datos y envío de formularios los resuelve tu API en Railway.

## 7. Resumen de comandos

```bash
# Build
npm run build

# Verificar que exista out/
npm run build:check

# Luego: ZIP del contenido de out/ → subir a public_html → extraer
```
