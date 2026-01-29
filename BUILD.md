# Build – Margora Landing

## Export estático (HostGator)

El proyecto usa **`output: 'export'`** en `next.config.mjs`. El build genera archivos estáticos en la carpeta **`out/`**.

- **`out/`** → HTML, CSS, JS listos para HostGator (Apache/archivos estáticos).
- **`.next/`** → solo intermedio del build; no se sube a HostGator.

```bash
npm run build
```

Tras el build, en la raíz aparece **`out/`** con `index.html` y assets. Esa carpeta es la que se sube a HostGator.

## Verificar el build

```bash
npm run build:check
```

Comprueba que exista `out/` y `out/index.html`. Si todo va bien, verás un mensaje de confirmación.

## Warnings que puedes ignorar

- **`baseline-browser-mapping` over two months old**  
  Aviso de dependencia. No afecta al build. Para actualizar:  
  `npm i baseline-browser-mapping@latest -D`

- **`punycode` deprecated**  
  Viene de Node/dependencias. No afecta al build.

## Despliegue en HostGator

Ver ** [DEPLOY-HOSTGATOR.md](./DEPLOY-HOSTGATOR.md)** para el proceso completo (ZIP, subida a `public_html`, etc.).
