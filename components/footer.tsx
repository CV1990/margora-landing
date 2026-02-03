import Link from "next/link"
import { Linkedin, Twitter, Facebook, Instagram } from "lucide-react"

const footerLinks = {
  servicios: [
    { label: "Landing Pages", href: "#" },
    { label: "E-Commerce", href: "#" },
    { label: "Experiencias XR", href: "#" },
    { label: "Migración AWS", href: "#" },
    { label: "Apps Móviles", href: "#" },
    { label: "Desarrollo Web", href: "#" },
  ],
  empresa: [
    { label: "Sobre Nosotros", href: "#nosotros" },
    { label: "Metodologías", href: "#metodologias" },
    { label: "Casos de Éxito", href: "#" },
    { label: "Equipo", href: "#" },
    { label: "Carreras", href: "#" },
  ],
  recursos: [
    { label: "Blog", href: "#blog" },
    { label: "Documentación", href: "#" },
    { label: "Webinars", href: "#" },
    { label: "Newsletter", href: "#contacto" },
  ],
  contacto: [
    { label: "info@margora.com", href: "mailto:info@margora.com" },
    { label: "LinkedIn", href: "#" },
    { label: "+52 55 1234 5678", href: "tel:+525512345678" },
  ],
}

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/company/margora-ac/", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "https://www.facebook.com/margoraConsultora", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/consultoramargora/", label: "Instagram" },
]

export function Footer() {
  return (
    <footer className="bg-card border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-14">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="text-2xl font-bold tracking-tight text-primary">
              margora<span className="text-muted-foreground">.</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-5 max-w-xs leading-relaxed">
              Empresa de software y proveedor de desarrollo web a la medida. 
              Sitios web a la medida, consultoría de software y transformación digital.
            </p>
            <div className="flex gap-3 mt-8">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors shadow-sm"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-5 text-foreground">Servicios</h3>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-5 text-foreground">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-5 text-foreground">Recursos</h3>
            <ul className="space-y-3">
              {footerLinks.recursos.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-5 text-foreground">Contacto</h3>
            <ul className="space-y-3">
              {footerLinks.contacto.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-16 pt-10 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">
              Política de Privacidad
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Términos de Servicio
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Cookies
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 Margora. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
