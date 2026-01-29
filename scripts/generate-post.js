const prompt = `
Actúa como un CTO y Arquitecto de Software líder en "Margora". 
Tu misión es documentar el ecosistema tecnológico actual y tendencias de negocio.

ESTRUCTURA DE SALIDA (JSON ESTRICTO):
{
  "id": "slug-url-amigable",
  "title": "Título SEO (ej: 'Guía de...', 'Por qué usar...', 'Novedades en...')",
  "date": "${new Date().toISOString()}",
  "category": "Elegir entre: Frontend, Backend, Architecture, Databases, AI Automation o Tech News",
  "excerpt": "Meta-descripción de 150 caracteres para SEO técnico.",
  "content": "Contenido en HTML (<h3>, <p>, <strong>, <ul>, <li>, <pre><code> para snippets). Mínimo 800 palabras."
}

CONTEXTO DEL TEMA:
Hoy escribirás sobre: ${getTopicOfTheDay()}

DIRECTRICES TÉCNICAS:
1. Si es documentación (JS, Java, Python): Incluye un ejemplo de código práctico (<pre><code>).
2. Si es noticia/tendencia: Analiza el impacto para empresas de E-commerce.
3. Si es arquitectura: Usa conceptos de Clean Architecture o patrones de diseño.
4. Tono: De experto a experto (Tech Lead), pero con visión de negocio para Margora.

IMPORTANTE: El JSON debe ser válido. No uses markdown fuera del campo "content".
`;

function getTopicOfTheDay() {
  const categories = {
    javascript: [
      "Optimización de renders en React 19",
      "Patrones avanzados de Web Components para CDNs",
      "Gestión de estado: Cuándo salir de Redux y usar Context o Zustand"
    ],
    java: [
      "Arquitectura de Microservicios con Spring Boot y Java 21",
      "Seguridad en APIs: Implementando OAuth2 y JWT",
      "Testing integral: De JUnit a Testcontainers para bases de datos"
    ],
    python_ai: [
      "Automatización de flujos de trabajo con Python y APIs de IA",
      "Scraping ético y análisis de precios en Mercado Libre con Python",
      "Despliegue de modelos de lenguaje en Cloudflare Workers"
    ],
    databases: [
      "Turso y libSQL: El futuro de las bases de datos en el Edge",
      "PostgreSQL vs SQLite: Cuándo priorizar la latencia sobre la consistencia",
      "Modelado de datos para sistemas de inventario en tiempo real"
    ],
    news_trends: [
      "Análisis de las novedades en el ecosistema Web (noticia del día)",
      "Nuevas regulaciones de e-commerce y cómo la tecnología debe adaptarse",
      "El impacto de la computación espacial (XR) en las ventas online"
    ]
  };

  // Selecciona una categoría al azar y luego un tema al azar
  const catKeys = Object.keys(categories);
  const selectedCat = catKeys[Math.floor(Math.random() * catKeys.length)];
  const topicList = categories[selectedCat];
  return topicList[Math.floor(Math.random() * topicList.length)];
}