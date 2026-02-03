# Seguridad – Formularios y aplicación

## Implementado en este proyecto

- **Validación de entradas** (Zod): formato, longitud máxima, tipos.
- **Sanitización XSS** (lib/form-security): se elimina HTML y patrones de script en todos los campos de texto (sin dependencias ESM problemáticas).
- **Bloqueo de enlaces**: no se aceptan URLs en ningún campo (http, https, www, dominios .com/.net/etc.).
- **Límites de longitud**: nombre 120, empresa 200, correo 254, mensaje 5000 caracteres.
- **Validación en servidor**: las API routes `/api/contact` y `/api/newsletter` usan los mismos esquemas y sanitización.
- **Escape en salida**: en el email de Resend se hace escape de HTML para evitar inyección en el cuerpo del correo.
- **Headers de seguridad** (next.config): X-Frame-Options, X-Content-Type-Options, Referrer-Policy, X-XSS-Protection.

## Temas a abordar para seguridad (checklist)

1. **Validación de entradas** – Formato, longitud, tipo (email, texto). ✅
2. **Sanitización (XSS)** – Eliminar HTML y scripts en datos de usuario. ✅
3. **Bloqueo de URLs en formularios** – Evitar spam y phishing desde los campos. ✅
4. **Límites de longitud** – Evitar payloads enormes y DoS. ✅
5. **Validación en servidor** – No confiar solo en el cliente; revalidar en API. ✅
6. **Escape de salida** – Al mostrar o enviar datos (p. ej. en emails). ✅
7. **Headers de seguridad** – X-Frame-Options, X-Content-Type-Options, CSP, etc. ✅ (parcial; CSP opcional).
8. **HTTPS** – Todo el tráfico por TLS (Vercel/hosting lo suele ofrecer).
9. **Protección CSRF** – Tokens en formularios que llaman a tu API (no aplica a Web3Forms desde cliente).
10. **Rate limiting** – Límite de envíos por IP/usuario (Vercel/Cloudflare o middleware).
11. **Monitoreo** – Logs, alertas, detección de abuso (Vercel Analytics, Sentry, etc.).
12. **Secrets y variables de entorno** – No commitear claves; usar env en build/runtime.
13. **Dependencias** – Revisar vulnerabilidades con `npm audit` / Dependabot.
14. **Content Security Policy (CSP)** – Restringir orígenes de scripts y estilos (opcional, más estricto).

## Librerías usadas para seguridad y monitoreo

| Uso | Librería | Notas |
|-----|----------|--------|
| Validación de formularios | **Zod** | Esquemas, tipos, mensajes de error. |
| Sanitización XSS | **form-security.ts** (regex + strip tags) | Funciona en API routes (Node) sin dependencias ESM. |
| Monitoreo de dependencias | **npm audit** | `npm audit` y Dependabot en GitHub. |
| Headers de seguridad | **Next.js config** | `headers()` en `next.config.mjs`. |
| Monitoreo en producción | **Vercel Analytics** | Ya en el proyecto; útil para uso y errores. |
| Errores en producción | **Sentry** (opcional) | Integración con Next.js para trazas y alertas. |

## Cómo revisar vulnerabilidades

```bash
npm audit
npm audit fix   # aplicar correcciones automáticas cuando sea posible
```

En GitHub: activar **Dependabot** (Security → Dependabot alerts) para avisos de dependencias.
