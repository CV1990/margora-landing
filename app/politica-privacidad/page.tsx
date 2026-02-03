import type { Metadata } from "next"
import Link from "next/link"
import { ShieldCheck } from "lucide-react"

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Política de privacidad y protección de datos de Margora. Cómo recopilamos, usamos y aseguramos tu información.",
  robots: "index, follow",
}

export default function PoliticaPrivacidadPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-3 rounded-xl bg-primary/10">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Política de Privacidad
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Uso y protección de tus datos
            </p>
          </div>
        </div>

        <p className="text-muted-foreground mb-10">
          Última actualización: febrero 2026
        </p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-10">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              1. Responsable del tratamiento
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Margora («nosotros», «nuestro») es el responsable del tratamiento de los datos personales que recabamos a través de este sitio web. Nos comprometemos a tratar tu información de forma legal, leal, transparente y segura.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              2. Datos que recopilamos y para qué
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Solo recopilamos los datos necesarios para los fines indicados:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong className="text-foreground">Formulario de contacto:</strong> nombre, empresa, correo electrónico y mensaje. Únicamente para responder tu consulta y gestionar la relación comercial.</li>
              <li><strong className="text-foreground">Newsletter:</strong> dirección de correo electrónico. Para el envío de comunicaciones que hayas aceptado recibir. Puedes darte de baja en cualquier momento.</li>
              <li><strong className="text-foreground">Navegación:</strong> datos técnicos (dirección IP, tipo de navegador, páginas visitadas) para el correcto funcionamiento del sitio y análisis agregado. No se utilizan para identificarte personalmente sin tu consentimiento.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              3. Seguridad y protección de los datos
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              La seguridad de tus datos es prioritaria para nosotros:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Las comunicaciones con el sitio pueden estar protegidas mediante cifrado (HTTPS/TLS) cuando tu navegador lo soporte.</li>
              <li>Los datos de formularios se validan y sanitizan en servidor para evitar uso malintencionado y ataques (por ejemplo, XSS o inyección).</li>
              <li>Acceso a los datos personales restringido al personal autorizado y solo para las finalidades descritas.</li>
              <li>Utilizamos proveedores que aplican medidas técnicas y organizativas adecuadas para la protección de la información.</li>
              <li>No vendemos ni compartimos tus datos personales con terceros para fines de marketing no autorizados.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              4. Base legal y conservación
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Tratamos tus datos con base en tu consentimiento (formularios y newsletter), en la ejecución de medidas precontractuales o contractuales (respuesta a consultas) o en el interés legítimo (seguridad y mejora del sitio). Conservamos la información solo el tiempo necesario para cumplir estas finalidades o lo que exija la ley.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              5. Tus derechos
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Tienes derecho a acceder a tus datos, rectificarlos, suprimirlos, limitar su tratamiento, oponerte y, cuando corresponda, a la portabilidad. Para ejercer estos derechos o resolver dudas sobre el uso de tus datos, puedes contactarnos en:
            </p>
            <p className="text-foreground font-medium">
              <a href="mailto:info@margora.com" className="text-primary hover:underline">
                info@margora.com
              </a>
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Si consideras que el tratamiento no se ajusta a la normativa aplicable, tienes derecho a presentar una reclamación ante la autoridad de protección de datos competente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              6. Cookies y tecnologías similares
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Este sitio utiliza cookies necesarias, de preferencias (por ejemplo tema) y, si lo aceptas, analíticas (Vercel Analytics). Puedes elegir qué categorías aceptar desde el banner de cookies o desde la página{" "}
              <Link href="/cookies" className="text-primary hover:underline">Uso de cookies</Link>. También puedes gestionar o rechazar cookies desde la configuración de tu navegador. La no aceptación de ciertas cookies puede afectar a algunas funcionalidades del sitio.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              7. Cambios en esta política
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Podemos actualizar esta política de privacidad para reflejar cambios en nuestras prácticas o en la normativa. La versión vigente estará publicada en esta página con la fecha de última actualización. Te recomendamos revisarla de forma periódica.
            </p>
          </section>

          <section className="pt-6 border-t border-border/50">
            <p className="text-muted-foreground leading-relaxed">
              Al usar este sitio y facilitarnos tus datos a través de los formularios o la suscripción, confirmas haber leído y aceptado esta política de privacidad. Tus datos quedan asegurados y protegidos conforme a lo aquí descrito.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
