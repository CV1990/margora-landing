# Assets del sitio

Aquí van las imágenes e iconos del sitio.

## Estructura

- **`images/`** — Imágenes: logo, gráficos, etc.
  - Coloca aquí `logo.png` (logo de Margora).
- **`icons/`** — Iconos del sitio: favicon, etc.
  - Coloca aquí `icon.ico` (favicon del sitio).

## Uso en el código

Desde componentes o páginas, referéncialos por la ruta pública:

- Logo: `/assets/images/logo.png`
- Favicon: `/assets/icons/icon.ico`

Ejemplo con Next.js Image:

```tsx
import Image from "next/image"
<Image src="/assets/images/logo.png" alt="Margora" width={120} height={40} />
```
