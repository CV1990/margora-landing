import type { Metadata } from "next"
import Link from "next/link"
import { FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Términos de Servicio",
  description:
    "Términos y condiciones de uso de los servicios y del sitio web de Margora. Condiciones generales, uso aceptable y limitación de responsabilidad.",
  robots: "index, follow",
}

export default function TerminosDeServicioPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-3 rounded-xl bg-primary/10">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Términos de Servicio
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Condiciones de uso del sitio y de nuestros servicios
            </p>
          </div>
        </div>

        <p className="text-muted-foreground mb-10">
          Última actualización: febrero 2026
        </p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-10">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              1. Aceptación de los términos
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Al acceder y utilizar el sitio web de Margora («el sitio») y/o contratar nuestros servicios de desarrollo de software, consultoría o transformación digital, aceptas estos Términos de Servicio. Si no estás de acuerdo con alguna parte, te pedimos que no utilices el sitio ni nuestros servicios.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              2. Descripción de los servicios
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Margora ofrece servicios de desarrollo de software a la medida, sitios web, aplicaciones móviles, comercio electrónico, experiencias XR, migración a la nube (AWS) y consultoría en transformación digital. Los alcances, plazos y condiciones específicas se definen en propuestas o contratos por proyecto.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              3. Uso aceptable del sitio
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Te comprometes a utilizar el sitio de forma lícita y respetuosa. En particular, no debes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Utilizar el sitio para fines ilegales o no autorizados.</li>
              <li>Intentar acceder a sistemas, datos o cuentas ajenos sin autorización.</li>
              <li>Enviar malware, spam o contenido que pueda dañar el sitio o a otros usuarios.</li>
              <li>Suplantar identidad o falsear información al contactarnos.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              4. Propiedad intelectual
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              El contenido del sitio (textos, diseño, logotipos, imágenes) es propiedad de Margora o de sus licenciantes y está protegido por las leyes de propiedad intelectual. El código, diseños y entregables de los proyectos se rigen por los acuerdos específicos de cada contrato (cesión de derechos, licencias, etc.).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              5. Limitación de responsabilidad
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              El sitio se ofrece «tal cual». Margora no garantiza la disponibilidad ininterrumpida ni la ausencia de errores. En la medida permitida por la ley aplicable, no seremos responsables por daños indirectos, incidentales o consecuentes derivados del uso del sitio. La responsabilidad por los servicios contratados se limita a lo establecido en el contrato correspondiente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              6. Enlaces a terceros
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              El sitio puede incluir enlaces a sitios de terceros (redes sociales, partners). No controlamos el contenido ni las prácticas de privacidad de esos sitios; el uso de los mismos es bajo tu responsabilidad.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              7. Modificaciones
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Nos reservamos el derecho de modificar estos Términos de Servicio. Los cambios se publicarán en esta página con la fecha de actualización. El uso continuado del sitio tras los cambios implica la aceptación de los nuevos términos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              8. Ley aplicable y contacto
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Estos términos se rigen por la legislación aplicable en la jurisdicción de Margora. Para cualquier duda sobre los Términos de Servicio o sobre nuestros servicios, puedes contactarnos en{" "}
              <a href="mailto:info@margora.com" className="text-primary hover:underline">
                info@margora.com
              </a>
              . Para el tratamiento de tus datos personales, consulta nuestra{" "}
              <Link href="/politica-privacidad" className="text-primary hover:underline">
                Política de Privacidad
              </Link>
              .
            </p>
          </section>

          <section className="pt-6 border-t border-border/50">
            <p className="text-muted-foreground leading-relaxed">
              Gracias por confiar en Margora. Al utilizar nuestro sitio y servicios, confirmas haber leído y aceptado estos Términos de Servicio.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
